window.RISKEM_SPORTS = window.RISKEM_SPORTS || {};

window.RISKEM_SPORTS.racing = {
  id: "racing",
  name: "Racing",
  contestNoun: "Race",
  contestNounPlural: "Races",
  pickLabel: "Pick winner",
  currencyFallback: "Race Bucks",
  predictionFields: [
    { key: "secondId", label: "Predicted 2nd", type: "entrant", defaultValue: "" },
    { key: "thirdId", label: "Predicted 3rd", type: "entrant", defaultValue: "" },
  ],
  propDefinitions: [
    { key: "poleWinner", label: "Pole winner", type: "text", placeholder: "Driver/team" },
    { key: "mostLapsLed", label: "Most laps led", type: "text", placeholder: "Driver/team" },
    { key: "cautions", label: "Cautions/safety cars", type: "number", min: 0, defaultValue: 3 },
  ],
  scoreBonus(pick, result) {
    if (!result.complete || pick.selectionId !== result.winnerId) return 0;
    let bonus = 0;
    if (pick.prediction?.secondId && pick.prediction.secondId === result.secondId) bonus += 25;
    if (pick.prediction?.thirdId && pick.prediction.thirdId === result.thirdId) bonus += 25;
    return bonus;
  },
  propsScore(player, event) {
    const finalProps = event.finalProps || {};
    if (!finalProps.complete) return 0;
    let score = 0;
    if (normalizeText(player.props?.poleWinner) && normalizeText(player.props.poleWinner) === normalizeText(finalProps.poleWinner)) score += 50;
    if (normalizeText(player.props?.mostLapsLed) && normalizeText(player.props.mostLapsLed) === normalizeText(finalProps.mostLapsLed)) score += 50;
    if (String(player.props?.cautions ?? "") !== "" && Number(player.props.cautions) === Number(finalProps.cautions)) score += 50;
    return score;
  },
  formatPrediction(pick, contest, event) {
    return `2nd: ${entrantName(event, pick.prediction?.secondId) || "—"} · 3rd: ${entrantName(event, pick.prediction?.thirdId) || "—"}`;
  },
  formatResult(result, contest, event) {
    if (!result?.complete) return "Pending";
    return `Winner: ${entrantName(event, result.winnerId)} · 2nd ${entrantName(event, result.secondId) || "—"} · 3rd ${entrantName(event, result.thirdId) || "—"}`;
  },
  formatWinner(result, event) {
    return result?.complete && result.winnerId ? `Winner: ${entrantName(event, result.winnerId)}` : "Winner: —";
  },
  tiebreaker(player) {
    return `${player.props?.cautions ?? "—"} cautions`;
  },
  propSummary(props) {
    return `Pole: ${props?.poleWinner || "—"}<br><span class="fine">Most laps: ${props?.mostLapsLed || "—"} · Cautions ${props?.cautions ?? "—"}</span>`;
  },
  statusText(event) {
    const parts = (event.contests || []).map((contest) => {
      const r = event.results?.[contest.id];
      if (!r?.complete) return null;
      return `${contest.label}: ${entrantName(event, r.winnerId)} wins`;
    }).filter(Boolean);
    return parts.length ? parts.join("<br>") : "Before green flag";
  },
};
