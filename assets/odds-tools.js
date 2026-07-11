(function () {
  "use strict";

  window.RISKEM_ODDS_SNAPSHOTS = window.RISKEM_ODDS_SNAPSHOTS || {};

  function americanToImplied(odds) {
    const n = Number(odds);
    if (!Number.isFinite(n) || n === 0) return null;
    return n > 0 ? 100 / (n + 100) : Math.abs(n) / (Math.abs(n) + 100);
  }

  function impliedToAmerican(probability) {
    const p = Number(probability);
    if (!Number.isFinite(p) || p <= 0 || p >= 1) return null;
    if (p >= 0.5) return Math.round((-100 * p) / (1 - p));
    return Math.round((100 * (1 - p)) / p);
  }

  function averageAmericanOdds(...values) {
    const prices = values
      .flat()
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value) && value !== 0);

    if (!prices.length) return null;

    const avgProbability =
      prices.reduce((sum, price) => sum + americanToImplied(price), 0) /
      prices.length;

    return impliedToAmerican(avgProbability);
  }

  function fmtOdds(odds) {
    if (odds === null || odds === undefined || odds === "") return "—";
    const n = Number(odds);
    if (!Number.isFinite(n) || n === 0) return "—";
    return n > 0 ? `+${n}` : `${n}`;
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function oddsSourceLabel(sources) {
    const labels = [];
    if (sources?.fanduel !== null && sources?.fanduel !== undefined && sources?.fanduel !== "") labels.push(`FanDuel ${fmtOdds(sources.fanduel)}`);
    if (sources?.draftkings !== null && sources?.draftkings !== undefined && sources?.draftkings !== "") labels.push(`DraftKings ${fmtOdds(sources.draftkings)}`);
    if (sources?.avg !== null && sources?.avg !== undefined && sources?.avg !== "") labels.push(`AVG ${fmtOdds(sources.avg)}`);
    return labels.join(" · ");
  }

  function applyOddsSnapshot(eventId) {
    const event = window.RISKEM_EVENTS?.[eventId];
    const snapshot = window.RISKEM_ODDS_SNAPSHOTS?.[eventId];
    if (!event || !snapshot) return false;

    event.oddsSnapshot = {
      sourceLabel: snapshot.sourceLabel || "FanDuel + DraftKings AVG",
      pulledAt: snapshot.pulledAt || "",
      note: snapshot.note || "",
    };

    for (const contest of event.contests || []) {
      const contestOdds = snapshot.contests?.[contest.id] || {};
      for (const entrant of contest.entrants || []) {
        const row = contestOdds[entrant.id];
        if (!row) continue;

        const avg =
          row.avg !== null && row.avg !== undefined && row.avg !== ""
            ? Number(row.avg)
            : averageAmericanOdds(row.fanduel, row.draftkings);

        entrant.oddsSources = {
          fanduel: row.fanduel ?? null,
          draftkings: row.draftkings ?? null,
          avg,
        };

        if (avg !== null && Number.isFinite(avg)) entrant.odds = avg;
      }
    }

    return true;
  }

  function applyAllOddsSnapshots() {
    for (const eventId of Object.keys(window.RISKEM_ODDS_SNAPSHOTS || {})) {
      applyOddsSnapshot(eventId);
    }
  }

  function bookmakerKey(titleOrKey) {
    const key = normalizeText(titleOrKey).replaceAll(" ", "");
    if (key.includes("fanduel")) return "fanduel";
    if (key.includes("draftkings")) return "draftkings";
    return key;
  }

  function buildSnapshotFromOddsApi(event, oddsApiEvents) {
    const snapshot = {
      sourceLabel: "FanDuel + DraftKings AVG",
      pulledAt: new Date().toISOString(),
      note: "Generated from sportsbook moneyline prices. AVG is computed from average implied probability, then converted back to American odds.",
      contests: {},
    };

    for (const contest of event.contests || []) {
      const entrantNames = (contest.entrants || []).map((e) => normalizeText(e.name));
      const apiEvent = (oddsApiEvents || []).find((candidate) => {
        const names = [candidate.home_team, candidate.away_team].map(normalizeText);
        return entrantNames.every((name) => names.includes(name));
      });

      snapshot.contests[contest.id] = {};

      for (const entrant of contest.entrants || []) {
        const row = { fanduel: null, draftkings: null, avg: null };
        for (const book of apiEvent?.bookmakers || []) {
          const bookKey = bookmakerKey(book.key || book.title);
          if (bookKey !== "fanduel" && bookKey !== "draftkings") continue;

          const h2h = (book.markets || []).find((market) => market.key === "h2h");
          const outcome = (h2h?.outcomes || []).find(
            (out) => normalizeText(out.name) === normalizeText(entrant.name),
          );
          if (outcome?.price !== undefined) row[bookKey] = Number(outcome.price);
        }
        row.avg = averageAmericanOdds(row.fanduel, row.draftkings);
        snapshot.contests[contest.id][entrant.id] = row;
      }
    }

    return snapshot;
  }

  window.RISKEM_ODDS = {
    americanToImplied,
    impliedToAmerican,
    averageAmericanOdds,
    fmtOdds,
    oddsSourceLabel,
    applyOddsSnapshot,
    applyAllOddsSnapshots,
    buildSnapshotFromOddsApi,
  };

  window.RISKEM_APPLY_ODDS_SNAPSHOT = applyOddsSnapshot;
  window.RISKEM_APPLY_ALL_ODDS_SNAPSHOTS = applyAllOddsSnapshots;
})();
