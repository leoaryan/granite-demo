/* Granite conference briefing — phone-first, data-driven from conference_data.json.
   Books are the only source for financials; bios are web. No fabricated data. */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let DATA = null, DAY = null;

const esc = s => (s || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
// turn inline [book]/[web] tags into chips
const chips = s => esc(s)
  .replace(/\[book\]/g, '<span class="chip book">book</span>')
  .replace(/\[web\]/g, '<span class="chip web">web</span>')
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

/* ---------- shared classifiers (parse strings already in the data) ---------- */
// beat / miss / raised verdict from a free-text "vs Consensus" or posture cell
function verdict(s) {
  s = (s || '').toLowerCase();
  if (/rais/.test(s)) return { cls: 'beat', mark: '▲', label: 'RAISED' };
  if (/\bbeat|ahead|above/.test(s)) return { cls: 'beat', mark: '▲', label: 'BEAT' };
  if (/miss|below|cut|lower|fell|drag|down/.test(s)) return { cls: 'miss', mark: '▼', label: 'MISS' };
  return { cls: 'inline', mark: '•', label: '' };
}
// question intent tag -> {cls, icon, label}; honors explicit q.tag, else classifies q.why
const QTAGS = {
  one: { cls: 'one', icon: '🎯', label: 'THE ONE' },
  rev: { cls: 'rev', icon: '💰', label: 'REVENUE DRIVER' },
  bear: { cls: 'bear', icon: '🛡️', label: 'PRESSURE-TEST THE BEAR' },
  angle: { cls: 'angle', icon: '⚡', label: 'UNEXPECTED ANGLE' }
};
function qtag(q) {
  if (q.tag && QTAGS[q.tag]) return QTAGS[q.tag];
  const w = (q.why || '').toLowerCase();
  if (/durab|reverse|pull forward|quality of/.test(w)) return QTAGS.one;
  if (/tariff|headwind|risk|bear/.test(w)) return QTAGS.bear;
  if (/margin|mix|region|growth|top.?line/.test(w)) return QTAGS.rev;
  return QTAGS.angle;
}
// driver verdict pill from a free-text verdict string
function vpill(v) {
  const s = (v || '').toLowerCase();
  let cls = 'open', label = 'OPEN';
  if (/^bull|\bbull pillar|bull —/.test(s)) { cls = 'bull'; label = 'BULL'; }
  else if (/^bear|\bbear —|cycle not/.test(s)) { cls = 'bear'; label = 'BEAR'; }
  const lean = /leans bear/.test(s) ? ' ·bear' : /leans bull/.test(s) ? ' ·bull' : '';
  return `<span class="vpill ${cls}">${label}${lean}</span>`;
}

async function load() {
  try {
    DATA = await (await fetch('conference_data.json?cb=' + Date.now())).json();
  } catch (e) { $('#scheduleList').innerHTML = '<p class="empty">Could not load conference data.</p>'; return; }
  $('#confSub').textContent = DATA.dates || 'Wells Fargo Industrials';
  buildDayFilter();
  renderSchedule();
  // deep-link: #AGCO opens that brief
  const h = (location.hash || '').replace('#', '');
  if (h && DATA.meetings.find(m => m.ticker === h)) openBrief(h);
}

function buildDayFilter() {
  const days = [...new Set(DATA.meetings.map(m => m.day))];
  DAY = DAY || days[0];
  $('#dayFilter').innerHTML = days.map(d =>
    `<button class="dchip${d === DAY ? ' active' : ''}" data-day="${d}">${d.slice(0, 3)}</button>`).join('');
  $$('.dchip').forEach(b => b.onclick = () => { DAY = b.dataset.day; buildDayFilter(); renderSchedule(); });
}

function renderSchedule() {
  showSchedule();
  const items = DATA.meetings.filter(m => m.day === DAY);
  $('#scheduleList').innerHTML = items.map(m => {
    const built = !!m.brief;
    const nobook = !m.has_book;
    const execs = (m.execs || []).slice(0, 1).map(e => e.name + ' · ' + e.title).join('');
    return `<button class="mtg${built ? ' built' : ''}" data-tic="${m.ticker}">
      <div class="mtg-time">${m.start}</div>
      <div class="mtg-mid">
        <div class="mtg-co">${esc(m.company)} <span class="tic">${m.ticker}</span></div>
        <div class="mtg-ex">${esc(execs || m.type)}</div>
      </div>
      <div class="mtg-flag">${built ? '<span class="rdy">brief ›</span>' : (nobook ? '<span class="nob">no book</span>' : '<span class="pend">pending</span>')}</div>
    </button>`;
  }).join('') || '<p class="empty">No meetings this day.</p>';
  $$('.mtg').forEach(b => b.onclick = () => openBrief(b.dataset.tic));
}

function showSchedule() {
  $('#scheduleView').hidden = false; $('#briefView').hidden = true; $('#backBtn').hidden = true;
  window.scrollTo(0, 0);
}

function pnlTable(p) {
  if (!p) return '';
  const th = p.headers.map(h => `<th>${esc(h)}</th>`).join('');
  const rows = p.rows.map(r => '<tr>' + r.map((c, i) =>
    `<td${i === 0 ? ' class="m"' : ''}>${chips(c)}</td>`).join('') + '</tr>').join('');
  return `<table class="pnl"><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`
    + (p.read ? `<p class="read"><b>Read:</b> ${chips(p.read)}</p>` : '');
}

function personCard(p) {
  const bio = p.bio
    ? `<div class="bio">${chips(p.bio)}</div>`
    : `<div class="bio pendingbio">${p.bio_status === 'pending_web_research' ? 'Bio — web research pending' : 'IR contact (no deep-dive)'}</div>`;
  const tells = p.tells_from_call ? `<div class="tells"><b>On the call:</b> ${chips(p.tells_from_call)}</div>` : '';
  const promises = (p.last_q_commitments || []).length
    ? `<div class="promises"><b>Committed to last Q:</b><ul>${p.last_q_commitments.map(c => `<li>${chips(c)}</li>`).join('')}</ul></div>` : '';
  return `<div class="person${p.is_primary ? ' primary' : ''}">
    <div class="person-h">${esc(p.name)} <span class="ptitle">${esc(p.title)}</span>${p.in_room ? '<span class="inroom">in room</span>' : ''}${p.is_primary ? '<span class="prim">your meeting</span>' : ''}</div>
    ${bio}${tells}${promises}</div>`;
}

function openBrief(tic) {
  const m = DATA.meetings.find(x => x.ticker === tic);
  if (!m) return;
  const v = $('#briefView');
  const b = m.brief;
  let html = `<div class="bhead">
      <div class="bh-when">${m.day} · ${m.start}–${m.end} · ${esc(m.type)}</div>
      <h1>${esc(m.company)} <span class="tic big">${m.ticker}</span></h1>
      ${b ? `<p class="whatdo">${chips(b.what_they_do)}</p>` : ''}
    </div>`;

  if (!b) {
    html += `<div class="nobookbox">${m.has_book
      ? 'Brief not built yet for this meeting.'
      : 'No FactSet book on disk for this company — financials are <b>N/F (pending)</b>. People deep-dive only once a book is supplied. Ask Pankaj to drop the PDF.'}
      <div class="room">${(m.execs || []).map(e => `<div class="person"><div class="person-h">${esc(e.name)} <span class="ptitle">${esc(e.title)}</span></div></div>`).join('')}</div></div>`;
  } else {
    const td = b.teardown || {};
    const dr = b.drivers_autodraft;

    html += snapshotBlock(b);          // §2 the orienting glance
    html += metricWall(b);             // §3 what printed (hero chips + tables)
    html += roomBlock(b.room);         // §4 who's in the room
    html += questionsBlock(b);         // §5 questions (tagged + listen-for)
    if (dr) html += driversBlock(dr);  // §6 drivers loop (auto-draft)

    /* §7 full teardown — collapsed audit trail */
    let teardownInner = '';
    if (td.task1_pnl) teardownInner += expandable('Task 1 · P&amp;L', tableBlock(td.task1_pnl));
    if (td.task2_guidance) teardownInner += expandable('Task 2 · Guidance', guidanceBlock(td.task2_guidance));
    if (td.task3_segments) teardownInner += expandable('Task 3 · Segments', tableBlock(td.task3_segments));
    if (td.task4_kpis) teardownInner += expandable('Task 4 · KPIs', tableBlock(td.task4_kpis));
    teardownInner += expandable('Task 5 · Call &amp; Q&amp;A', callBlock(b));
    if (td.task6_sellside) teardownInner += expandable('Task 6 · Sell-side', sellsideBlock(td.task6_sellside));
    if (td.task7_stock) teardownInner += expandable('Task 7 · Stock reaction', stockBlock(td.task7_stock));
    html += `<details class="teardown-wrap"><summary>Full teardown — all 8 tasks</summary><div>${teardownInner}</div></details>`;

    html += `<p class="src">${chips(b.sourcing)}</p>`;
  }

  v.innerHTML = html;
  $('#scheduleView').hidden = true; v.hidden = false; $('#backBtn').hidden = false;
  if (history.replaceState) history.replaceState(null, '', '#' + tic);
  window.scrollTo(0, 0);
}

function sect(title, inner) {
  return `<section class="bsect"><h2>${title}</h2>${inner}</section>`;
}

/* collapsible task card (native <details> — works without JS state) */
function expandable(title, inner, open) {
  return `<details class="exp"${open ? ' open' : ''}><summary>${title}</summary><div class="exp-body">${inner}</div></details>`;
}

/* make beat/miss pop inside a table cell */
function cellChips(c) {
  let h = chips(c);
  if (/\bbeat\b/i.test(c)) h = h.replace(/\bbeat\b/i, '<span class="cell-beat">▲ beat</span>');
  else if (/\bmiss\b/i.test(c)) h = h.replace(/\bmiss\b/i, '<span class="cell-miss">▼ miss</span>');
  return h;
}
/* generic table {headers, rows, read, note, title} */
function tableBlock(t) {
  const note = t.note ? `<p class="tnote">${chips(t.note)}</p>` : '';
  const th = t.headers.map(h => `<th>${esc(h)}</th>`).join('');
  const rows = t.rows.map(r => '<tr>' + r.map((c, i) =>
    `<td class="${i === 0 ? 'm' : 'num'}">${i === 0 ? chips(c) : cellChips(c)}</td>`).join('') + '</tr>').join('');
  const read = t.read ? `<p class="read"><b>Read:</b> ${chips(t.read)}</p>` : '';
  return `${note}<table class="pnl tnum">${th ? `<thead><tr>${th}</tr></thead>` : ''}<tbody>${rows}</tbody></table>${read}`;
}

function guidanceBlock(g) {
  let h = `<p class="posture">${chips(g.posture)}</p>`;
  if (g.table) h += tableBlock({ headers: g.table.headers, rows: g.table.rows });
  if (g.read) h += `<p class="read"><b>Read:</b> ${chips(g.read)}</p>`;
  return h;
}
function sellsideBlock(s) {
  const bl = (s.bullish || []).map(x => `<li>${chips(x)}</li>`).join('');
  const be = (s.bearish || []).map(x => `<li>${chips(x)}</li>`).join('');
  return `<div class="bb"><div class="bb-h bull">Bullish</div><ul>${bl}</ul></div>`
    + `<div class="bb"><div class="bb-h bear">Bearish</div><ul>${be}</ul></div>`
    + (s.read ? `<p class="read"><b>Read:</b> ${chips(s.read)}</p>` : '');
}
function stockBlock(s) {
  const d = (s.drivers || []).map(x => `<li>${chips(x)}</li>`).join('');
  return `<ul class="qa">${d}</ul>` + (s.read ? `<p class="read"><b>Read:</b> ${chips(s.read)}</p>` : '');
}
function callBlock(b) {
  // Task 5 lives in the room people's tells + the primary exec; surface prepared + Q&A if present
  const p = b.room.people.find(x => x.is_primary) || {};
  const prep = (p.last_q_commitments || []).map(c => `<li>${chips(c)}</li>`).join('');
  const tells = p.tells_from_call ? `<p class="tells"><b>${esc(p.name)} on the call:</b> ${chips(p.tells_from_call)}</p>` : '';
  return tells + (prep ? `<p class="qatag">Committed to last quarter</p><ul class="qa">${prep}</ul>` : '')
    + `<p class="tnote">Full Q&amp;A themes feed the questions list below.</p>`;
}
function driversBlock(dr) {
  const debates = (dr.debates || []).map(d =>
    `<details class="driver-row"><summary>${vpill(d.verdict)}<span class="d-q">${chips(d.debate)}</span></summary>
      <div class="d-body"><div class="d-this">${chips(d.this_quarter)}</div>
      <div class="d-vfull">${chips(d.verdict)} <span class="dtag">draft</span></div></div></details>`).join('');
  const newd = (dr.new_debates || []).map(x => `<li>${chips(x)}</li>`).join('');
  const trig = (dr.triggers || []).map(x => `<li>${chips(x)}</li>`).join('');
  const extra = (trig || newd)
    ? `<details class="exp"><summary>Triggers &amp; new debates</summary><div class="exp-body">
        ${trig ? `<p class="qatag">Triggers to watch</p><ul class="qa">${trig}</ul>` : ''}
        ${newd ? `<p class="qatag">New debates surfaced</p><ul class="qa">${newd}</ul>` : ''}</div></details>`
    : '';
  return `<section class="bsect drivers">
    <h2>The Drivers loop <span class="loopsub">our thesis, tracked</span></h2>
    <div class="autodraft">⚠ ${chips(dr.status)}</div>
    <div class="debates">${debates}</div>
    ${extra}
    <p class="pov"><b>Working view (auto-draft):</b> ${chips(dr.updated_pov)}</p>
  </section>`;
}

/* ===================== §2 SNAPSHOT ===================== */
function snapshotBlock(b) {
  const td = b.teardown || {}, dr = b.drivers_autodraft, cb = b.company_brief;
  const rows = (td.task1_pnl ? td.task1_pnl.rows : (cb && cb.pnl ? cb.pnl.rows : []));
  const find = re => rows.find(r => re.test(r[0])) || [];
  const eps = find(/adj eps|^eps/i), sales = find(/net sales|revs|revenue/i);
  const guide = td.task2_guidance;
  const cell = (label, row) => {
    if (!row.length) return '';
    const v = verdict(row[4]);
    return `<div class="scorecell ${v.cls}"><div class="sc-l">${label}</div>
      <div class="sc-verdict">${v.mark} ${v.label}</div>
      <div class="sc-val">${esc(row[1])}</div>
      <div class="sc-sub">${esc((row[4] || '').replace(/\[book\]/g, '').replace(/—/, '').trim()).slice(0, 22) || ('y/y ' + row[3])}</div></div>`;
  };
  let guideCell = '';
  if (guide) {
    const g = verdict(guide.posture);
    const gv = (guide.table && guide.table.rows[0]) ? guide.table.rows[0][1] : '';
    guideCell = `<div class="scorecell ${g.cls}"><div class="sc-l">GUIDE</div>
      <div class="sc-verdict">${g.mark} ${g.label || 'HELD'}</div>
      <div class="sc-val">${esc(gv)}</div><div class="sc-sub">FY26 adj EPS</div></div>`;
  }
  const read = (td.task1_pnl && td.task1_pnl.read) || (cb && cb.the_view) || '';
  // the one number — first kpi_scorecard entry flagged as the engine, else first
  const sc = (dr && dr.kpi_scorecard) || [];
  const hero = sc.find(r => /engine|the drag|\+\$/.test(r[2] || r[1])) || sc[0] || [];
  const primary = (b.room.people || []).find(p => p.is_primary);
  const press = dr && dr.debates && dr.debates[0] ? dr.debates[0].debate : '';
  return `<div class="snapshot">
    <div class="snap-q">${esc(b.quarter)}</div>
    <div class="scorestrip">${cell('EPS', eps)}${cell('SALES', sales)}${guideCell}</div>
    <div class="snap-read"><span class="snap-flag">THE READ</span> ${chips(read)}</div>
    ${hero.length ? `<div class="snap-hero"><div class="sh-l">THE ONE NUMBER</div>
      <div class="sh-v">${chips(hero[0])} <b>${chips(hero[1])}</b></div>
      <div class="sh-s">${chips(hero[2] || '')}</div></div>` : ''}
    ${primary ? `<div class="snap-who">🎙 In the room: <b>${esc(primary.name)}, ${esc(primary.title)}</b>
      ${press ? `<div class="snap-press">Press him on: ${chips(press)}</div>` : ''}</div>` : ''}
  </div>`;
}

/* ===================== §3 METRIC WALL ===================== */
function metricWall(b) {
  const td = b.teardown || {}, dr = b.drivers_autodraft;
  const sc = (dr && dr.kpi_scorecard) || [];
  const metrics = sc.slice(0, 4).map(r => {
    const v = verdict((r[1] + ' ' + (r[2] || '')));
    const dir = /\+|beat|ahead|engine/i.test(r[1] + (r[2] || '')) ? 'up'
      : /\(|down|drag|−|-\$|fell/i.test(r[1] + (r[2] || '')) ? 'down' : '';
    return `<div class="metric ${dir}"><div class="mt-l">${esc(r[0])}</div>
      <div class="mt-v">${chips(r[1])} ${dir === 'up' ? '▲' : dir === 'down' ? '▼' : ''}</div>
      <div class="mt-s">${chips(r[2] || '')}</div></div>`;
  }).join('');
  let tables = '';
  if (td.task1_pnl) tables += expandable('Full P&amp;L · 6 lines', tableBlock(td.task1_pnl));
  if (td.task2_guidance) tables += expandable('Guidance', guidanceBlock(td.task2_guidance));
  if (td.task3_segments) tables += expandable('Segments', tableBlock(td.task3_segments));
  if (td.task4_kpis) tables += expandable('KPIs', tableBlock(td.task4_kpis));
  return `<section class="bsect"><h2>What printed</h2>
    <div class="metricwall">${metrics}</div>${tables}</section>`;
}

/* ===================== §4 WHO'S IN THE ROOM ===================== */
function roomBlock(room) {
  const people = room.people || [];
  const primary = people.find(p => p.is_primary);
  const others = people.filter(p => !p.is_primary);
  let h = `<section class="bsect"><h2>Who&#39;s in the room</h2>`;
  h += `<p class="roomnote">${esc(room.note)}</p>`;
  if (primary) {
    const dodge = primary.dodged_last_call
      ? `<div class="dodge"><span class="dd-l">✋ DODGED LAST CALL</span> ${chips(primary.dodged_last_call)}</div>` : '';
    const tell = primary.tells_from_call
      ? `<div class="tell"><span class="tl-l">🎯 HIS TELL</span> ${chips(primary.tells_from_call)}</div>` : '';
    const promises = (primary.last_q_commitments || []).length
      ? `<div class="commit"><span class="cm-l">✋ HE COMMITTED LAST Q</span><ul>${primary.last_q_commitments.map(c => `<li>${chips(c)}</li>`).join('')}</ul></div>` : '';
    h += `<div class="target">
      <div class="tg-h">${esc(primary.name)}<span class="tg-prim">your meeting</span></div>
      <div class="tg-title">${esc(primary.title)}</div>
      ${primary.bio ? `<div class="tg-bio">${chips(primary.bio)}</div>` : ''}
      ${tell}${dodge}${promises}</div>`;
  }
  if (others.length) {
    h += `<div class="roster"><span class="ro-l">Also in room</span> ` +
      others.map(p => `${esc(p.name)} · ${esc(p.title)}`).join('  ·  ') + `</div>`;
  }
  (room.not_in_room || []).forEach(p => {
    h += `<details class="exp"><summary>Not in room: ${esc(p.name)} · ${esc(p.title)}</summary>
      <div class="exp-body">${p.bio ? chips(p.bio) : esc(p.why_relevant || '')}</div></details>`;
  });
  return h + `</section>`;
}

/* ===================== §5 QUESTIONS ===================== */
function questionsBlock(b) {
  const cards = (b.smart_questions || []).map((q, i) => {
    const t = qtag(q);
    const listen = q.listen_for
      ? `<div class="qlisten"><span class="ql-l">👂 LISTEN FOR</span> ${esc(q.listen_for)}</div>`
      : `<div class="qwhy"><b>Why ask:</b> ${chips(q.why)}</div>`;
    return `<div class="qcard">
      <div class="qtag ${t.cls}">${t.icon} ${t.label}<span class="qn">${i + 1}/${b.smart_questions.length}</span></div>
      <div class="q">${chips(q.q)}</div>${listen}</div>`;
  }).join('');
  return `<section class="bsect"><h2>Questions to ask <span class="loopsub">tagged by intent</span></h2>${cards}</section>`;
}

$('#backBtn').onclick = () => { if (history.replaceState) history.replaceState(null, '', location.pathname); showSchedule(); renderSchedule(); };
load();
