window.RISKEM_EVENTS = window.RISKEM_EVENTS || {};
window.RISKEM_EVENT_ORDER = window.RISKEM_EVENT_ORDER || [];

/*
  This live card is UFC 329 in public listings, but the original test URL used
  event=ufc-324. The old id is kept as an alias so existing links do not break.
*/
const UFC_329_EVENT = {
  id: "ufc-324",
  sport: "combat",
  title: "UFC 329 Risk’em",
  subtitle: "McGregor vs Holloway 2 · Main Card · Saturday 6:00 PM",
  shortLabel: "UFC 329",
  currency: "Fight Bucks",
  publicNote: "Main-card fight pool. Locked odds auto-fill from the published odds snapshot and can still be manually overridden before entries lock.",
  revealLockedPicks: true,
  rules: {
    budget: 400,
    minWager: 25,
    maxWager: 150,
    minTotalWager: 200,
    maxTotalWager: 400,
  },
  contests: [
    {
      id: "F1",
      label: "Main Event",
      type: "fight",
      weight: "Welterweight",
      scheduled: "Saturday, 6:00 PM",
      scheduledRounds: 5,
      defaultWager: 100,
      defaultSelectionId: "max-holloway",
      predictionDefaults: {
        "conor-mcgregor": { method: "KO/TKO", round: 2 },
        "max-holloway": { method: "KO/TKO", round: 4 },
      },
      entrants: [
        { id: "conor-mcgregor", name: "Conor McGregor", record: "22-6-0", odds: null },
        { id: "max-holloway", name: "Max Holloway", record: "27-9-0", odds: null },
      ],
    },
    {
      id: "F2",
      label: "Co-main",
      type: "fight",
      weight: "Lightweight",
      scheduled: "Saturday, 6:00 PM",
      scheduledRounds: 3,
      defaultWager: 25,
      defaultSelectionId: "benoit-saint-denis",
      predictionDefaults: {
        "benoit-saint-denis": { method: "KO/TKO", round: 2 },
        "paddy-pimblett": { method: "Decision", round: 3 },
      },
      entrants: [
        { id: "benoit-saint-denis", name: "Benoit Saint-Denis", record: "17-3-0, 1NC", odds: null },
        { id: "paddy-pimblett", name: "Paddy Pimblett", record: "23-4-0", odds: null },
      ],
    },
    {
      id: "F3",
      label: "Main Card",
      type: "fight",
      weight: "Bantamweight",
      scheduled: "Saturday, 6:00 PM",
      scheduledRounds: 3,
      defaultWager: 25,
      defaultSelectionId: "mario-bautista",
      predictionDefaults: {
        "cory-sandhagen": { method: "Decision", round: 3 },
        "mario-bautista": { method: "Decision", round: 3 },
      },
      entrants: [
        { id: "cory-sandhagen", name: "Cory Sandhagen", record: "18-6-0", odds: null },
        { id: "mario-bautista", name: "Mario Bautista", record: "17-3-0", odds: null },
      ],
    },
    {
      id: "F4",
      label: "Main Card",
      type: "fight",
      weight: "Flyweight",
      scheduled: "Saturday, 6:00 PM",
      scheduledRounds: 3,
      defaultWager: 25,
      defaultSelectionId: "loneer-kavanagh",
      predictionDefaults: {
        "brandon-royval": { method: "Decision", round: 3 },
        "loneer-kavanagh": { method: "Decision", round: 3 },
      },
      entrants: [
        { id: "brandon-royval", name: "Brandon Royval", record: "17-9-0", odds: null },
        { id: "loneer-kavanagh", name: "Lone’er Kavanagh", record: "10-1-0", odds: null },
      ],
    },
    {
      id: "F5",
      label: "Main Card",
      type: "fight",
      weight: "Lightweight",
      scheduled: "Saturday, 6:00 PM",
      scheduledRounds: 3,
      defaultWager: 25,
      defaultSelectionId: "terrance-mckinney",
      predictionDefaults: {
        "king-green": { method: "KO/TKO", round: 1 },
        "terrance-mckinney": { method: "Submission", round: 1 },
      },
      entrants: [
        { id: "king-green", name: "King Green", record: "35-17-1, 1NC", odds: null },
        { id: "terrance-mckinney", name: "Terrance McKinney", record: "18-8-0", odds: null },
      ],
    },
  ],
  propDefaults: {
    fastestFinish: "F5",
    fightOfNight: "F4",
    totalDecisions: 2,
    totalFinishes: 3,
  },
  results: {
    F1: { complete: false, winnerId: "", method: "", round: null, time: "" },
    F2: { complete: false, winnerId: "", method: "", round: null, time: "" },
    F3: { complete: false, winnerId: "", method: "", round: null, time: "" },
    F4: { complete: false, winnerId: "", method: "", round: null, time: "" },
    F5: { complete: false, winnerId: "", method: "", round: null, time: "" },
  },
  finalProps: {
    complete: false,
    fastestFinish: "",
    fightOfNight: "",
    totalDecisions: null,
    totalFinishes: null,
  },
  players: [],
};

window.RISKEM_EVENTS["ufc-324"] = UFC_329_EVENT;
window.RISKEM_EVENTS["ufc-329"] = {
  ...UFC_329_EVENT,
  id: "ufc-329",
};

window.RISKEM_EVENT_ORDER.push("ufc-329");
