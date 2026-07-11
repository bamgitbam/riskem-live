window.RISKEM_EVENTS = window.RISKEM_EVENTS || {};
window.RISKEM_EVENT_ORDER = window.RISKEM_EVENT_ORDER || [];

window.RISKEM_EVENTS["f8wc-quarterfinals"] = {
  id: "f8wc-quarterfinals",
  sport: "soccer",
  title: "F8WC Risk’em",
  subtitle: "Quarterfinal Scoreboard",
  shortLabel: "F8WC QF",
  currency: "Cup Bucks",
  publicNote: "Official scoring uses each player’s locked odds. Match Results show scores only.",
  revealLockedPicks: true,
  rules: {
    budget: 400,
    minWager: 25,
    maxWager: 150,
    minTotalWager: 200,
    maxTotalWager: 400,
  },
  contests: [
    { id: "QF1", label: "QF1", type: "match", entrants: [
      { id: "france", name: "France", odds: -390 },
      { id: "morocco", name: "Morocco", odds: 300 },
    ]},
    { id: "QF2", label: "QF2", type: "match", entrants: [
      { id: "spain", name: "Spain", odds: -320 },
      { id: "belgium", name: "Belgium", odds: 230 },
    ]},
    { id: "QF3", label: "QF3", type: "match", entrants: [
      { id: "norway", name: "Norway", odds: 170 },
      { id: "england", name: "England", odds: -200 },
    ]},
    { id: "QF4", label: "QF4", type: "match", entrants: [
      { id: "argentina", name: "Argentina", odds: -150 },
      { id: "switzerland", name: "Switzerland", odds: 280 },
    ]},
  ],
  results: {
    QF1: { complete: true, aScore: 2, bScore: 0, winnerId: "france", topScorers: ["Kylian Mbappé — France", "Ousmane Dembélé — France"] },
    QF2: { complete: true, aScore: 2, bScore: 1, winnerId: "spain", topScorers: ["Fabián Ruiz — Spain", "Charles De Ketelaere — Belgium"] },
    QF3: { complete: false, aScore: null, bScore: null, winnerId: "", topScorers: [] },
    QF4: { complete: false, aScore: null, bScore: null, winnerId: "", topScorers: [] },
  },
  finalProps: {
    complete: false,
    topScorers: [],
    teamMostGoals: "",
    shootouts: null,
  },
  players: [
    {
      name: "Bam Bam HT",
      submittedAt: "2026-07-08T00:30:46.799Z",
      picks: {
        QF1: { selectionId: "morocco", wager: 150, odds: 300, prediction: { aScore: 2, bScore: 3 } },
        QF2: { selectionId: "spain", wager: 50, odds: -340, prediction: { aScore: 2, bScore: 1 } },
        QF3: { selectionId: "england", wager: 150, odds: -230, prediction: { aScore: 1, bScore: 2 } },
        QF4: { selectionId: "argentina", wager: 50, odds: -180, prediction: { aScore: 2, bScore: 0 } },
      },
      props: { topScorer: "Jude Bellingham — England", teamGoals: "England", shootouts: 0 },
    },
    {
      name: "Bam Bam",
      submittedAt: "2026-07-08T00:34:19.403Z",
      picks: {
        QF1: { selectionId: "france", wager: 150, odds: -390, prediction: { aScore: 3, bScore: 1 } },
        QF2: { selectionId: "spain", wager: 150, odds: -340, prediction: { aScore: 2, bScore: 1 } },
        QF3: { selectionId: "norway", wager: 50, odds: 170, prediction: { aScore: 2, bScore: 1 } },
        QF4: { selectionId: "argentina", wager: 50, odds: -150, prediction: { aScore: 2, bScore: 1 } },
      },
      props: { topScorer: "Kylian Mbappé — France", teamGoals: "France", shootouts: 1 },
    },
    {
      name: "Mongoose",
      submittedAt: "2026-07-08T02:03:10.000Z",
      picks: {
        QF1: { selectionId: "france", wager: 150, odds: -390, prediction: { aScore: 2, bScore: 0 } },
        QF2: { selectionId: "belgium", wager: 100, odds: 230, prediction: { aScore: 1, bScore: 2 } },
        QF3: { selectionId: "norway", wager: 100, odds: 170, prediction: { aScore: 3, bScore: 2 } },
        QF4: { selectionId: "argentina", wager: 50, odds: -150, prediction: { aScore: 2, bScore: 1 } },
      },
      props: { topScorer: "Erling Haaland — Norway", teamGoals: "Norway", shootouts: 1 },
    },
    {
      name: "Doug the Head",
      submittedAt: "2026-07-08T02:31:26.000Z",
      picks: {
        QF1: { selectionId: "morocco", wager: 150, odds: 300, prediction: { aScore: 1, bScore: 2 } },
        QF2: { selectionId: "spain", wager: 50, odds: -340, prediction: { aScore: 3, bScore: 1 } },
        QF3: { selectionId: "england", wager: 100, odds: -230, prediction: { aScore: 1, bScore: 3 } },
        QF4: { selectionId: "argentina", wager: 100, odds: -180, prediction: { aScore: 3, bScore: 2 } },
      },
      props: { topScorer: "Lionel Messi — Argentina", teamGoals: "Argentina", shootouts: 2 },
    },
    {
      name: "Rob Ingham 1",
      submittedAt: "2026-07-08T04:08:11.000Z",
      picks: {
        QF1: { selectionId: "france", wager: 50, odds: -390, prediction: { aScore: 4, bScore: 3 } },
        QF2: { selectionId: "spain", wager: 150, odds: -340, prediction: { aScore: 3, bScore: 2 } },
        QF3: { selectionId: "norway", wager: 150, odds: 165, prediction: { aScore: 4, bScore: 2 } },
        QF4: { selectionId: "argentina", wager: 50, odds: -180, prediction: { aScore: 3, bScore: 2 } },
      },
      props: { topScorer: "Erling Haaland — Norway", teamGoals: "France", shootouts: 1 },
    },
    {
      name: "Raaab",
      submittedAt: "2026-07-08T04:09:36.000Z",
      picks: {
        QF1: { selectionId: "morocco", wager: 150, odds: 300, prediction: { aScore: 3, bScore: 4 } },
        QF2: { selectionId: "spain", wager: 150, odds: -340, prediction: { aScore: 3, bScore: 2 } },
        QF3: { selectionId: "england", wager: 50, odds: -230, prediction: { aScore: 2, bScore: 4 } },
        QF4: { selectionId: "argentina", wager: 50, odds: -180, prediction: { aScore: 3, bScore: 2 } },
      },
      props: { topScorer: "Jude Bellingham — England", teamGoals: "England", shootouts: 1 },
    },
    {
      name: "Livinfree",
      submittedAt: "2026-07-08T22:38:52.000Z",
      picks: {
        QF1: { selectionId: "france", wager: 100, odds: -390, prediction: { aScore: 3, bScore: 2 } },
        QF2: { selectionId: "belgium", wager: 100, odds: 230, prediction: { aScore: 1, bScore: 3 } },
        QF3: { selectionId: "norway", wager: 100, odds: 165, prediction: { aScore: 4, bScore: 1 } },
        QF4: { selectionId: "argentina", wager: 100, odds: -180, prediction: { aScore: 2, bScore: 1 } },
      },
      props: { topScorer: "Erling Haaland — Norway", teamGoals: "Norway", shootouts: 0 },
    },
  ],
};

window.RISKEM_EVENT_ORDER.push("f8wc-quarterfinals");
