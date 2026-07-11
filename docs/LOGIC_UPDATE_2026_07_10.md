# Logic update: true picks, derived fields, commissioner results

This update tightens Risk’em Live around one rule:

```text
User-entered fields = true picks only
Everything derivable = automatic
Commissioner-only fields = final results only
```

## Updated UFC/combat behavior

- Locked AVG odds are read-only.
- Submission JSON stores the selected entrant AVG odds, odds source, and odds snapshot id/label.
- Method controls the Finish Round field.
- Decision and No Contest hide/disable Finish Round.
- Finish methods require a valid Finish Round.
- Finish Round is now a valid-round dropdown, not a free number field.
- Finish Round cannot exceed the contest’s scheduled rounds.
- Fastest finish fight is derived from the earliest finish-round pick.
- Total decisions is derived from method picks.
- Total finishes is derived from method picks.
- Fight of the Night remains the only user-selected fight prop.

## Platform budget model

Default platform rules:

```text
Budget = $100 × number of contests
Pick range = $25–$150 by default, capped by event budget
Minimum total wager = 50% of event budget
Maximum total wager = 100% of event budget
Unspent budget is allowed
```

Events can still override these rules explicitly in their event config.
