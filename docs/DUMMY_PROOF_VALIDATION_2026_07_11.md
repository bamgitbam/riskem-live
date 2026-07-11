# Dummy-proof validation hardening

This pass makes the submission builder the source of truth, not just the visible UI.

## Fixed

- Decision / No Contest submissions always store `round: null`.
- Finish methods require a valid finish round.
- Finish rounds are normalized to legal scheduled rounds before final validation.
- Per-pick wager minimum and maximum are enforced during Build Submission.
- Total wager minimum and maximum are enforced during Build Submission.
- Derived props are rebuilt from the finalized pick JSON before output.
- Fastest finish ignores decisions and invalid finish rounds.
- Total decisions and finishes are derived from finalized picks, not user-editable fields.

## UFC 329 rules

5 fights means:

```text
Budget = $500
Min total wager = $250
Max total wager = $500
Per-pick range = $25–$150
```

Under the platform rule, a 5-fight card should not display a $400 maximum. If it does, the page is using stale cached files or an older event config.
