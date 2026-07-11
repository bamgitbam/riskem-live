# Commissioner lock mode

This pass adds the bridge between local test imports and the public locked scoreboard.

## New scoreboard tools

The scoreboard now has:

```text
Commissioner Local Test Import
Commissioner Lock / Public Export
```

## Workflow

1. Players submit JSON from the entry page.
2. Commissioner pastes each JSON into Local Test Import.
3. The app validates:
   - legal wagers
   - legal total wager
   - legal finish rounds
   - valid entrants
   - locked AVG odds
4. Commissioner reviews standings and locked picks.
5. Commissioner copies `Public Players Block`.
6. Commissioner pastes that block into the event file, replacing `players: []`.
7. Optional: copy `Event Lock Patch` to also set:

```js
entriesLocked: true,
revealLockedPicks: true,
```

## Entry lock

When an event config has:

```js
entriesLocked: true
```

the entry page shows an Entries Locked panel instead of the submission form.
