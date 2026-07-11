(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }
  function h(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }
  function money(n) {
    return `$${Math.round(Number(n) || 0).toLocaleString()}`;
  }
  function moneyExact(n) {
    const value = Number(n) || 0;
    return `$${value.toFixed(2).replace(/\.00$/, "")}`;
  }
  function profitLabel(n) {
    const value = Number(n) || 0;
    if (Math.abs(value) < 0.005) return "$0";
    const sign = value > 0 ? "+" : "-";
    return `${sign}${moneyExact(Math.abs(value))}`;
  }
  function fmtOdds(odds) {
    if (odds === null || odds === undefined || odds === "") return "—";
    const n = Number(odds);
    if (!Number.isFinite(n) || n === 0) return "—";
    return n > 0 ? `+${n}` : `${n}`;
  }
  function profitFor(wager, odds) {
    const w = Number(wager) || 0;
    const o = Number(odds) || 0;
    if (!w || !o) return 0;
    return o > 0 ? (w * o) / 100 : (w * 100) / Math.abs(o);
  }
  function resolvedRules(event) {
    const raw = event.rules || {};
    const contestCount = Math.max(1, (event.contests || []).length);

    // Platform default: every contest contributes one $100 budget unit.
    // This keeps UFC cards, football slates, soccer rounds, boxing cards,
    // and racing events proportional without hand-tuning every event.
    const unit = Number(raw.unitPerContest || raw.averageBudget || raw.budgetPerContest || 100);
    const budget = Number(raw.budget ?? unit * contestCount);
    const base = budget ? budget / contestCount : unit;

    const minWager = Number(raw.minWager ?? Math.round(base * Number(raw.minWagerPct ?? 0.25)));
    const defaultMaxWager = Math.min(budget || Infinity, Math.round(base * Number(raw.maxWagerPct ?? 1.5)));
    const maxWager = Number(raw.maxWager ?? defaultMaxWager);
    const minTotalWager = Number(raw.minTotalWager ?? Math.round(budget * Number(raw.minTotalPct ?? 0.5)));
    const maxTotalWager = Number(raw.maxTotalWager ?? Math.round(budget * Number(raw.maxTotalPct ?? 1)));

    return {
      ...raw,
      budget,
      minWager,
      maxWager,
      minTotalWager,
      maxTotalWager,
      unitPerContest: unit,
    };
  }
  function eventIds() {
    const order = window.RISKEM_EVENT_ORDER || [];
    const all = Object.keys(window.RISKEM_EVENTS || {});
    return [...order, ...all.filter((id) => !order.includes(id))];
  }
  function getEventId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("event") || eventIds()[0] || "";
  }
  function getEvent() {
    const id = getEventId();
    return (window.RISKEM_EVENTS || {})[id];
  }
  function getSport(event) {
    return (window.RISKEM_SPORTS || {})[event?.sport];
  }
  function findContest(event, contestId) {
    return (event.contests || []).find((c) => c.id === contestId);
  }
  function entrantName(event, entrantId) {
    if (!entrantId) return "";
    for (const contest of event.contests || []) {
      const entrant = (contest.entrants || []).find((e) => e.id === entrantId);
      if (entrant) return entrant.name;
    }
    return entrantId;
  }
  function contestName(event, contestId) {
    const contest = findContest(event, contestId);
    if (!contest) return "";
    const names = (contest.entrants || []).map((e) => e.name).join(" vs ");
    return `${contest.label} · ${names}`;
  }
  function entrantForPick(contest, pick) {
    return (contest.entrants || []).find((e) => e.id === pick?.selectionId);
  }
  function lockedOdds(contest, pick) {
    if (pick?.odds !== null && pick?.odds !== undefined && pick?.odds !== "") return Number(pick.odds);
    const entrant = entrantForPick(contest, pick);
    return Number(entrant?.odds || 0);
  }
  function officialPlayers(event) {
    return Array.isArray(event.players) ? event.players : [];
  }
  function localKey(event) {
    return `riskem-local-imports:${event.id}`;
  }
  function loadLocalImports(event) {
    try {
      const raw = localStorage.getItem(localKey(event));
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (_) {
      return [];
    }
  }
  function saveLocalImports(event, players) {
    try { localStorage.setItem(localKey(event), JSON.stringify(players, null, 2)); } catch (_) {}
  }
  function allPlayers(event) {
    return [...officialPlayers(event), ...loadLocalImports(event)];
  }
  function totalWagered(player, event) {
    return (event.contests || []).reduce((sum, contest) => sum + Number(player.picks?.[contest.id]?.wager || 0), 0);
  }
  function contestScore(player, contest, event, sport) {
    const pick = player.picks?.[contest.id];
    const result = event.results?.[contest.id];
    if (!pick || !result?.complete) {
      return { profit: 0, bonus: 0, total: 0, status: "Pending" };
    }
    const win = pick.selectionId === result.winnerId;
    const profit = win ? profitFor(pick.wager, lockedOdds(contest, pick)) : -Number(pick.wager || 0);
    const bonus = win && sport?.scoreBonus ? Number(sport.scoreBonus(pick, result, contest, event) || 0) : 0;
    return { profit, bonus, total: profit + bonus, status: win ? "Win" : "Loss" };
  }
  function propsScore(player, event, sport) {
    return sport?.propsScore ? Number(sport.propsScore(player, event) || 0) : 0;
  }
  function totalFor(player, event, sport) {
    const contests = (event.contests || []).reduce((sum, contest) => sum + contestScore(player, contest, event, sport).total, 0);
    return Number(resolvedRules(event).budget || 0) + contests + propsScore(player, event, sport);
  }
  function rankedPlayers(event, sport) {
    return allPlayers(event)
      .map((player) => ({
        player,
        total: totalFor(player, event, sport),
        props: propsScore(player, event, sport),
        wagered: totalWagered(player, event),
        contestNet: (event.contests || []).reduce((sum, contest) => sum + contestScore(player, contest, event, sport).profit, 0),
        bonus: (event.contests || []).reduce((sum, contest) => sum + contestScore(player, contest, event, sport).bonus, 0),
      }))
      .sort((a, b) => b.total - a.total || new Date(a.player.submittedAt || 0) - new Date(b.player.submittedAt || 0));
  }
  function setHrefWithEvent(id, path, event) {
    const node = $(id);
    if (node) node.href = `${path}?event=${encodeURIComponent(event.id)}`;
  }
  function renderEventOptions(event) {
    const select = $("eventSelect");
    if (!select) return;
    select.innerHTML = eventIds().map((id) => {
      const ev = window.RISKEM_EVENTS[id];
      return `<option value="${h(id)}" ${id === event.id ? "selected" : ""}>${h(ev?.shortLabel || ev?.title || id)}</option>`;
    }).join("");
    select.onchange = () => {
      const next = select.value;
      const page = document.body.dataset.page === "submit" ? "index.html" : "scoreboard.html";
      window.location.href = `${page}?event=${encodeURIComponent(next)}`;
    };
  }
  function renderShell(event, sport) {
    document.title = `${event.title} ${document.body.dataset.page === "submit" ? "Entry" : "Scoreboard"}`;
    if ($("heroKicker")) $("heroKicker").textContent = `${sport.name} · ${sport.contestNounPlural || "Contests"}`;
    if ($("heroTitle")) $("heroTitle").innerHTML = h(event.title).replace("Risk’em", `<span class="gold">Risk’em</span>`);
    if ($("heroSub")) $("heroSub").textContent = event.subtitle || "";
    if ($("rulesHint")) {
      const rules = resolvedRules(event);
      $("rulesHint").textContent = `${event.currency || sport.currencyFallback}: ${money(rules.budget)} budget · ${money(rules.minWager)}–${money(rules.maxWager)} per pick · minimum total wager ${money(rules.minTotalWager)}.`;
    }
    if ($("publicNote")) $("publicNote").textContent = event.publicNote || "";
    renderEventOptions(event);
    renderOddsBoard(event);
    setHrefWithEvent("scoreboardLink", "scoreboard.html", event);
    setHrefWithEvent("submitLink", "index.html", event);
  }

  function oddsLabel(sources) {
    if (!sources) return "";
    if (window.RISKEM_ODDS?.oddsSourceLabel) return window.RISKEM_ODDS.oddsSourceLabel(sources);
    const parts = [];
    if (sources.fanduel !== null && sources.fanduel !== undefined && sources.fanduel !== "") parts.push(`FanDuel ${fmtOdds(sources.fanduel)}`);
    if (sources.draftkings !== null && sources.draftkings !== undefined && sources.draftkings !== "") parts.push(`DraftKings ${fmtOdds(sources.draftkings)}`);
    if (sources.avg !== null && sources.avg !== undefined && sources.avg !== "") parts.push(`AVG ${fmtOdds(sources.avg)}`);
    return parts.join(" · ");
  }

  function hasOddsBoard(event) {
    return (event.contests || []).some((contest) =>
      (contest.entrants || []).some((entrant) => entrant.oddsSources),
    );
  }

  function renderOddsBoard(event) {
    const panel = $("oddsPanel");
    const board = $("oddsBoard");
    if (!panel || !board) return;

    if (!hasOddsBoard(event)) {
      panel.classList.add("hide");
      board.innerHTML = "";
      return;
    }

    panel.classList.remove("hide");

    const snapshot = event.oddsSnapshot || {};
    if ($("oddsHint")) {
      const pulled = snapshot.pulledAt ? ` · ${snapshot.pulledAt}` : "";
      $("oddsHint").textContent = `${snapshot.sourceLabel || "FanDuel + DraftKings AVG"}${pulled}. AVG is locked for each selected entrant. Players cannot edit locked odds.`;
    }

    board.innerHTML = (event.contests || []).map((contest) => `
      <div class="odds-card">
        <div class="odds-card-title">${h(contest.label)} · ${h((contest.entrants || []).map((e) => e.name).join(" vs "))}</div>
        ${(contest.entrants || []).map((entrant) => `
          <div class="odds-row">
            <strong>${h(entrant.name)}</strong>
            <span>${h(oddsLabel(entrant.oddsSources) || `AVG ${fmtOdds(entrant.odds)}`)}</span>
          </div>
        `).join("")}
      </div>
    `).join("");
  }

  function renderScoreboard(event, sport) {
    const players = allPlayers(event);
    const ranked = rankedPlayers(event, sport);
    const currency = event.currency || sport.currencyFallback || "Bucks";
    const completed = (event.contests || []).filter((c) => event.results?.[c.id]?.complete).length;
    const localCount = loadLocalImports(event).length;

    if ($("localImportNotice")) {
      $("localImportNotice").classList.toggle("hide", localCount === 0);
      $("localImportNotice").textContent = localCount ? `${localCount} local test import${localCount === 1 ? "" : "s"} are being added on this device only. Add them to events/${event.id}.js for the public scoreboard.` : "";
    }

    if ($("standings")) {
      $("standings").innerHTML = ranked.length ? ranked.map((row, i) => `
        <div class="rank-card">
          <div class="rank">${i + 1}</div>
          <div>
            <div class="player-name">${h(row.player.name)}</div>
            <div class="player-sub">Wagered ${money(row.wagered)} · ${sport.contestNoun || "Contest"} net ${profitLabel(row.contestNet)} · Bonus ${profitLabel(row.bonus)} · Props ${profitLabel(row.props)}</div>
          </div>
          <div class="score">${money(row.total)}<span>${h(currency)}</span></div>
        </div>`).join("") : `<div class="fine">No players entered yet.</div>`;
    }
    if ($("updatedText")) $("updatedText").innerHTML = `Status<br>${sport.statusText ? sport.statusText(event) : "Ready"}`;
    if ($("playerCount")) $("playerCount").textContent = players.length;
    if ($("contestCount")) $("contestCount").textContent = `${completed} / ${(event.contests || []).length}`;
    if ($("leaderName")) $("leaderName").textContent = ranked[0]?.player.name || "—";
    if ($("propsStatus")) $("propsStatus").textContent = event.finalProps?.complete ? "Final" : "Open";

    if ($("resultsGrid")) {
      $("resultsGrid").innerHTML = (event.contests || []).map((contest) => {
        const result = event.results?.[contest.id] || {};
        const meta = [contest.weight, contest.scheduled].filter(Boolean).join(" · ");
        return `<div class="match">
          <div class="match-title">${h(contest.label)} ${h((contest.entrants || []).map((e) => e.name).join(" vs "))}</div>
          <div class="match-meta">${h(meta || sport.contestNoun || "Contest")}</div>
          <div class="result">${h(sport.formatResult ? sport.formatResult(result, contest, event) : "Pending")}</div>
          <div class="match-meta">${h(sport.formatWinner ? sport.formatWinner(result, event) : "Winner: —")}</div>
        </div>`;
      }).join("");
    }

    renderLocked(event, sport, players);
    renderDetail(event, sport, players);
    setupImportTools(event, sport);
  }

  function renderLocked(event, sport, players) {
    const reveal = event.revealLockedPicks !== false;
    if (!reveal) {
      const html = `<div class="notice"><strong>Locked until all submissions are in.</strong><br>Entries are saved by the commissioner, but hidden publicly until the deadline.</div>`;
      if ($("lockedTable")) $("lockedTable").innerHTML = "";
      if ($("lockedCards")) $("lockedCards").innerHTML = html;
      return;
    }
    if ($("lockedTable")) {
      $("lockedTable").innerHTML = `
        <thead><tr><th>Player</th>${(event.contests || []).map((c) => `<th>${h(c.label)}</th>`).join("")}<th>Props</th><th>Tiebreaker</th></tr></thead>
        <tbody>${players.map((player) => `
          <tr>
            <td><strong>${h(player.name)}</strong><br><span class="fine">Wagered ${money(totalWagered(player, event))}</span></td>
            ${(event.contests || []).map((contest) => {
              const pick = player.picks?.[contest.id];
              if (!pick) return `<td><span class="fine">No pick</span></td>`;
              return `<td><span class="pill">${h(entrantName(event, pick.selectionId))}</span><br>${h(sport.formatPrediction ? sport.formatPrediction(pick, contest, event) : "")}
                <br><span class="fine">${money(pick.wager)} at ${fmtOdds(lockedOdds(contest, pick))}${pick.oddsSource ? ` · ${h(pick.oddsSource)}` : ""}</span></td>`;
            }).join("")}
            <td>${sport.propSummary ? sport.propSummary(player.props || {}, event) : "—"}</td>
            <td>${h(sport.tiebreaker ? sport.tiebreaker(player, event) : "—")}</td>
          </tr>`).join("")}</tbody>`;
    }
    if ($("lockedCards")) {
      $("lockedCards").innerHTML = players.map((player) => `
        <article class="locked-card">
          <div class="mobile-card-head"><div><div class="mobile-card-name">${h(player.name)}</div><div class="pick-sub">Wagered ${money(totalWagered(player, event))}</div></div><div class="mobile-card-total">${h(sport.tiebreaker ? sport.tiebreaker(player, event) : "—")}<span>Tiebreaker</span></div></div>
          <div class="pick-list">
            ${(event.contests || []).map((contest) => {
              const pick = player.picks?.[contest.id];
              if (!pick) return `<div class="pick-item"><div class="pick-main">No pick</div></div>`;
              return `<div class="pick-item"><div class="pick-item-top"><span>${h(contest.label)}</span><span>${money(pick.wager)} @ ${fmtOdds(lockedOdds(contest, pick))}${pick.oddsSource ? ` · ${h(pick.oddsSource)}` : ""}</span></div><div class="pick-main">${h(entrantName(event, pick.selectionId))}</div><div class="pick-sub">${h(sport.formatPrediction ? sport.formatPrediction(pick, contest, event) : "")}</div></div>`;
            }).join("")}
          </div>
          <div class="props-line"><strong>Props:</strong> ${sport.propSummary ? sport.propSummary(player.props || {}, event) : "—"}</div>
        </article>`).join("");
    }
  }

  function renderDetail(event, sport, players) {
    if ($("detailTable")) {
      $("detailTable").innerHTML = `
        <thead><tr><th>Player</th>${(event.contests || []).map((c) => `<th>${h(c.label)}</th>`).join("")}<th>Bonus</th><th>Props</th><th>Total</th></tr></thead>
        <tbody>${players.map((player) => {
          const bonus = (event.contests || []).reduce((sum, contest) => sum + contestScore(player, contest, event, sport).bonus, 0);
          const props = propsScore(player, event, sport);
          return `<tr><td><strong>${h(player.name)}</strong></td>${(event.contests || []).map((contest) => {
            const score = contestScore(player, contest, event, sport);
            const cls = score.status === "Win" ? "win" : score.status === "Loss" ? "loss" : "pending";
            return `<td><span class="pill ${cls}">${score.status}</span><br>${profitLabel(score.profit)} net<br><span class="fine">Bonus ${profitLabel(score.bonus)}</span></td>`;
          }).join("")}<td>${profitLabel(bonus)}</td><td>${profitLabel(props)}</td><td><strong>${money(totalFor(player, event, sport))}</strong></td></tr>`;
        }).join("")}</tbody>`;
    }
    if ($("detailCards")) {
      $("detailCards").innerHTML = players.map((player) => {
        const bonus = (event.contests || []).reduce((sum, contest) => sum + contestScore(player, contest, event, sport).bonus, 0);
        const props = propsScore(player, event, sport);
        return `<article class="detail-card">
          <div class="mobile-card-head"><div><div class="mobile-card-name">${h(player.name)}</div><div class="pick-sub">Scoring detail</div></div><div class="mobile-card-total">${money(totalFor(player, event, sport))}<span>${h(event.currency || sport.currencyFallback || "Bucks")}</span></div></div>
          <div class="score-list">${(event.contests || []).map((contest) => {
            const score = contestScore(player, contest, event, sport);
            const cls = score.status === "Win" ? "win" : score.status === "Loss" ? "loss" : "pending";
            return `<div class="score-item"><div class="score-item-top"><span>${h(contest.label)}</span><span class="pill ${cls}">${score.status}</span></div><div class="pick-main">${profitLabel(score.profit)} net</div><div class="score-sub">Bonus ${profitLabel(score.bonus)}</div></div>`;
          }).join("")}</div>
          <div class="summary-row"><div class="summary-mini"><small>Bonus</small><strong>${profitLabel(bonus)}</strong></div><div class="summary-mini"><small>Props</small><strong>${profitLabel(props)}</strong></div></div>
        </article>`;
      }).join("");
    }
  }

  function setupImportTools(event, sport) {
    if ($("saveLocalImport")) {
      $("saveLocalImport").onclick = () => {
        const raw = $("localImportInput")?.value || "";
        try {
          const parsed = JSON.parse(raw);
          const incoming = Array.isArray(parsed) ? parsed : [parsed];
          const existing = loadLocalImports(event);
          saveLocalImports(event, [...existing, ...incoming]);
          renderScoreboard(event, sport);
          if ($("localImportInput")) $("localImportInput").value = "";
        } catch (err) {
          alert(`Import failed: ${err.message}`);
        }
      };
    }
    if ($("clearLocalImports")) {
      $("clearLocalImports").onclick = () => {
        try { localStorage.removeItem(localKey(event)); } catch (_) {}
        renderScoreboard(event, sport);
      };
    }
    if ($("copyOfficialPlayers")) {
      $("copyOfficialPlayers").onclick = async () => {
        const text = JSON.stringify(allPlayers(event), null, 2);
        await navigator.clipboard.writeText(text);
        alert("Copied current players JSON.");
      };
    }
  }

  function renderSubmit(event, sport) {
    const form = $("entryForm");
    if (!form) return;
    form.innerHTML = `
      <section class="panel">
        <div class="section-head"><div><h2>Your Entry</h2><div class="hint" id="rulesHint"></div></div></div>
        <div class="form-grid two">
          <label>Player name<input id="playerName" placeholder="Bam Bam" autocomplete="name" /></label>
          <label>Submitted at<input id="submittedAt" readonly /></label>
        </div>
      </section>
      <section class="panel">
        <div class="section-head"><div><h2>${h(sport.contestNounPlural || "Contests")}</h2><div class="hint">Pick winners and wagers only. AVG odds, finish-round validity, and derived props update automatically.</div></div><div class="updated" id="wagerStatus"></div></div>
        <div class="form-grid-stack" id="contestInputs"></div>
      </section>
      <section class="panel">
        <div class="section-head"><div><h2>Props</h2><div class="hint">Props are scored only when final props are marked complete.</div></div></div>
        <div class="form-grid" id="propInputs"></div>
      </section>
      <section class="panel">
        <div class="top-actions"><button id="buildSubmission" type="button">Build Submission</button><button class="secondary" id="copySubmission" type="button">Copy JSON</button><button class="secondary" id="downloadSubmission" type="button">Download JSON</button></div>
        <div class="hint">Commissioner can paste this into the scoreboard local import for testing, or into the event file for public lock.</div>
        <pre class="output-box" id="submissionOutput">Fill the entry and click Build Submission.</pre>
      </section>`;
    $("submittedAt").value = new Date().toISOString();
    renderShell(event, sport);
    renderContestInputs(event, sport);
    renderPropInputs(event, sport);
    updateWagerStatus(event);
    form.addEventListener("input", () => { updateWagerStatus(event); updateDerivedProps(event, sport); });
    form.addEventListener("change", () => { updateWagerStatus(event); updateDerivedProps(event, sport); });
    $("buildSubmission").onclick = () => {
      try { $("submissionOutput").textContent = JSON.stringify(buildSubmission(event, sport), null, 2); }
      catch (err) { alert(err.message); }
    };
    $("copySubmission").onclick = async () => {
      try {
        const payload = JSON.stringify(buildSubmission(event, sport), null, 2);
        $("submissionOutput").textContent = payload;
        await navigator.clipboard.writeText(payload);
      } catch (err) { alert(err.message); }
    };
    $("downloadSubmission").onclick = () => {
      try {
        const payload = JSON.stringify(buildSubmission(event, sport), null, 2);
        const slug = normalizeText($("playerName").value || "submission").replaceAll(" ", "-") || "submission";
        const blob = new Blob([payload], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${event.id}-${slug}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (err) { alert(err.message); }
    };
  }


  function contestDefaultSelection(contest) {
    return contest.defaultSelectionId || contest.entrants?.[0]?.id || "";
  }
  function isDecisionMethod(method) {
    return normalizeText(method) === "decision";
  }
  function isNoContestMethod(method) {
    const normalized = normalizeText(method);
    return normalized === "no contest" || normalized === "draw no contest";
  }
  function isFinishMethod(method) {
    return Boolean(method) && !isDecisionMethod(method) && !isNoContestMethod(method);
  }

  function predictionDefaultValue(contest, selectionId, field) {
    const selectedDefaults = contest.predictionDefaults?.[selectionId] || {};
    const commonDefaults = contest.predictionDefaults?.default || {};

    if (selectedDefaults[field.key] !== undefined) return selectedDefaults[field.key];
    if (commonDefaults[field.key] !== undefined) return commonDefaults[field.key];

    const methodDefault = selectedDefaults.method ?? commonDefaults.method ?? field.defaultValue;
    if (field.key === "round" && isDecisionMethod(methodDefault)) {
      return "";
    }

    return field.defaultValue ?? "";
  }

  function applyPredictionDefaults(sport, contest, selectionId, force = true) {
    for (const field of sport.predictionFields || []) {
      const node = document.querySelector(`[data-prediction="${CSS.escape(field.key)}"][data-contest="${CSS.escape(contest.id)}"]`);
      if (!node) continue;

      const value = predictionDefaultValue(contest, selectionId, field);
      if (force || node.value === "") node.value = value;
    }
  }

  function syncMethodRoundState(contest) {
    const methodNode = document.querySelector(`[data-prediction="method"][data-contest="${CSS.escape(contest.id)}"]`);
    const roundNode = document.querySelector(`[data-prediction="round"][data-contest="${CSS.escape(contest.id)}"]`);
    const roundLabel = document.querySelector(`[data-prediction-label="round"][data-contest="${CSS.escape(contest.id)}"]`);
    if (!methodNode || !roundNode) return;

    if (isDecisionMethod(methodNode.value) || isNoContestMethod(methodNode.value)) {
      roundNode.value = "";
      roundNode.disabled = true;
      roundLabel?.classList.add("hide");
      return;
    }

    roundNode.disabled = false;
    roundLabel?.classList.remove("hide");

    const maxRound = Number(contest.scheduledRounds || roundNode.max || 0);
    const current = Number(roundNode.value || 0);
    if (!current || current < 1) roundNode.value = "1";
    if (maxRound && Number(roundNode.value) > maxRound) roundNode.value = String(maxRound);
  }

  function bindMethodRoundAutomation(sport, contest) {
    const methodNode = document.querySelector(`[data-prediction="method"][data-contest="${CSS.escape(contest.id)}"]`);
    const roundNode = document.querySelector(`[data-prediction="round"][data-contest="${CSS.escape(contest.id)}"]`);
    const pickNode = document.querySelector(`[data-field="selectionId"][data-contest="${CSS.escape(contest.id)}"]`);
    if (!methodNode || !roundNode) return;

    methodNode.addEventListener("change", () => {
      const selectedId = pickNode?.value || contestDefaultSelection(contest);
      const selectedDefaults = contest.predictionDefaults?.[selectedId] || {};

      if (selectedDefaults.method && normalizeText(selectedDefaults.method) === normalizeText(methodNode.value)) {
        roundNode.value = selectedDefaults.round ?? roundNode.value;
      }

      syncMethodRoundState(contest);
    });

    roundNode.addEventListener("change", () => syncMethodRoundState(contest));
    roundNode.addEventListener("input", () => syncMethodRoundState(contest));

    syncMethodRoundState(contest);
  }

  function renderContestInputs(event, sport) {
    const box = $("contestInputs");
    if (!box) return;
    box.innerHTML = (event.contests || []).map((contest) => {
      const rules = resolvedRules(event);
      const defaultSelectionId = contestDefaultSelection(contest);
      const defaultWager = contest.defaultWager ?? rules.minWager ?? 25;
      const entrantOptions = (contest.entrants || []).map((entrant) => {
        const sourceText = oddsLabel(entrant.oddsSources);
        const priceText = sourceText ? ` AVG ${fmtOdds(entrant.odds)}` : (entrant.odds ? ` ${fmtOdds(entrant.odds)}` : "");
        const selected = entrant.id === defaultSelectionId ? "selected" : "";
        return `<option value="${h(entrant.id)}" data-odds="${h(entrant.odds ?? "")}" ${selected}>${h(entrant.name)}${entrant.record ? ` (${h(entrant.record)})` : ""}${priceText}</option>`;
      }).join("");
      return `<div class="contest-form-card" data-contest-id="${h(contest.id)}">
        <div class="contest-title">${h(contest.label)} · ${h((contest.entrants || []).map((e) => e.name).join(" vs "))}</div>
        <div class="match-meta">${h([contest.weight, contest.scheduled].filter(Boolean).join(" · "))}</div>
        <div class="form-grid" style="margin-top:12px">
          <label>${h(sport.pickLabel || "Pick")}<select data-field="selectionId" data-contest="${h(contest.id)}">${entrantOptions}</select></label>
          <label>Wager<input data-field="wager" data-contest="${h(contest.id)}" type="number" min="${h(rules.minWager || 0)}" max="${h(rules.maxWager || 9999)}" step="1" value="${h(defaultWager)}" /></label>
          <label>Locked AVG odds<input data-field="odds" data-contest="${h(contest.id)}" type="text" readonly aria-readonly="true" tabindex="-1" placeholder="auto AVG" /></label>
          ${renderPredictionInputs(event, sport, contest)}
        </div>
      </div>`;
    }).join("");

    (event.contests || []).forEach((contest) => {
      const select = document.querySelector(`[data-field="selectionId"][data-contest="${CSS.escape(contest.id)}"]`);
      const odds = document.querySelector(`[data-field="odds"][data-contest="${CSS.escape(contest.id)}"]`);
      const syncOdds = (force = false) => {
        const opt = select?.selectedOptions?.[0];
        const value = opt?.dataset?.odds || "";
        if (odds && (force || !odds.value)) odds.value = value;
      };

      select?.addEventListener("change", () => {
        syncOdds(true);
        applyPredictionDefaults(sport, contest, select.value, true);
        syncMethodRoundState(contest);
        updateDerivedProps(event, sport);
      });

      syncOdds(false);
      applyPredictionDefaults(sport, contest, select?.value || contestDefaultSelection(contest), false);
      bindMethodRoundAutomation(sport, contest);
      updateDerivedProps(event, sport);
    });
  }

  function renderPredictionInputs(event, sport, contest) {
    const defaultSelectionId = contestDefaultSelection(contest);
    return (sport.predictionFields || []).map((field) => {
      const base = `data-prediction="${h(field.key)}" data-contest="${h(contest.id)}"`;
      const labelBase = `data-prediction-label="${h(field.key)}" data-contest="${h(contest.id)}"`;
      const defaultValue = predictionDefaultValue(contest, defaultSelectionId, field);
      if (field.type === "select") {
        return `<label ${labelBase}>${h(field.label)}<select ${base}>${(field.options || []).map((o) => `<option value="${h(o)}" ${o === defaultValue ? "selected" : ""}>${h(o)}</option>`).join("")}</select></label>`;
      }
      if (field.type === "entrant") {
        return `<label ${labelBase}>${h(field.label)}<select ${base}><option value="">—</option>${(contest.entrants || []).map((e) => `<option value="${h(e.id)}" ${e.id === defaultValue ? "selected" : ""}>${h(e.name)}</option>`).join("")}</select></label>`;
      }
      if (field.key === "round") {
        const maxRound = Number(contest.scheduledRounds || field.max || 3);
        const options = Array.from({ length: Math.max(1, maxRound) }, (_, i) => String(i + 1));
        return `<label ${labelBase}>${h(field.label || "Finish round")}<select ${base}><option value="">—</option>${options.map((o) => `<option value="${h(o)}" ${String(o) === String(defaultValue) ? "selected" : ""}>Round ${h(o)}</option>`).join("")}</select></label>`;
      }
      const dynamicMax = field.key === "round" ? contest.scheduledRounds : field.max;
      return `<label ${labelBase}>${h(field.label)}<input ${base} type="${h(field.type || "text")}" ${field.min !== undefined ? `min="${h(field.min)}"` : ""} ${dynamicMax !== undefined ? `max="${h(dynamicMax)}"` : ""} value="${h(defaultValue)}" /></label>`;
    }).join("");
  }

  function renderPropInputs(event, sport) {
    const box = $("propInputs");
    if (!box) return;
    const propDefaults = event.propDefaults || {};
    box.innerHTML = (sport.propDefinitions || []).map((field) => {
      const base = `data-prop="${h(field.key)}"`;
      const defaultValue = propDefaults[field.key] ?? field.defaultValue ?? "";
      const derived = Boolean(field.derived);
      if (field.type === "contest") {
        return `<label>${h(field.label)}<select ${base} ${derived ? "disabled" : ""}><option value="">—</option>${(event.contests || []).map((c) => `<option value="${h(c.id)}" ${c.id === defaultValue ? "selected" : ""}>${h(c.label)} · ${h((c.entrants || []).map((e) => e.name).join(" vs "))}</option>`).join("")}</select></label>`;
      }
      if (field.type === "select") {
        return `<label>${h(field.label)}<select ${base} ${derived ? "disabled" : ""}>${(field.options || []).map((o) => `<option value="${h(o)}" ${o === defaultValue ? "selected" : ""}>${h(o)}</option>`).join("")}</select></label>`;
      }
      return `<label>${h(field.label)}<input ${base} type="${h(field.type || "text")}" ${field.min !== undefined ? `min="${h(field.min)}"` : ""} value="${h(defaultValue)}" placeholder="${h(field.placeholder || "")}" ${derived ? `readonly aria-readonly="true" tabindex="-1"` : ""} /></label>`;
    }).join("");
    updateDerivedProps(event, sport);
  }

  function updateDerivedProps(event, sport) {
    if (!sport?.derivePropsFromForm) return;
    const derived = sport.derivePropsFromForm(event) || {};
    for (const [key, value] of Object.entries(derived)) {
      const node = document.querySelector(`[data-prop="${CSS.escape(key)}"]`);
      if (!node) continue;
      node.value = value ?? "";
    }
  }

  function updateWagerStatus(event) {
    const total = (event.contests || []).reduce((sum, contest) => {
      const input = document.querySelector(`[data-field="wager"][data-contest="${CSS.escape(contest.id)}"]`);
      return sum + Number(input?.value || 0);
    }, 0);
    const rules = resolvedRules(event);
    const min = Number(rules.minTotalWager || 0);
    const max = Number(rules.maxTotalWager || rules.budget || 0);
    const ok = total >= min && total <= max;
    if ($("wagerStatus")) $("wagerStatus").innerHTML = `Wagered<br>${money(total)} / ${money(max)}`;
    if ($("wagerStatus")) $("wagerStatus").style.color = ok ? "#0f8f62" : "#b42318";
  }

  function buildSubmission(event, sport) {
    updateDerivedProps(event, sport);
    const name = ($("playerName")?.value || "").trim();
    if (!name) throw new Error("Enter player name.");
    const player = { name, submittedAt: new Date().toISOString(), picks: {}, props: {}, derivedProps: {} };
    for (const contest of event.contests || []) {
      const selectionId = document.querySelector(`[data-field="selectionId"][data-contest="${CSS.escape(contest.id)}"]`)?.value;
      const wager = Number(document.querySelector(`[data-field="wager"][data-contest="${CSS.escape(contest.id)}"]`)?.value || 0);
      const oddsRaw = document.querySelector(`[data-field="odds"][data-contest="${CSS.escape(contest.id)}"]`)?.value;
      const selectedEntrant = (contest.entrants || []).find((entrant) => entrant.id === selectionId);
      const odds = selectedEntrant?.odds !== null && selectedEntrant?.odds !== undefined && selectedEntrant?.odds !== ""
        ? Number(selectedEntrant.odds)
        : (oddsRaw === "" ? null : Number(oddsRaw));
      if (!selectionId) throw new Error(`Missing pick for ${contest.label}.`);
      if (!wager) throw new Error(`Missing wager for ${contest.label}.`);
      if (odds === null || !Number.isFinite(odds) || odds === 0) throw new Error(`Missing locked AVG odds for ${contest.label}. Update the event odds snapshot.`);
      const prediction = {};
      for (const field of sport.predictionFields || []) {
        const node = document.querySelector(`[data-prediction="${CSS.escape(field.key)}"][data-contest="${CSS.escape(contest.id)}"]`);
        const raw = node?.disabled ? "" : (node?.value ?? "");
        prediction[field.key] = field.type === "number" ? (raw === "" ? null : Number(raw)) : raw;
      }
      if (sport.validatePrediction) sport.validatePrediction(prediction, contest);
      player.picks[contest.id] = {
        selectionId,
        wager,
        odds,
        oddsSource: selectedEntrant?.oddsSources ? "AVG" : "Manual",
        oddsSnapshotId: event.oddsSnapshot?.id || event.id,
        oddsSnapshotLabel: event.oddsSnapshot?.sourceLabel || "",
        oddsSources: selectedEntrant?.oddsSources || null,
        prediction,
      };
    }
    for (const field of sport.propDefinitions || []) {
      const node = document.querySelector(`[data-prop="${CSS.escape(field.key)}"]`);
      const raw = node?.value ?? "";
      const value = field.type === "number" ? Number(raw || 0) : raw;
      player.props[field.key] = value;
      if (field.derived) player.derivedProps[field.key] = value;
    }
    const total = totalWagered(player, event);
    const rules = resolvedRules(event);
    const min = Number(rules.minTotalWager || 0);
    const max = Number(rules.maxTotalWager || rules.budget || Infinity);
    if (total < min) throw new Error(`Total wager is ${money(total)}. Minimum is ${money(min)}.`);
    if (total > max) throw new Error(`Total wager is ${money(total)}. Maximum is ${money(max)}.`);
    return player;
  }

  window.normalizeText = normalizeText;
  window.entrantName = entrantName;
  window.contestName = contestName;
  window.resolvedRiskemRules = resolvedRules;

  document.addEventListener("DOMContentLoaded", () => {
    const event = getEvent();
    if (!event) {
      document.body.innerHTML = `<div class="wrap"><div class="panel"><h2>Unknown event</h2><div class="hint">No event config was found. Check events/*.js and the event URL parameter.</div></div></div>`;
      return;
    }
    const sport = getSport(event);
    if (!sport) {
      document.body.innerHTML = `<div class="wrap"><div class="panel"><h2>Unknown sport</h2><div class="hint">No sport adapter was found for ${h(event.sport)}.</div></div></div>`;
      return;
    }
    renderShell(event, sport);
    if (document.body.dataset.page === "submit") renderSubmit(event, sport);
    if (document.body.dataset.page === "scoreboard") renderScoreboard(event, sport);
  });
})();
