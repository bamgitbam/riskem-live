window.RISKEM_EVENTS = window.RISKEM_EVENTS || {};
window.RISKEM_EVENT_ORDER = window.RISKEM_EVENT_ORDER || [];

window.RISKEM_EVENTS["nfl-week-template"] = {
  id: "nfl-week-template",
  sport: "football",
  title: "Football Risk’em",
  subtitle: "Weekly Game Slate Template",
  shortLabel: "NFL Template",
  currency: "Gridiron Bucks",
  publicNote: "Template event. Replace contests, odds, players, and results for any NFL or college football slate.",
  revealLockedPicks: true,
  rules: { budget: 400, minWager: 25, maxWager: 150, minTotalWager: 200, maxTotalWager: 400 },
  contests: [
    { id: "G1", label: "G1", type: "game", entrants: [
      { id: "away-team", name: "Away Team", odds: null },
      { id: "home-team", name: "Home Team", odds: null },
    ]},
  ],
  results: { G1: { complete: false, aScore: null, bScore: null, winnerId: "" } },
  finalProps: { complete: false, firstTd: "", mostPassing: "", totalTouchdowns: null },
  players: [],
};

window.RISKEM_EVENT_ORDER.push("nfl-week-template");
