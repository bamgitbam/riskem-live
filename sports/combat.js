window.RISKEM_SPORTS = window.RISKEM_SPORTS || {};

window.RISKEM_SPORTS.combat = {
  id: "combat",
  name: "Combat Sports",
  contestNoun: "Fight",
  contestNounPlural: "Fights",
  pickLabel: "Pick winner",
  currencyFallback: "Fight Bucks",
  predictionFields: [
    { key: "method", label: "Method", type: "select", options: ["KO/TKO", "Submission", "Decision", "DQ", "No Contest"], defaultValue: "Decision" },
    { key: "round", label: "Round", type: "number", min: 1, defaultValue: 3 },
  ],
  propDefinitions: [
    { key: "fastestFinish", label: "Fastest finish fight", type: "contest", placeholder: "Pick fight" },
    { key: "fightOfNight", label: "Fight of the night", type: "contest", placeholder: "Pick fight" },
    { key: "totalDecisions", label: "Total decisions", type: "number", min: 0, defaultValue: 0 },
    { key: "totalFinishes", label: "Total finishes", type: "number", min: 0, defaultValue: 0 },
  ],
  scoreBonus(pick, result) {
    if (!result.complete || pick.selectionId !== result.winnerId) return 0;
    let bonus = 0;
    if (normalizeText(pick.prediction?.method) === normalizeText(result.method)) bonus += 25;
    if (Number(pick.prediction?.round) === Number(result.round)) bonus += 25;
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
    return `${pick.prediction?.method || "—"} · Round ${pick.prediction?.round ?? "—"}`;
  },
  formatResult(result, contest, event) {
    if (!result?.complete) return "Pending";
    const winner = entrantName(event, result.winnerId);
    const time = result.time ? ` · ${result.time}` : "";
    return `${winner} by ${result.method || "—"} · R${result.round ?? "—"}${time}`;
  },
  formatWinner(result, event) {
    return result?.complete && result.winnerId ? `Winner: ${entrantName(event, result.winnerId)}` : "Winner: —";
  },
  tiebreaker(player, event) {
    const decisions = Number(player.props?.totalDecisions ?? 0);
    const finishes = Number(player.props?.totalFinishes ?? 0);
    return `${decisions} decisions · ${finishes} finishes`;
  },
  propSummary(props, event) {
    return `Fastest: ${contestName(event, props?.fastestFinish) || "—"}<br><span class="fine">FOTN: ${contestName(event, props?.fightOfNight) || "—"} · Decisions ${props?.totalDecisions ?? "—"} · Finishes ${props?.totalFinishes ?? "—"}</span>`;
  },
  statusText(event) {
    const parts = (event.contests || []).map((contest) => {
      const r = event.results?.[contest.id];
      if (!r?.complete) return null;
      return `${contest.label}: ${entrantName(event, r.winnerId)} ${r.method || ""} R${r.round ?? "—"}`;
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
    { key: "round", label: "Round", type: "number", min: 1, defaultValue: 12 },
  ],
};
