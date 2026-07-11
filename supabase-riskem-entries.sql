
-- Risk’em Live Supabase direct-submit table/policies.
-- Run in Supabase SQL Editor.

create table if not exists public.riskem_entries (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  player_name text not null,
  submitted_at timestamptz not null default now(),
  entry jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.riskem_entries enable row level security;

-- Needed for direct submit replacement by exact player name.
create unique index if not exists riskem_entries_event_player_unique
on public.riskem_entries (event_id, player_name);

drop policy if exists "riskem public read entries" on public.riskem_entries;
drop policy if exists "riskem public submit entries" on public.riskem_entries;
drop policy if exists "riskem public update own event entries" on public.riskem_entries;

create policy "riskem public read entries"
on public.riskem_entries
for select
to anon
using (true);

create policy "riskem public submit entries"
on public.riskem_entries
for insert
to anon
with check (
  event_id ~ '^[a-z0-9-]+$'
  and length(player_name) between 1 and 80
  and jsonb_typeof(entry) = 'object'
);

create policy "riskem public update own event entries"
on public.riskem_entries
for update
to anon
using (
  event_id ~ '^[a-z0-9-]+$'
  and length(player_name) between 1 and 80
)
with check (
  event_id ~ '^[a-z0-9-]+$'
  and length(player_name) between 1 and 80
  and jsonb_typeof(entry) = 'object'
);
