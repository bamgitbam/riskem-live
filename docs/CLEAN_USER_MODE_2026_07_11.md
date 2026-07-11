
# Clean user mode

This build hides commissioner/admin complexity from normal users.

## Public entry page

Users now see:

```text
Your Entry
Fights
Fight Props
Submit Your Picks
```

The submit buttons are:

```text
Check My Entry
Copy My Picks
View Scoreboard
```

The copied technical submission record is hidden inside `Show copied entry text`.

## Public scoreboard

Normal users do not see:

```text
Commissioner Local Test Import
Commissioner Lock / Public Export
Event switcher
Odds Board
Local import warning
```

## Commissioner mode

Use this URL for admin/testing:

```text
scoreboard.html?event=ufc-329&commissioner=1
```

Commissioner mode shows:

```text
Local test imports
Public players block export
Event lock patch export
Event switcher
Odds board
```
