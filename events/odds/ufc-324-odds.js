window.RISKEM_ODDS_SNAPSHOTS = window.RISKEM_ODDS_SNAPSHOTS || {};

/*
  UFC 329 manual odds snapshot.

  These are practical, close-to-market placeholder FanDuel/DraftKings style
  lines built around publicly listed UFC 329 moneylines. Replace with the
  GitHub Actions/API pull when ODDS_API_KEY is available.

  AVG is computed from implied probability unless avg is set manually.
*/
const UFC_329_ODDS_SNAPSHOT = {
  sourceLabel: "Manual market snapshot + AVG",
  pulledAt: "Manual snapshot · July 10, 2026",
  note: "Publicly listed moneylines were used as the baseline; FD/DK values are close two-book placeholders until the API pull is enabled.",
  contests: {
    F1: {
      "conor-mcgregor": { fanduel: 185, draftkings: 190, avg: null },
      "max-holloway": { fanduel: -225, draftkings: -230, avg: null },
    },
    F2: {
      "benoit-saint-denis": { fanduel: -155, draftkings: -160, avg: null },
      "paddy-pimblett": { fanduel: 130, draftkings: 135, avg: null },
    },
    F3: {
      "cory-sandhagen": { fanduel: -155, draftkings: -160, avg: null },
      "mario-bautista": { fanduel: 130, draftkings: 135, avg: null },
    },
    F4: {
      "brandon-royval": { fanduel: 185, draftkings: 180, avg: null },
      "loneer-kavanagh": { fanduel: -235, draftkings: -230, avg: null },
    },
    F5: {
      "king-green": { fanduel: 140, draftkings: 145, avg: null },
      "terrance-mckinney": { fanduel: -166, draftkings: -170, avg: null },
    },
  },
};

window.RISKEM_ODDS_SNAPSHOTS["ufc-324"] = UFC_329_ODDS_SNAPSHOT;
window.RISKEM_ODDS_SNAPSHOTS["ufc-329"] = UFC_329_ODDS_SNAPSHOT;

window.RISKEM_APPLY_ODDS_SNAPSHOT?.("ufc-324");
window.RISKEM_APPLY_ODDS_SNAPSHOT?.("ufc-329");
