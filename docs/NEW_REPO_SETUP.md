# New repo setup: riskem-live

Recommended repo name:

```text
riskem-live
```

## 1. Create the repo

Create a new GitHub repo named `riskem-live`.

## 2. Copy this folder into the repo root

The repo root should contain:

```text
index.html
scoreboard.html
assets/
sports/
events/
tools/
.github/
README.md
package.json
.nojekyll
```

Do not nest these files inside another folder in the repo.

## 3. First commit

```powershell
git init
git add .
git commit -m "Initial Risk'em Live app"
git branch -M main
git remote add origin https://github.com/bamgitbam/riskem-live.git
git push -u origin main
```

## 4. Enable GitHub Pages

Repo → Settings → Pages

Use:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

## 5. Test URLs

```text
https://bamgitbam.github.io/riskem-live/
https://bamgitbam.github.io/riskem-live/index.html?event=ufc-324
https://bamgitbam.github.io/riskem-live/scoreboard.html?event=ufc-324
https://bamgitbam.github.io/riskem-live/index.html?event=f8wc-quarterfinals
https://bamgitbam.github.io/riskem-live/scoreboard.html?event=f8wc-quarterfinals
```

## 6. Add odds API key

Repo → Settings → Secrets and variables → Actions → New repository secret

```text
Name: ODDS_API_KEY
Value: your key
```

Then run:

```text
Actions → Update Odds Snapshot → Run workflow
event_id: ufc-324
sport_key: mma_mixed_martial_arts
```
