# Risk’em Live

Risk’em Live is a static, GitHub Pages-friendly multi-sport pick’em / odds-pool app.

It started as F8WC Risk’em and now supports a single reusable codebase for:

```text
Soccer
UFC / MMA
Boxing
American football
Racing
Future sports through adapters
```

No backend is required for the public app.

## Current ready events

```text
index.html?event=ufc-329
scoreboard.html?event=ufc-329

Legacy test link also works:

index.html?event=ufc-324
scoreboard.html?event=ufc-324

index.html?event=f8wc-quarterfinals
scoreboard.html?event=f8wc-quarterfinals

index.html?event=nfl-week-template
scoreboard.html?event=nfl-week-template

index.html?event=boxing-card-template
scoreboard.html?event=boxing-card-template

index.html?event=racing-template
scoreboard.html?event=racing-template
```

## File structure

```text
index.html
scoreboard.html

assets/
  riskem-core.js
  riskem.css
  odds-tools.js

sports/
  soccer.js
  combat.js
  football.js
  racing.js

events/
  f8wc-quarterfinals.js
  ufc-324.js
  nfl-week-template.js
  boxing-card-template.js
  racing-template.js
  odds/
    ufc-324-odds.js

tools/
  pull-odds.mjs

.github/
  workflows/
    update-odds.yml
    update-odds-scheduled.example.yml
```

## How the sport switch works

The URL controls the event:

```text
scoreboard.html?event=ufc-324
```

The event file declares which sport adapter it uses:

```js
sport: "combat"
```

The shared core then uses that adapter for labels, prediction fields, bonuses, props, and result formatting.

## UFC 324 quick workflow

1. Open:

```text
index.html?event=ufc-324
```

2. Players enter:
   - winner
   - wager
   - locked odds
   - method
   - round
   - event props

3. Player copies the generated JSON.

4. Commissioner tests entries at:

```text
scoreboard.html?event=ufc-324
```

Use **Commissioner Local Test Import** to paste one entry or an array of entries.

5. To publish entries, paste finalized player objects into:

```text
events/ufc-324.js
```

under:

```js
players: []
```

6. After fights finish, update:

```js
results
finalProps
```

in the same event file.

## Combat scoring

For UFC / MMA / boxing style events:

```text
Correct winner = locked-odds wager profit
Wrong winner = loses wager
Correct method = +25
Correct finish round = +25
Decision / No Contest = no finish-round field and no round bonus
Final props apply only when finalProps.complete is true
```

## Platform rule model

```text
User-entered fields = true picks only
Derived fields = automatic
Commissioner-only fields = final results only

Budget = $100 × number of contests
Default pick range = $25–$150, capped by event budget
Minimum total wager = 50% of event budget
Maximum total wager = 100% of event budget
Unspent budget is allowed

Odds = AVG line only, locked automatically from the selected entrant
Fastest finish / total decisions / total finishes = derived from player picks
Fight of the Night = user-selected prop
```

## Soccer scoring

The F8WC event preserves the current soccer rules:

```text
Correct advancing team = locked-odds wager profit
Wrong pick = loses wager
Exact score = +50
Correct margin = +25
Correct total goals = +15
One team score exact = +10
Proper Stars only score when finalProps.complete is true
```

## Odds board

The odds layer supports:

```text
FanDuel
DraftKings
AVG
```

AVG is calculated by:

```text
American odds → implied probability
average implied probabilities
implied probability → American odds
```

This is safer than directly averaging American odds.

## Manual odds snapshot

Edit:

```text
events/odds/ufc-324-odds.js
```

Example:

```js
"max-holloway": { fanduel: -135, draftkings: -140, avg: null }
```

Leave `avg: null` to let the app calculate AVG.

## Pull odds locally

Create an `.env` file or set the variable in PowerShell:

```powershell
$env:ODDS_API_KEY="your-api-key"
node tools/pull-odds.mjs ufc-324 mma_mixed_martial_arts
```

Then commit the generated odds file:

```powershell
git add events/odds/ufc-324-odds.js
git commit -m "Update UFC 324 odds snapshot"
git push
```

## Pull odds with GitHub Actions

Add a repo secret:

```text
Settings → Secrets and variables → Actions → New repository secret

Name: ODDS_API_KEY
Value: your key
```

Then run:

```text
Actions → Update Odds Snapshot → Run workflow
```

Use:

```text
event_id: ufc-324
sport_key: mma_mixed_martial_arts
```

The public site never receives the API key. GitHub Actions pulls the odds and commits a static snapshot.

## New repo deployment

Recommended repo name:

```text
riskem-live
```

Deploy with GitHub Pages from:

```text
main branch / root
```

See:

```text
docs/NEW_REPO_SETUP.md
```


## Dummy-proof submission validation

The entry form now hardens submissions at build time:

```text
Decision / No Contest → round is stored as null
Finish methods → legal finish round required
Per-pick wager min/max enforced
Total wager min/max enforced
Derived props rebuilt from finalized picks
```

For UFC 329, the 5-fight card uses:

```text
Budget: $500
Pick range: $25–$150
Minimum total wager: $250
Maximum total wager: $500
```

If the form shows a $400 maximum for UFC 329, clear cache or use a new cache-buster query.


## Local test import guard

The scoreboard import box validates pasted JSON before saving it to local browser storage.

Invalid imports are rejected for:

```text
wager over per-pick maximum
total wager over event maximum
finish round beyond scheduled rounds
missing locked AVG odds
invalid fighter/team/entrant ids
```

If old bad entries still show, click **Clear Local Imports** on the scoreboard and re-import clean submissions.


## Scoreboard polish

The scoreboard presentation uses a few safety-first display rules:

```text
Leader shows Open until the first result is complete.
If leaders are tied after scoring starts, it shows 2-way tie / 3-way tie.
Repeated contest labels use compact table headers like F3/F4/F5.
Local test imports are labeled as active on this device only.
User-side fastest finish is labeled Predicted fastest finish.
```


## Commissioner lock workflow

The scoreboard includes a commissioner export panel.

Use it to promote local test entries into the public event file:

```text
1. Paste and validate local submissions
2. Review Standings and Locked Picks
3. Copy Public Players Block
4. Paste into events/<event-id>.js, replacing players: []
5. Optional: set entriesLocked: true
6. Commit and push
```

The export panel also provides:

```text
Copy Local Imports JSON
Copy Event Lock Patch
Copy Lock Message
Duplicate-name warnings
Duplicate submittedAt warnings
```

When `entriesLocked: true`, the entry page closes and shows an Entries Locked notice.


## Fun test / user-ready flow

For a 4–6 user test:

```text
1. Send users the entry page URL.
2. Each user fills the form.
3. User clicks Validate Entry.
4. User clicks Copy Entry JSON or Share / Copy Entry.
5. Commissioner pastes the JSON into the scoreboard Local Test Import.
6. Commissioner reviews Locked Picks and Standings.
7. Commissioner copies Public Players Block into the event file when ready to lock.
```

Entry-page buttons:

```text
Validate Entry
Copy Entry JSON
Share / Copy Entry
Download JSON
Open Scoreboard
```

The app does not send entries to a server. The copied JSON is the submission record.

## Existing F8WC safety

Do not overwrite the existing live F8WC repo root unless you are ready to promote this version.

Safe testing options:

```text
New repo: riskem-live
Existing repo sandbox: /v2/
```


## UFC 329 autofill update

The UFC card now includes default wagers, AVG locked odds, recommended method/round defaults by selected fighter, and default fight props. The old `event=ufc-324` URL remains available as a compatibility alias, but `event=ufc-329` is the cleaner public URL.

## UFC 329 automation update

Combat entry rules now use the normalized unit policy:

```text
Budget = $100 × number of contests
Minimum pick = 25% of average contest budget
Maximum pick = 150% of average contest budget
Minimum total wager = 50% of event budget
Maximum total wager = 100% of event budget
Unspent budget is allowed
```

For a 5-fight UFC main card this becomes:

```text
Budget: $500
Pick range: $25–$150
Minimum total wager: $250
Maximum total wager: $500
```

UFC fields now automate:

```text
Locked odds / AVG is read-only for players
Decision hides/disables finish round
Finish methods require a valid finish round within scheduled rounds
Earliest finish fight is derived from the earliest selected finish round
Total decisions and total finishes are derived from method picks
```
