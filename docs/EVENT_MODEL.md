# Risk’em Live event model

Risk’em Live uses one shared app and changes sports by changing the event id in the URL.

```text
index.html?event=ufc-324
scoreboard.html?event=ufc-324
```

Each event lives in `/events/`.

Each sport adapter lives in `/sports/`.

## Event fields

```js
window.RISKEM_EVENTS["your-event-id"] = {
  id: "your-event-id",
  sport: "combat",
  title: "Your Event Risk’em",
  subtitle: "Main Card",
  shortLabel: "Your Event",
  currency: "Fight Bucks",
  publicNote: "Optional public note.",
  revealLockedPicks: true,

  rules: {
    budget: 400,
    minWager: 25,
    maxWager: 150,
    minTotalWager: 200,
    maxTotalWager: 400,
  },

  contests: [],
  results: {},
  finalProps: {},
  players: [],
};
```

## Contest

A contest can be a fight, match, game, race, or any other pickable item.

```js
{
  id: "F1",
  label: "Main Event",
  type: "fight",
  weight: "Welterweight",
  scheduled: "Tomorrow, 6:00 PM",
  entrants: [
    { id: "fighter-a", name: "Fighter A", record: "10-0-0", odds: -120 },
    { id: "fighter-b", name: "Fighter B", record: "12-3-0", odds: 100 },
  ],
}
```

## Player pick

```js
F1: {
  selectionId: "fighter-a",
  wager: 100,
  odds: -120,
  prediction: {
    method: "KO/TKO",
    round: 2
  }
}
```

## Result

```js
F1: {
  complete: true,
  winnerId: "fighter-a",
  method: "KO/TKO",
  round: 2,
  time: "3:14"
}
```
