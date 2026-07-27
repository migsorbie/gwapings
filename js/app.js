const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------------------------------------------------------
// Tab navigation
// ---------------------------------------------------------------------------
const tabButtons = document.querySelectorAll(".tab-btn");
const views = document.querySelectorAll(".view");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    views.forEach((v) => v.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`view-${btn.dataset.view}`).classList.add("active");
  });
});

function fmtPct(p) {
  if (p === null || p === undefined) return "—";
  return (p * 100).toFixed(1) + "%";
}
function fmtNum(n, digits = 1) {
  if (n === null || n === undefined) return "—";
  return Number(n).toFixed(digits);
}
function val(v) { return v === null || v === undefined || v === "" ? "—" : v; }

function reportError(context, error) {
  console.error(context, error);
  const banner = document.getElementById("error-banner");
  if (banner) {
    banner.textContent = `Couldn't load ${context}. Check js/config.js has the right Supabase URL/key, and that supabase/schema.sql has been run. (${error.message || error})`;
    banner.classList.remove("hidden");
  }
}

// ===========================================================================
// LEAGUE HISTORY
// ===========================================================================
async function loadLeagueHistory() {
  const { data, error } = await sb
    .from("v_league_history")
    .select("*")
    .order("season_year", { ascending: false });

  if (error) return reportError("league history", error);

  const bannerRail = document.getElementById("banner-rail");
  bannerRail.innerHTML = data
    .map(
      (row) => `
      <div class="banner">
        <div class="banner-year">${row.season_year}</div>
        <div class="banner-name">${row.champion_name || "—"}</div>
        <div class="banner-reign">${row.reign_number ? `Reign #${row.reign_number}` : ""}</div>
      </div>`
    )
    .join("");

  const tbody = document.getElementById("history-tbody");
  tbody.innerHTML = data
    .map(
      (row) => `
      <tr>
        <td class="num">${row.season_year}</td>
        <td class="champ-name">${row.champion_name || "—"}</td>
        <td class="num">${val(row.reign_number)}</td>
        <td>${val(row.result_text)}</td>
      </tr>`
    )
    .join("");
}

// ===========================================================================
// TEAMS
// ===========================================================================
let allTeams = [];

async function loadTeams() {
  const { data, error } = await sb.from("v_teams").select("*").order("latest_name");
  if (error) return reportError("teams", error);
  allTeams = data;

  const picker = document.getElementById("team-picker");
  picker.innerHTML = allTeams
    .map(
      (t) => `
      <div class="team-chip ${t.status === "defunct" ? "defunct" : ""}" data-team-id="${t.team_id}">
        <span class="dot"></span>${t.latest_name}
      </div>`
    )
    .join("");

  picker.querySelectorAll(".team-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      picker.querySelectorAll(".team-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      openTeam(chip.dataset.teamId);
    });
  });

  populateMatchupSelects();

  if (allTeams.length) {
    picker.querySelector(".team-chip").classList.add("active");
    openTeam(allTeams[0].team_id);
  }
}

async function openTeam(teamId) {
  const [{ data: team, error: teamErr }, { data: seasons, error: seasonsErr }] = await Promise.all([
    sb.from("teams").select("*").eq("team_id", teamId).single(),
    sb.from("v_team_seasons").select("*").eq("team_id", teamId).order("season_year", { ascending: false }),
  ]);
  if (teamErr) return reportError("team detail", teamErr);
  if (seasonsErr) return reportError("team seasons", seasonsErr);

  document.getElementById("team-detail").classList.remove("hidden");
  document.getElementById("team-detail-name").textContent =
    seasons[0] ? seasons[0].season_team_name : `Team #${teamId}`;
  const statusPill = document.getElementById("team-detail-status");
  statusPill.textContent = team.status;
  statusPill.className = "status-pill" + (team.status === "defunct" ? " defunct" : "");

  const tbody = document.getElementById("team-seasons-tbody");
  tbody.innerHTML = seasons
    .map(
      (s) => `
      <tr>
        <td class="num">${s.season_year}</td>
        <td>${s.season_team_name}</td>
        <td class="num">${s.wins}</td>
        <td class="num">${s.losses}</td>
        <td class="num">${fmtPct(s.win_pct)}</td>
        <td class="num">${fmtNum(s.team_fppg, 2)}</td>
        <td class="num">${val(s.season_rank)}</td>
        <td>${val(s.playoff_result)}</td>
        <td>${val(s.gm)}</td>
      </tr>`
    )
    .join("");

  const seasonSelect = document.getElementById("roster-season-select");
  seasonSelect.innerHTML = seasons
    .map((s) => `<option value="${s.season_year}">${s.season_year}</option>`)
    .join("");
  seasonSelect.onchange = () => loadRoster(teamId, seasonSelect.value);

  if (seasons.length) {
    loadRoster(teamId, seasons[0].season_year);
  } else {
    document.getElementById("roster-tbody").innerHTML = "";
  }
}

async function loadRoster(teamId, season) {
  const { data, error } = await sb
    .from("v_team_roster")
    .select("*")
    .eq("team_id", teamId)
    .eq("season_year", season)
    .order("fppg", { ascending: false, nullsFirst: false });

  const tbody = document.getElementById("roster-tbody");
  if (error) return reportError("roster", error);
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="8">No roster on file for ${season}.</td></tr>`;
    return;
  }
  tbody.innerHTML = data
    .map(
      (p) => `
      <tr>
        <td>${p.player_name}</td>
        <td class="num">${val(p.age)}</td>
        <td>${val(p.position)}</td>
        <td>${val(p.nba_team)}</td>
        <td class="num">${val(p.games_played)}</td>
        <td class="num">${fmtNum(p.mpg, 1)}</td>
        <td class="num">${fmtNum(p.fppg, 2)}</td>
        <td class="num">${fmtNum(p.fppm, 3)}</td>
      </tr>`
    )
    .join("");
}

// ===========================================================================
// PLAYERS
// ===========================================================================
const playerSearch = document.getElementById("player-search");
const playerResults = document.getElementById("player-results");
let searchDebounce;

playerSearch.addEventListener("input", () => {
  clearTimeout(searchDebounce);
  const q = playerSearch.value.trim();
  searchDebounce = setTimeout(() => searchPlayers(q), 200);
});

document.addEventListener("click", (e) => {
  if (!playerResults.contains(e.target) && e.target !== playerSearch) {
    playerResults.classList.remove("open");
  }
});

async function searchPlayers(q) {
  let query = sb.from("players").select("player_id, player_name").order("player_name").limit(20);
  if (q) query = query.ilike("player_name", `%${q}%`);
  const { data, error } = await query;
  if (error) return reportError("player search", error);

  if (!data.length) {
    playerResults.classList.remove("open");
    return;
  }
  playerResults.innerHTML = data
    .map((p) => `<div class="player-result-item" data-player-id="${p.player_id}">${p.player_name}</div>`)
    .join("");
  playerResults.classList.add("open");
  playerResults.querySelectorAll(".player-result-item").forEach((item) => {
    item.addEventListener("click", () => {
      playerSearch.value = item.textContent;
      playerResults.classList.remove("open");
      openPlayer(item.dataset.playerId);
    });
  });
}

async function openPlayer(playerId) {
  const { data, error } = await sb
    .from("v_player_seasons")
    .select("*")
    .eq("player_id", playerId)
    .order("season_year", { ascending: false });
  if (error) return reportError("player detail", error);

  document.getElementById("player-detail").classList.remove("hidden");
  document.getElementById("player-detail-name").textContent = data[0] ? data[0].player_name : `Player #${playerId}`;

  const tbody = document.getElementById("player-seasons-tbody");
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="8">No seasons on file.</td></tr>`;
    return;
  }
  tbody.innerHTML = data
    .map(
      (s) => `
      <tr>
        <td class="num">${s.season_year}</td>
        <td>${val(s.fantasy_team_name)}</td>
        <td>${val(s.playoff_result)}</td>
        <td class="num">${fmtNum(s.fppg, 2)}</td>
        <td class="num">${fmtNum(s.fppm, 3)}</td>
        <td class="num">${fmtNum(s.mpg, 1)}</td>
        <td>${val(s.nba_team)}</td>
        <td>${val(s.gm)}</td>
      </tr>`
    )
    .join("");
}

// ===========================================================================
// MATCHUPS
// ===========================================================================
function populateMatchupSelects() {
  const a = document.getElementById("matchup-team-a");
  const b = document.getElementById("matchup-team-b");
  const options = allTeams
    .map((t) => `<option value="${t.team_id}">${t.latest_name}</option>`)
    .join("");
  a.innerHTML = options;
  b.innerHTML = options;
  if (allTeams.length > 1) b.selectedIndex = 1;

  const trigger = () => loadHeadToHead(a.value, b.value);
  a.onchange = trigger;
  b.onchange = trigger;
  trigger();
}

async function loadHeadToHead(teamA, teamB) {
  const tbody = document.getElementById("matchup-tbody");
  const empty = document.getElementById("matchup-empty");
  if (!teamA || !teamB || teamA === teamB) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    empty.textContent = teamA === teamB ? "Pick two different franchises." : "No playoff meetings between these two — yet.";
    return;
  }

  const { data, error } = await sb
    .from("v_matchups")
    .select("*")
    .or(
      `and(team1_id.eq.${teamA},team2_id.eq.${teamB}),and(team1_id.eq.${teamB},team2_id.eq.${teamA})`
    )
    .order("season_year", { ascending: false });
  if (error) return reportError("matchups", error);

  if (!data.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
    empty.textContent = "No playoff meetings between these two — yet.";
    return;
  }
  empty.classList.add("hidden");
  tbody.innerHTML = data
    .map(
      (m) => `
      <tr>
        <td class="num">${m.season_year}</td>
        <td>${m.round_name}</td>
        <td>${val(m.team1_name)} vs ${val(m.team2_name)}</td>
        <td class="winner-cell">${val(m.winner_name)}</td>
        <td>${val(m.result_text)}</td>
      </tr>`
    )
    .join("");
}

// ===========================================================================
// Init
// ===========================================================================
loadLeagueHistory();
loadTeams();
