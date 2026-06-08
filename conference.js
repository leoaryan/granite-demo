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
    const cb = b.company_brief;
    const td = b.teardown || {};
    const dr = b.drivers_autodraft;
    html += `<div class="qchip">${esc(b.quarter)}</div>`;

    /* ---- TL;DR (always open — the 1-screen quick read) ---- */
    const beat = (td.task1_pnl ? td.task1_pnl.rows : cb.pnl.rows)
      .find(r => /EPS/.test(r[0])) || [];
    const beatLine = beat.length ? `<div class="tldr-beat">${chips(beat[0] + ': ' + beat[1] + ' · ' + beat[4])}</div>` : '';
    const q3 = b.smart_questions.slice(0, 3).map(q => `<li>${chips(q.q)}</li>`).join('');
    const thesis = dr ? dr.updated_pov : (b.granite_pov ? b.granite_pov.line : '');
    html += `<div class="tldr">
        <div class="tldr-h">TL;DR</div>
        <p class="tldr-view">${chips(cb.the_view)}</p>
        ${beatLine}
        <div class="tldr-thesis"><b>Thesis (auto-draft):</b> ${chips(thesis)}</div>
        <div class="tldr-q"><b>Ask in the room:</b><ol>${q3}</ol></div>
      </div>`;

    /* ---- Who's in the room (open — he needs this before the meeting) ---- */
    const room = b.room;
    const ppl = (room.people || []).map(personCard).join('')
      + (room.not_in_room || []).map(personCard).join('');
    html += sect('Who&#39;s in the room', `<p class="roomnote">${esc(room.note)}</p>${ppl}`);

    /* ---- Full 8-task teardown — expandable cards ---- */
    html += `<div class="tdhead">Full teardown <span class="tdsub">tap to expand</span></div>`;
    if (td.task1_pnl) html += expandable('Task 1 · P&amp;L', pnlTable2(td.task1_pnl));
    if (td.task2_guidance) html += expandable('Task 2 · Guidance', guidanceBlock(td.task2_guidance));
    if (td.task3_segments) html += expandable('Task 3 · Segments', tableBlock(td.task3_segments));
    if (td.task4_kpis) html += expandable('Task 4 · KPIs', tableBlock(td.task4_kpis));
    html += expandable('Task 5 · Call &amp; Q&amp;A', callBlock(b));
    if (td.task6_sellside) html += expandable('Task 6 · Sell-side', sellsideBlock(td.task6_sellside));
    if (td.task7_stock) html += expandable('Task 7 · Stock reaction', stockBlock(td.task7_stock));

    /* ---- Task 8 · Drivers (AUTO-DRAFT) — open, loud banner ---- */
    if (dr) html += driversBlock(dr);

    /* ---- Full question list + sourcing ---- */
    html += expandable('All questions to ask', '<ol class="qs">' + b.smart_questions.map(q =>
      `<li><div class="q">${chips(q.q)}</div><div class="qwhy">${chips(q.why)}</div></li>`).join('') + '</ol>');
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

/* generic table {headers, rows, read, note, title} */
function tableBlock(t) {
  const note = t.note ? `<p class="tnote">${chips(t.note)}</p>` : '';
  const th = t.headers.map(h => `<th>${esc(h)}</th>`).join('');
  const rows = t.rows.map(r => '<tr>' + r.map((c, i) =>
    `<td${i === 0 ? ' class="m"' : ''}>${chips(c)}</td>`).join('') + '</tr>').join('');
  const read = t.read ? `<p class="read"><b>Read:</b> ${chips(t.read)}</p>` : '';
  return `${note}<table class="pnl">${th ? `<thead><tr>${th}</tr></thead>` : ''}<tbody>${rows}</tbody></table>${read}`;
}
function pnlTable2(t) { return tableBlock(t); }

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
    `<div class="debate"><div class="d-q">${chips(d.debate)} <span class="dtag">draft</span></div>
      <div class="d-this">${chips(d.this_quarter)}</div>
      <div class="d-v">${chips(d.verdict)}</div></div>`).join('');
  const newd = (dr.new_debates || []).map(x => `<li>${chips(x)}</li>`).join('');
  const trig = (dr.triggers || []).map(x => `<li>${chips(x)}</li>`).join('');
  return `<section class="bsect drivers">
    <h2>Task 8 · Drivers loop</h2>
    <div class="autodraft">⚠ ${chips(dr.status)}</div>
    <div class="debates">${debates}</div>
    ${trig ? `<p class="qatag">Triggers to watch</p><ul class="qa">${trig}</ul>` : ''}
    ${newd ? `<p class="qatag">New debates surfaced</p><ul class="qa">${newd}</ul>` : ''}
    <p class="pov"><b>Working view (auto-draft):</b> ${chips(dr.updated_pov)}</p>
  </section>`;
}

$('#backBtn').onclick = () => { if (history.replaceState) history.replaceState(null, '', location.pathname); showSchedule(); renderSchedule(); };
load();
