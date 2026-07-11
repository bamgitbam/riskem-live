
# Ready empty scoreboard

This pass removes the two test players from the UFC event file.

## Why they remained

Supabase rows were cleared, but the event file still had published test players inside:

```text
players: [...]
```

The public scoreboard loads event-file players plus Supabase live entries, so those test players still appeared.

## Fix

The UFC event file now has:

```js
players: []
entriesLocked: false
```

Supabase remains the live source for incoming test entries.
