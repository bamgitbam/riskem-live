# Local import validation guard

This pass hardens the scoreboard local test import.

## What changed

- Local imports are validated before being saved to browser localStorage.
- Invalid imported JSON is rejected instead of being displayed.
- Imported Decision / No Contest picks are normalized to `round: null`.
- Imported finish picks must use legal finish rounds.
- Imported wagers must obey per-pick and total wager limits.
- Imported derived props are rebuilt from finalized picks.
- Imported odds display is normalized to `AVG`.

## Important

Existing bad local imports already saved in the browser will still display until cleared.

Use:

```text
Scoreboard → Commissioner Local Test Import → Clear Local Imports
```

Then re-import clean submissions.
