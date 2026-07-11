window.RISKEM_ODDS_SNAPSHOTS = window.RISKEM_ODDS_SNAPSHOTS || {};

/*
  UFC 324 odds snapshot.

  Fill FanDuel and DraftKings moneyline prices here, then refresh the page.
  AVG will be calculated from the two implied probabilities unless you set avg manually.

  Example:
  { fanduel: -135, draftkings: -140, avg: null }
*/
window.RISKEM_ODDS_SNAPSHOTS["ufc-324"] = {
  sourceLabel: "FanDuel + DraftKings AVG",
  pulledAt: "Manual snapshot pending",
  note: "AVG is computed from FanDuel and DraftKings implied probabilities, then converted back to American odds.",
  contests: {
    F1: {
      "conor-mcgregor": { fanduel: null, draftkings: null, avg: null },
      "max-holloway": { fanduel: null, draftkings: null, avg: null },
    },
    F2: {
      "benoit-saint-denis": { fanduel: null, draftkings: null, avg: null },
      "paddy-pimblett": { fanduel: null, draftkings: null, avg: null },
    },
    F3: {
      "cory-sandhagen": { fanduel: null, draftkings: null, avg: null },
      "mario-bautista": { fanduel: null, draftkings: null, avg: null },
    },
    F4: {
      "brandon-royval": { fanduel: null, draftkings: null, avg: null },
      "loneer-kavanagh": { fanduel: null, draftkings: null, avg: null },
    },
    F5: {
      "king-green": { fanduel: null, draftkings: null, avg: null },
      "terrance-mckinney": { fanduel: null, draftkings: null, avg: null },
    },
  },
};

window.RISKEM_APPLY_ODDS_SNAPSHOT?.("ufc-324");
