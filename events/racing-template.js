window.RISKEM_EVENTS = window.RISKEM_EVENTS || {};
window.RISKEM_EVENT_ORDER = window.RISKEM_EVENT_ORDER || [];

window.RISKEM_EVENTS["racing-template"] = {
  id: "racing-template",
  sport: "racing",
  title: "Racing Risk’em",
  subtitle: "Race Template",
  shortLabel: "Racing Template",
  currency: "Race Bucks",
  publicNote: "Template event. Replace entrants, odds, players, and race results for NASCAR, F1, IndyCar, or local racing pools.",
  revealLockedPicks: true,
  rules: { budget: 400, minWager: 25, maxWager: 150, minTotalWager: 200, maxTotalWager: 400 },
  contests: [
    { id: "R1", label: "Race", type: "race", entrants: [
      { id: "driver-1", name: "Driver 1", odds: null },
      { id: "driver-2", name: "Driver 2", odds: null },
      { id: "driver-3", name: "Driver 3", odds: null },
      { id: "driver-4", name: "Driver 4", odds: null },
    ]},
  ],
  results: { R1: { complete: false, winnerId: "", secondId: "", thirdId: "" } },
  finalProps: { complete: false, poleWinner: "", mostLapsLed: "", cautions: null },
  players: [],
};

window.RISKEM_EVENT_ORDER.push("racing-template");
