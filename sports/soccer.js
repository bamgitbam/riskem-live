window.RISKEM_SPORTS = window.RISKEM_SPORTS || {};

window.RISKEM_SPORTS.soccer = {
  id: "soccer",
  name: "Soccer",
  contestNoun: "Match",
  contestNounPlural: "Matches",
  pickLabel: "Pick to advance",
  currencyFallback: "Cup Bucks",
  predictionFields: [
    { key: "aScore", label: "Left score", type: "number", min: 0, defaultValue: 1 },
    { key: "bScore", label: "Right score", type: "number", min: 0, defaultValue: 0 },
  ],
  propDefinitions: [
    { key: "topScorer", label: "Top scorer", type: "text", placeholder: "Kylian Mbappé — France" },
    { key: "teamGoals", label: "Team with most goals", type: "text", placeholder: "France" },
    { key: "shootouts", label: "Penalty shootouts", type: "number", min: 0, defaultValue: 0 },
  ],
  scoreBonus(pick, result) {
    if (!result.complete || pick.selectionId !== result.winnerId) return 0;
    const aPred = Number(pick.prediction?.aScore);
    const bPred = Number(pick.prediction?.bScore);
    const aActual = Number(result.aScore);
    const bActual = Number(result.bScore);
    if (aPred === aActual && bPred === bActual) return 50;
    if (aPred - bPred === aActual - bActual) return 25;
    if (aPred + bPred === aActual + bActual) return 15;
    if (aPred === aActual || bPred === bActual) return 10;
    return 0;
  },
  propsScore(player, event) {
    const finalProps = event.finalProps || {};
    if (!finalProps.complete) return 0;
    let score = 0;
    const pickedScorer = normalizeText(player.props?.topScorer || "");
    const finalScorers = (finalProps.topScorers || []).map(normalizeText);
    if (pickedScorer && finalScorers.includes(pickedScorer)) {
      score += finalScorers.length > 1 ? 50 : 75;
    }
    if (normalizeText(player.props?.teamGoals) && normalizeText(player.props.teamGoals) === normalizeText(finalProps.teamMostGoals)) score += 50;
    if (String(player.props?.shootouts ?? "") !== "" && Number(player.props.shootouts) === Number(finalProps.shootouts)) score += 50;
    return score;
  },
  formatPrediction(pick, contest) {
    const left = contest.entrants[0]?.name || "A";
    const right = contest.entrants[1]?.name || "B";
    return `${left} ${pick.prediction?.aScore ?? "—"} - ${pick.prediction?.bScore ?? "—"} ${right}`;
  },
  formatResult(result, contest) {
    if (!result || !hasSoccerScore(result)) return "Pending";
    const tag = result.complete ? "Final" : "Live";
    return `${contest.entrants[0].name} ${result.aScore} - ${result.bScore} ${contest.entrants[1].name} · ${tag}`;
  },
  formatWinner(result, event) {
    return result?.complete && result.winnerId ? `Winner: ${entrantName(event, result.winnerId)}` : "Winner: —";
  },
  tiebreaker(player, event) {
    const total = (event.contests || []).reduce((sum, c) => {
      const p = player.picks?.[c.id];
      return sum + Number(p?.prediction?.aScore || 0) + Number(p?.prediction?.bScore || 0);
    }, 0);
    return `${total} goals`;
  },
  propSummary(props) {
    return `${props?.topScorer || "—"}<br><span class="fine">${props?.teamGoals || "—"} · Shootouts ${props?.shootouts ?? "—"}</span>`;
  },
  statusText(event) {
    const parts = (event.contests || []).map((contest) => {
      const r = event.results?.[contest.id];
      if (!r || !hasSoccerScore(r)) return null;
      const tag = r.complete ? "F" : "Live";
      return `${contest.label}: ${contest.entrants[0].name} ${r.aScore}-${r.bScore} ${contest.entrants[1].name} ${tag}`;
    }).filter(Boolean);
    return parts.length ? parts.join("<br>") : "Before kickoff";
  },
};

function hasSoccerScore(result) {
  return result.aScore !== null && result.aScore !== undefined && result.bScore !== null && result.bScore !== undefined;
}
