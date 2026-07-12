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
  publicNote: "Final results loaded. Scoreboard shows Fight Bucks, fight-result bonuses, fastest finish, Fight of the Night, total decisions, and total finishes.",
  revealLockedPicks: true,
  entriesLocked: true,
  rules: {
    unitPerContest: 100,
    minWagerPct: 0.25,
    maxWagerPct: 1.5,
    minTotalPct: 0.5,
    maxTotalPct: 1,
    budget: 500,
    minWager: 25,
    maxWager: 150,
    minTotalWager: 250,
    maxTotalWager: 500,
  },
  contests: [
    {
      id: "F1",
      label: "Main Event",
      type: "fight",
      weight: "Welterweight",
      scheduled: "Saturday, 6:00 PM",
      scheduledRounds: 5,
      defaultWager: 50,
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
      defaultWager: 50,
      defaultSelectionId: "benoit-saint-denis",
      predictionDefaults: {
        "benoit-saint-denis": { method: "KO/TKO", round: 2 },
        "paddy-pimblett": { method: "Decision" },
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
      defaultWager: 50,
      defaultSelectionId: "mario-bautista",
      predictionDefaults: {
        "cory-sandhagen": { method: "Decision" },
        "mario-bautista": { method: "Decision" },
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
      defaultWager: 50,
      defaultSelectionId: "loneer-kavanagh",
      predictionDefaults: {
        "brandon-royval": { method: "Decision" },
        "loneer-kavanagh": { method: "Decision" },
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
      defaultWager: 50,
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
    fightOfNight: "F4",
  },
/*
  UFC 329 final result notes:
  - F1: Holloway def. McGregor by KO/TKO, R1 1:09.
  - F2: Pimblett def. Saint-Denis by Submission, R1 0:52.
  - F3: Bautista def. Sandhagen by Decision.
  - F4: Royval def. Kavanagh by Submission, R3 3:40.
  - F5: Green def. McKinney by KO/TKO, R1 4:59.
  - Fastest finish: F2.
  - Fight of the Night: F4.
  - Total decisions: 1.
  - Total finishes: 4.
*/
  results: {
    F1: { complete: true, winnerId: "max-holloway", method: "KO/TKO", round: 1, time: "1:09" },
    F2: { complete: true, winnerId: "paddy-pimblett", method: "Submission", round: 1, time: "0:52" },
    F3: { complete: true, winnerId: "mario-bautista", method: "Decision", round: null, time: "" },
    F4: { complete: true, winnerId: "brandon-royval", method: "Submission", round: 3, time: "3:40" },
    F5: { complete: true, winnerId: "king-green", method: "KO/TKO", round: 1, time: "4:59" },
  },
  finalProps: {
    complete: true,
    fastestFinish: "F2",
    fightOfNight: "F4",
    totalDecisions: 1,
    totalFinishes: 4,
  },
  players: [],
};

window.RISKEM_EVENTS["ufc-324"] = UFC_329_EVENT;
window.RISKEM_EVENTS["ufc-329"] = {
  ...UFC_329_EVENT,
  id: "ufc-329",
};

window.RISKEM_EVENT_ORDER.push("ufc-329");
