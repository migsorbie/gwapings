/* ===========================================================
   THE ALMANAC — design tokens
   Palette: ledger paper + hardwood + ink, with a scoreboard-red
   accent reserved for championships only.
   =========================================================== */
:root {
  --paper:       #EFE7D6;
  --paper-card:  #FBF8F0;
  --ink:         #16233A;
  --ink-soft:    #4A5568;
  --hardwood:    #B5652D;
  --hardwood-dk: #8C4A1E;
  --court-green: #2E4A3D;
  --scoreboard:  #A6323A;
  --line:        #D9CBA9;

  --font-display: 'Anton', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--paper);
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px);
  background-size: 100% 2.4em;
  color: var(--ink);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; }

/* ---------------- Header ---------------- */
.site-header {
  background: var(--ink);
  border-bottom: 6px solid var(--hardwood);
  position: sticky;
  top: 0;
  z-index: 20;
}

.header-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 18px 24px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.brand { display: flex; align-items: center; gap: 10px; }

.brand-mark {
  color: var(--hardwood);
  font-size: 1.4rem;
  transform: rotate(90deg);
  display: inline-block;
}

.brand h1 {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.04em;
  font-size: 1.6rem;
  color: var(--paper-card);
  margin: 0 0 10px 0;
}

.brand h1 span { color: var(--hardwood); }

.tab-nav {
  display: flex;
  gap: 2px;
}

.tab-btn {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  background: transparent;
  border: none;
  color: #9AA6BA;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.tab-btn:hover { color: var(--paper-card); }

.tab-btn.active {
  color: var(--paper-card);
  border-bottom-color: var(--hardwood);
}

/* ---------------- Layout ---------------- */
#app {
  max-width: 1080px;
  margin: 0 auto;
  padding: 36px 24px 80px;
}

.view { display: none; }
.view.active { display: block; animation: fade-in 0.25s ease; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.view-heading { margin-bottom: 28px; }

.eyebrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
  color: var(--hardwood-dk);
  font-weight: 700;
}

.view-heading h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 2.4rem;
  margin: 4px 0 6px;
  letter-spacing: 0.01em;
}

.view-heading .sub {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.95rem;
}

.subhead {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  margin: 30px 0 12px;
  color: var(--court-green);
}

/* ---------------- Championship banner rail (signature element) --------- */
.banner-rail {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding: 10px 4px 26px;
  margin-bottom: 8px;
}

.banner {
  --team-color: var(--hardwood);
  flex: 0 0 auto;
  width: 108px;
  background: linear-gradient(180deg, var(--team-color), color-mix(in srgb, var(--team-color) 70%, black));
  clip-path: polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%);
  color: var(--paper-card);
  padding: 14px 10px 26px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.18);
  transition: transform 0.15s ease;
}

.banner:hover { transform: translateY(-4px); }

.banner .banner-year {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  opacity: 0.85;
  letter-spacing: 0.05em;
}

.banner .banner-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  line-height: 1.15;
  margin: 6px 0;
  text-transform: uppercase;
}

.banner .banner-reign {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  opacity: 0.85;
}

/* ---------------- Tables ---------------- */
.table-wrap {
  background: var(--paper-card);
  border: 1px solid var(--line);
  border-radius: 3px;
  overflow-x: auto;
  box-shadow: 0 1px 0 var(--line);
}

.ledger-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.ledger-table thead th {
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--paper-card);
  background: var(--court-green);
  padding: 10px 14px;
  white-space: nowrap;
}

.ledger-table th.num, .ledger-table td.num { text-align: right; }

.ledger-table tbody td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  white-space: nowrap;
}

.ledger-table tbody tr:nth-child(even) { background: rgba(181, 101, 45, 0.05); }
.ledger-table tbody tr:hover { background: rgba(181, 101, 45, 0.12); }

.ledger-table.mono-table td { font-family: var(--font-mono); font-size: 0.85rem; }
.ledger-table.mono-table td:first-child { font-family: var(--font-body); font-weight: 600; }

.champ-name { font-weight: 700; color: var(--scoreboard); }
.champ-name::before { content: "◆ "; }

.row-clickable { cursor: pointer; }

/* ---------------- Team picker ---------------- */
.team-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.team-chip {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background: var(--paper-card);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 9px 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.team-chip:hover { border-color: var(--hardwood); }

.team-chip.active {
  background: var(--ink);
  color: var(--paper-card);
  border-color: var(--ink);
}

.team-chip .dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--court-green);
}

.team-chip.defunct .dot { background: var(--ink-soft); }

.hidden { display: none !important; }

/* ---------------- Team detail ---------------- */
.team-detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.team-detail-header h3 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.6rem;
  margin: 0;
}

.status-pill {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--court-green);
  color: var(--paper-card);
}

.status-pill.defunct { background: var(--ink-soft); }

.roster-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.season-select, .text-input {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  border: 1px solid var(--line);
  background: var(--paper-card);
  color: var(--ink);
  padding: 8px 12px;
  border-radius: 3px;
}

/* ---------------- Player search ---------------- */
.player-search-row { position: relative; margin-bottom: 26px; max-width: 420px; }

.text-input { width: 100%; }

.player-results {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--paper-card);
  border: 1px solid var(--line);
  border-radius: 3px;
  max-height: 260px;
  overflow-y: auto;
  z-index: 10;
  display: none;
}

.player-results.open { display: block; }

.player-result-item {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 0.9rem;
  border-bottom: 1px solid var(--line);
}

.player-result-item:last-child { border-bottom: none; }
.player-result-item:hover { background: rgba(181,101,45,0.12); }

/* ---------------- Matchups ---------------- */
.matchup-picker {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.matchup-picker .vs {
  font-family: var(--font-display);
  color: var(--hardwood);
  font-size: 1.1rem;
}

.empty-state {
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 20px 4px;
}

.winner-cell { font-weight: 700; color: var(--court-green); }

/* ---------------- Error banner ---------------- */
.error-banner {
  background: color-mix(in srgb, var(--scoreboard) 12%, var(--paper-card));
  border: 1px solid var(--scoreboard);
  color: var(--scoreboard);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  padding: 12px 16px;
  border-radius: 3px;
  margin-bottom: 24px;
}

/* ---------------- Footer ---------------- */
.site-footer {
  text-align: center;
  padding: 30px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--ink-soft);
  border-top: 1px solid var(--line);
}

/* ---------------- Responsive ---------------- */
@media (max-width: 640px) {
  .brand h1 { font-size: 1.25rem; }
  .tab-btn { padding: 10px 10px; font-size: 0.7rem; }
  .view-heading h2 { font-size: 1.8rem; }
  .roster-header { flex-direction: column; align-items: flex-start; gap: 8px; }
}

/* ---------------- Accessibility ---------------- */
:focus-visible {
  outline: 2px solid var(--hardwood);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
