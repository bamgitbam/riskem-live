# Cache-busted polish deploy

This package adds a version query to every local CSS/JS asset loaded by `index.html` and `scoreboard.html`.

Version:

```text
20260711-polish-cache1
```

Why:

GitHub Pages and browsers can cache files such as:

```text
assets/riskem-core.js
sports/combat.js
```

even when the page URL uses `?v=...`.

The HTML now loads:

```text
assets/riskem-core.js?v=20260711-polish-cache1
sports/combat.js?v=20260711-polish-cache1
```

so the polish updates are forced onto the live page.
