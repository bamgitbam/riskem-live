# Public/local duplicate guard

This pass prevents entries from being double-counted after promotion.

## Problem

If local test imports are copied into `events/ufc-329.js` and the browser still has those same local imports saved, the scoreboard can show each player twice.

## Fix

`allPlayers(event)` now dedupes public event-file players + local imports by:

```text
submittedAt
fallback: normalized name + picks JSON
```

Official event-file entries win over local imports.

## Commissioner display

The export panel now distinguishes:

```text
active players
local imports saved
ignored local duplicates already published
```

You can still click **Clear Local Test Entries** after publishing, but the scoreboard no longer double-counts while localStorage still has old test imports.
