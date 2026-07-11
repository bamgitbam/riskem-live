window.RISKEM_EVENTS = window.RISKEM_EVENTS || {};
window.RISKEM_EVENT_ORDER = window.RISKEM_EVENT_ORDER || [];

window.RISKEM_EVENTS["ufc-324"] = {
  id: "ufc-324",
  sport: "combat",
  title: "UFC 324 Risk’em",
  subtitle: "Main Card · Tomorrow 6:00 PM",
  shortLabel: "UFC 324",
  currency: "Fight Bucks",
  publicNote: "Main-card fight pool. Official scoring uses locked fighter odds from each entry. Add public lines before entries lock, or leave card odds blank and require manual locked odds per pick.",
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
      scheduled: "Tomorrow, 6:00 PM",
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
      scheduled: "Tomorrow, 6:00 PM",
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
      scheduled: "Tomorrow, 6:00 PM",
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
      scheduled: "Tomorrow, 6:00 PM",
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
      scheduled: "Tomorrow, 6:00 PM",
      entrants: [
        { id: "king-green", name: "King Green", record: "35-17-1, 1NC", odds: null },
        { id: "terrance-mckinney", name: "Terrance McKinney", record: "18-8-0", odds: null },
      ],
    },
  ],
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

window.RISKEM_EVENT_ORDER.push("ufc-324");
