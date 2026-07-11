
# Supabase ON CONFLICT fallback

This hotfix handles:

```text
42P10: there is no unique or exclusion constraint matching the ON CONFLICT specification
```

## Cause

The app attempted to upsert by:

```text
event_id, player_name
```

but the Supabase table did not yet have the matching unique index.

## Fixes

1. App now retries as a normal insert if the unique index is missing.
2. `supabase-riskem-entries.sql` now cleans existing duplicates before creating the unique index.
3. After the SQL is run, future exact-name resubmits replace the prior entry for that event.
