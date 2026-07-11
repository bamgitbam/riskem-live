window.RISKEM_SPORTS = window.RISKEM_SPORTS || {};

function riskemCombatNormalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function riskemCombatIsDecision(method) {
  return riskemCombatNormalize(method) === "decision";
}

function riskemCombatIsNoContest(method) {
  const normalized = riskemCombatNormalize(method);
  return normalized === "no contest" || normalized === "draw no contest";
}

function riskemCombatIsFinish(method) {
  return Boolean(method) && !riskemCombatIsDecision(method) && !riskemCombatIsNoContest(method);
}

window.RISKEM_SPORTS.combat = {
  id: "combat",
  name: "Combat Sports",
  contestNoun: "Fight",
  contestNounPlural: "Fights",
  pickLabel: "Pick winner",
  currencyFallback: "Fight Bucks",
  predictionFields: [
    { key: "method", label: "Method", type: "select", options: ["KO/TKO", "Submission", "Decision", "DQ", "No Contest"], defaultValue: "Decision" },
    { key: "round", label: "Finish round", type: "round", min: 1, defaultValue: 1 },
  ],
  propDefinitions: [
    { key: "fastestFinish", label: "Fastest finish fight", type: "contest", derived: true, placeholder: "Auto from finish picks" },
    { key: "fightOfNight", label: "Fight of the night", type: "contest", placeholder: "Pick fight" },
    { key: "totalDecisions", label: "Total decisions", type: "number", min: 0, defaultValue: 0, derived: true },
    { key: "totalFinishes", label: "Total finishes", type: "number", min: 0, defaultValue: 0, derived: true },
  ],
  validatePrediction(prediction, contest) {
    const method = prediction?.method || "";
    const maxRound = Number(contest.scheduledRounds || 3);

    if (riskemCombatIsDecision(method) || riskemCombatIsNoContest(method)) {
      prediction.round = null;
      return;
    }

    const round = Number(prediction?.round);
    if (!Number.isFinite(round) || round < 1) {
      throw new Error(`Pick a finish round for ${contest.label}.`);
    }
    if (round > maxRound) {
      throw new Error(`${contest.label} is scheduled for ${maxRound} rounds. A finish cannot be after Round ${maxRound}.`);
    }
  },
  derivePropsFromForm(event) {
    let totalDecisions = 0;
    let totalFinishes = 0;
    let earliestRound = Infinity;
    let fastestFinish = "";

    for (const contest of event.contests || []) {
      const method = document.querySelector(`[data-prediction="method"][data-contest="${CSS.escape(contest.id)}"]`)?.value || "";
      const roundRaw = document.querySelector(`[data-prediction="round"][data-contest="${CSS.escape(contest.id)}"]`)?.value || "";
      const round = Number(roundRaw);

      if (riskemCombatIsDecision(method)) {
        totalDecisions += 1;
        continue;
      }

      if (riskemCombatIsFinish(method)) {
        totalFinishes += 1;
        if (Number.isFinite(round) && round >= 1 && round < earliestRound) {
          earliestRound = round;
          fastestFinish = contest.id;
        }
      }
    }

    return { fastestFinish, totalDecisions, totalFinishes };
  },
  scoreBonus(pick, result) {
    if (!result.complete || pick.selectionId !== result.winnerId) return 0;
    const pickedMethod = pick.prediction?.method || "";
    const resultMethod = result.method || "";
    let bonus = 0;

    if (riskemCombatNormalize(pickedMethod) === riskemCombatNormalize(resultMethod)) {
      bonus += 25;
    }

    if (
      riskemCombatIsFinish(pickedMethod) &&
      riskemCombatIsFinish(resultMethod) &&
      Number(pick.prediction?.round) === Number(result.round)
    ) {
      bonus += 25;
    }

    return bonus;
  },
  propsScore(player, event) {
    const finalProps = event.finalProps || {};
    if (!finalProps.complete) return 0;
    let score = 0;
    if (player.props?.fastestFinish && player.props.fastestFinish === finalProps.fastestFinish) score += 50;
    if (player.props?.fightOfNight && player.props.fightOfNight === finalProps.fightOfNight) score += 50;
    if (String(player.props?.totalDecisions ?? "") !== "" && Number(player.props.totalDecisions) === Number(finalProps.totalDecisions)) score += 50;
    if (String(player.props?.totalFinishes ?? "") !== "" && Number(player.props.totalFinishes) === Number(finalProps.totalFinishes)) score += 50;
    return score;
  },
  formatPrediction(pick) {
    const method = pick.prediction?.method || "—";
    if (riskemCombatIsDecision(method) || riskemCombatIsNoContest(method)) return method;
    return `${method} · Round ${pick.prediction?.round ?? "—"}`;
  },
  formatResult(result, contest, event) {
    if (!result?.complete) return "Pending";
    const winner = entrantName(event, result.winnerId);
    const time = result.time ? ` · ${result.time}` : "";
    const round = riskemCombatIsFinish(result.method) ? ` · R${result.round ?? "—"}` : "";
    return `${winner} by ${result.method || "—"}${round}${time}`;
  },
  formatWinner(result, event) {
    return result?.complete && result.winnerId ? `Winner: ${entrantName(event, result.winnerId)}` : "Winner: —";
  },
  tiebreaker(player) {
    const decisions = Number(player.props?.totalDecisions ?? 0);
    const finishes = Number(player.props?.totalFinishes ?? 0);
    return `${decisions} decisions · ${finishes} finishes`;
  },
  propSummary(props, event) {
    return `Fastest finish: ${contestName(event, props?.fastestFinish) || "—"}<br><span class="fine">FOTN: ${contestName(event, props?.fightOfNight) || "—"} · Decisions ${props?.totalDecisions ?? "—"} · Finishes ${props?.totalFinishes ?? "—"}</span>`;
  },
  statusText(event) {
    const parts = (event.contests || []).map((contest) => {
      const r = event.results?.[contest.id];
      if (!r?.complete) return null;
      const round = riskemCombatIsFinish(r.method) ? ` R${r.round ?? "—"}` : "";
      return `${contest.label}: ${entrantName(event, r.winnerId)} ${r.method || ""}${round}`;
    }).filter(Boolean);
    return parts.length ? parts.join("<br>") : "Before first fight";
  },
};

window.RISKEM_SPORTS.boxing = {
  ...window.RISKEM_SPORTS.combat,
  id: "boxing",
  name: "Boxing",
  contestNoun: "Bout",
  contestNounPlural: "Bouts",
  currencyFallback: "Fight Bucks",
  predictionFields: [
    { key: "method", label: "Method", type: "select", options: ["KO/TKO", "Decision", "DQ", "Draw/No Contest"], defaultValue: "Decision" },
    { key: "round", label: "Finish round", type: "round", min: 1, defaultValue: 1 },
  ],
};
