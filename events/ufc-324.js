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
  publicNote: "Main-card fight pool. Users pick winners, wagers, method, finish round where valid, and Fight of the Night. AVG odds plus fastest-finish/decision/finish props are automatic.",
  revealLockedPicks: true,
  entriesLocked: false,
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
  players: [
  {
    "name": "Bam Bam 1",
    "submittedAt": "2026-07-11T06:25:59.070Z",
    "picks": {
      "F1": {
        "selectionId": "max-holloway",
        "wager": 100,
        "odds": -227,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": -225,
          "draftkings": -230,
          "avg": -227
        },
        "prediction": {
          "method": "KO/TKO",
          "round": 4
        }
      },
      "F2": {
        "selectionId": "benoit-saint-denis",
        "wager": 50,
        "odds": -157,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": -155,
          "draftkings": -160,
          "avg": -157
        },
        "prediction": {
          "method": "KO/TKO",
          "round": 2
        }
      },
      "F3": {
        "selectionId": "mario-bautista",
        "wager": 50,
        "odds": 132,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": 130,
          "draftkings": 135,
          "avg": 132
        },
        "prediction": {
          "method": "Decision",
          "round": null
        }
      },
      "F4": {
        "selectionId": "loneer-kavanagh",
        "wager": 50,
        "odds": -232,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": -235,
          "draftkings": -230,
          "avg": -232
        },
        "prediction": {
          "method": "Decision",
          "round": null
        }
      },
      "F5": {
        "selectionId": "terrance-mckinney",
        "wager": 50,
        "odds": -168,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": -166,
          "draftkings": -170,
          "avg": -168
        },
        "prediction": {
          "method": "Submission",
          "round": 1
        }
      }
    },
    "props": {
      "fastestFinish": "F5",
      "fightOfNight": "F4",
      "totalDecisions": 2,
      "totalFinishes": 3
    },
    "derivedProps": {
      "fastestFinish": "F5",
      "totalDecisions": 2,
      "totalFinishes": 3
    }
  },
  {
    "name": "Bam Bam 2",
    "submittedAt": "2026-07-11T06:26:30.774Z",
    "picks": {
      "F1": {
        "selectionId": "max-holloway",
        "wager": 50,
        "odds": -227,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": -225,
          "draftkings": -230,
          "avg": -227
        },
        "prediction": {
          "method": "KO/TKO",
          "round": 4
        }
      },
      "F2": {
        "selectionId": "benoit-saint-denis",
        "wager": 50,
        "odds": -157,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": -155,
          "draftkings": -160,
          "avg": -157
        },
        "prediction": {
          "method": "KO/TKO",
          "round": 2
        }
      },
      "F3": {
        "selectionId": "mario-bautista",
        "wager": 50,
        "odds": 132,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": 130,
          "draftkings": 135,
          "avg": 132
        },
        "prediction": {
          "method": "Decision",
          "round": null
        }
      },
      "F4": {
        "selectionId": "loneer-kavanagh",
        "wager": 50,
        "odds": -232,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": -235,
          "draftkings": -230,
          "avg": -232
        },
        "prediction": {
          "method": "Decision",
          "round": null
        }
      },
      "F5": {
        "selectionId": "terrance-mckinney",
        "wager": 100,
        "odds": -168,
        "oddsSource": "AVG",
        "oddsSnapshotId": "ufc-329",
        "oddsSnapshotLabel": "Manual market snapshot + AVG",
        "oddsSources": {
          "fanduel": -166,
          "draftkings": -170,
          "avg": -168
        },
        "prediction": {
          "method": "Submission",
          "round": 1
        }
      }
    },
    "props": {
      "fastestFinish": "F5",
      "fightOfNight": "F4",
      "totalDecisions": 2,
      "totalFinishes": 3
    },
    "derivedProps": {
      "fastestFinish": "F5",
      "totalDecisions": 2,
      "totalFinishes": 3
    }
  }
],
};

window.RISKEM_EVENTS["ufc-324"] = UFC_329_EVENT;
window.RISKEM_EVENTS["ufc-329"] = {
  ...UFC_329_EVENT,
  id: "ufc-329",
};

window.RISKEM_EVENT_ORDER.push("ufc-329");
