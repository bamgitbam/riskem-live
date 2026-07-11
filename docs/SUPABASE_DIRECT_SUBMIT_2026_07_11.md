
# Supabase direct submit

This build sends picks directly to Supabase, then redirects users to the scoreboard.

## User flow

```text
Fill entry
Check My Entry
Submit Your Picks
Scoreboard opens
```

## Required Supabase SQL

Run the root file:

```text
supabase-riskem-entries.sql
```

The SQL creates:

```text
public.riskem_entries
public read policy
public insert policy
public update policy
unique event_id + player_name index
```

The app uses an exact-name upsert, so a resubmission with the same name replaces the prior entry for that event.

## Public configuration

The browser uses:

```text
assets/live-config.js
```

Only the Supabase project URL and publishable key are stored there.
Do not put a secret key or database password in this file.
