window.RISKEM_SPORTS = window.RISKEM_SPORTS || {};

window.RISKEM_SPORTS.football = {
  id: "football",
  name: "American Football",
  contestNoun: "Game",
  contestNounPlural: "Games",
  pickLabel: "Pick winner",
  currencyFallback: "Gridiron Bucks",
  predictionFields: [
    { key: "aScore", label: "Away/left score", type: "number", min: 0, defaultValue: 24 },
    { key: "bScore", label: "Home/right score", type: "number", min: 0, defaultValue: 21 },
  ],
  propDefinitions: [
    { key: "firstTd", label: "First TD scorer/team", type: "text", placeholder: "Player or team" },
    { key: "mostPassing", label: "Most passing yards", type: "text", placeholder: "QB name" },
    { key: "totalTouchdowns", label: "Total TDs", type: "number", min: 0, defaultValue: 5 },
  ],
  scoreBonus(pick, result) {
    if (!result.complete || pick.selectionId !== result.winnerId) return 0;
    const aPred = Number(pick.prediction?.aScore);
    const bPred = Number(pick.prediction?.bScore);
    const aActual = Number(result.aScore);
    const bActual = Number(result.bScore);
    if (aPred === aActual && bPred === bActual) return 75;
    if (aPred - bPred === aActual - bActual) return 25;
    if (aPred + bPred === aActual + bActual) return 20;
    if (aPred === aActual || bPred === bActual) return 10;
    return 0;
  },
  propsScore(player, event) {
    const finalProps = event.finalProps || {};
    if (!finalProps.complete) return 0;
    let score = 0;
    if (normalizeText(player.props?.firstTd) && normalizeText(player.props.firstTd) === normalizeText(finalProps.firstTd)) score += 50;
    if (normalizeText(player.props?.mostPassing) && normalizeText(player.props.mostPassing) === normalizeText(finalProps.mostPassing)) score += 50;
    if (String(player.props?.totalTouchdowns ?? "") !== "" && Number(player.props.totalTouchdowns) === Number(finalProps.totalTouchdowns)) score += 50;
    return score;
  },
  formatPrediction(pick, contest) {
    return `${contest.entrants[0]?.name || "A"} ${pick.prediction?.aScore ?? "—"} - ${pick.prediction?.bScore ?? "—"} ${contest.entrants[1]?.name || "B"}`;
  },
  formatResult(result, contest) {
    if (!result || result.aScore === null || result.aScore === undefined) return "Pending";
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
    return `${total} total points`;
  },
  propSummary(props) {
    return `First TD: ${props?.firstTd || "—"}<br><span class="fine">Most passing: ${props?.mostPassing || "—"} · TDs ${props?.totalTouchdowns ?? "—"}</span>`;
  },
  statusText(event) {
    const parts = (event.contests || []).map((contest) => {
      const r = event.results?.[contest.id];
      if (!r || r.aScore === null || r.aScore === undefined) return null;
      const tag = r.complete ? "F" : "Live";
      return `${contest.label}: ${contest.entrants[0].name} ${r.aScore}-${r.bScore} ${contest.entrants[1].name} ${tag}`;
    }).filter(Boolean);
    return parts.length ? parts.join("<br>") : "Before kickoff";
  },
};
