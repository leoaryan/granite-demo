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
    html += `<div class="qchip">${esc(b.quarter)}</div>`;
    html += sect('The View', `<p>${chips(cb.the_view)}</p>`);
    html += sect('P&amp;L · ' + esc(b.ticker), pnlTable(cb.pnl));
    html += sect('Guidance', `<p>${chips(cb.guidance)}</p>`);
    html += sect('Sell-side', `<p>${chips(cb.sell_side)}</p>`);
    // room
    const room = b.room;
    const ppl = (room.people || []).map(personCard).join('')
      + (room.not_in_room || []).map(personCard).join('');
    html += sect('Who&#39;s in the room', `<p class="roomnote">${esc(room.note)}</p>${ppl}`);
    // smart questions
    html += sect('Questions to ask', '<ol class="qs">' + b.smart_questions.map(q =>
      `<li><div class="q">${chips(q.q)}</div><div class="qwhy">${chips(q.why)}</div></li>`).join('') + '</ol>');
    // POV
    html += sect('Granite POV <span class="draftpov">DRAFT</span>', `<p class="pov">${chips(b.granite_pov.line)}</p>`);
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

$('#backBtn').onclick = () => { if (history.replaceState) history.replaceState(null, '', location.pathname); showSchedule(); renderSchedule(); };
load();
