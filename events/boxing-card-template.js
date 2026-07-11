window.RISKEM_EVENTS = window.RISKEM_EVENTS || {};
window.RISKEM_EVENT_ORDER = window.RISKEM_EVENT_ORDER || [];

window.RISKEM_EVENTS["boxing-card-template"] = {
  id: "boxing-card-template",
  sport: "boxing",
  title: "Boxing Risk’em",
  subtitle: "Bout Card Template",
  shortLabel: "Boxing Template",
  currency: "Fight Bucks",
  publicNote: "Template event. Replace bouts, odds, players, and results for any boxing card.",
  revealLockedPicks: true,
  rules: { budget: 400, minWager: 25, maxWager: 150, minTotalWager: 200, maxTotalWager: 400 },
  contests: [
    { id: "B1", label: "Main Event", type: "bout", weight: "Catchweight", entrants: [
      { id: "fighter-a", name: "Fighter A", record: "0-0-0", odds: null },
      { id: "fighter-b", name: "Fighter B", record: "0-0-0", odds: null },
    ]},
  ],
  results: { B1: { complete: false, winnerId: "", method: "", round: null, time: "" } },
  finalProps: { complete: false, fastestFinish: "", fightOfNight: "", totalDecisions: null, totalFinishes: null },
  players: [],
};

window.RISKEM_EVENT_ORDER.push("boxing-card-template");
