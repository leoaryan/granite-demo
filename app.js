/* Granite demo — vanilla JS. Renders REAL content.json; no fabricated data. */
let DATA = null;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));

/* ---------- tab routing ---------- */
const SCREENS = ['explore','run','picture','prompt'];
function show(screen){
  $$('.screen').forEach(s=>s.classList.toggle('active', s.id===screen));
  $$('.tab').forEach(t=>t.classList.toggle('active', t.dataset.screen===screen));
  if(screen!=='explore') $('#hero').style.display='none';
  if(screen==='picture') drawDiagram();
  if(history.replaceState) history.replaceState(null,'','#'+screen);
  window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
}
$$('.tab').forEach(t=>t.onclick=()=>show(t.dataset.screen));
$('#startTour').onclick=()=>{ $('#hero').style.display='none'; show('explore'); };
// Deep-link support: opening …/#prompt jumps straight to that tab (shareable).
(function(){ const h=(location.hash||'').replace('#',''); if(SCREENS.includes(h)) show(h); })();

/* ---------- render helpers ---------- */
function mdTable(t){
  const th = t.headers.map(h=>`<th>${esc(h)}</th>`).join('');
  const rows = t.rows.map(r=>'<tr>'+t.headers.map((_,i)=>`<td>${mdInline(r[i]||'')}</td>`).join('')+'</tr>').join('');
  return `<table class="mdtable"><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`;
}
function esc(s){return (s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function mdInline(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/<br>/g,'<br>').replace(/&lt;br&gt;/g,'<br>');}

/* ---------- SCREEN 1: explore ---------- */
function renderCards(){
  const wrap = $('#companyCards'); wrap.innerHTML='';
  DATA.companies.forEach(c=>{
    const s=c.summary;
    const el=document.createElement('div'); el.className='cc';
    el.innerHTML = `${s.has_drivers?'<span class="star">★ Drivers</span>':''}
      <div class="tk">${c.ticker}</div><div class="nm">${c.name}</div>
      <div class="cnt">${s.total}<small> documents</small></div>
      <div class="split">
        <span class="pill free">${s.free} free</span>
        <span class="pill vendor">${s.vendor} vendor</span>
        ${s.proprietary?`<span class="pill prop">${s.proprietary} Granite</span>`:''}
      </div>`;
    el.onclick=()=>openShelf(c);
    wrap.appendChild(el);
  });
  const more=document.createElement('div'); more.className='cc more';
  more.innerHTML=`+ ${DATA.ticker_count-DATA.companies.length} more companies catalogued`;
  wrap.appendChild(more);
}
function openShelf(c){
  $('#shelfPanel').hidden=false;
  const complete=c.funnel.filter(g=>g.complete).length;
  $('#shelfTitle').innerHTML=`${c.name} (${c.ticker}) — the book, by stage
    <span class="cov">${complete}/${c.funnel.length} stages complete · ${c.summary.total} documents on the shelf</span>`;
  const g=$('#shelfGrid'); g.innerHTML='';
  c.funnel.forEach(stage=>{
    const sec=document.createElement('div'); sec.className='fstage '+stage.klass;
    const chips = stage.items.map(it=>{
      if(it.present){
        const k = it.klass==='proprietary'?'prop':it.klass;
        return `<div class="chk have ${k}" title="${esc((it.titles||[]).join(' · '))}">
            <span class="tick">✓</span> ${esc(it.label)}
            ${it.count>1?`<span class="cnt">×${it.count}</span>`:''}</div>`;
      }
      return `<div class="chk miss"><span class="tick">✗</span> ${esc(it.label)}
          <span class="reason">${esc(it.reason)}</span></div>`;
    }).join('');
    sec.innerHTML=`<div class="fstage-head">
        <h4>${esc(stage.name)}</h4>
        <span class="badge ${stage.complete?'ok':'gap'}">${stage.have}/${stage.expect}${stage.complete?' ✓':''}</span>
      </div>
      <p class="fwhy">${esc(stage.why)}</p>
      <div class="chips">${chips}</div>`;
    g.appendChild(sec);
  });
  $('#shelfPanel').scrollIntoView({behavior:reduce?'auto':'smooth'});
}
$('#shelfClose').onclick=()=>$('#shelfPanel').hidden=true;
$('#freeToggle').onchange=e=>{
  document.body.classList.toggle('show-free', e.target.checked);
  $('#reframeLine').textContent = e.target.checked
    ? 'The green rows are pulled FREE from EDGAR — no FactSet needed for the backbone.'
    : 'You assumed every document comes from FactSet. Toggle above — the green ones don’t.';
};

/* ---------- SCREEN 2: run ---------- */
let ran=false;
$('#runBtn').onclick=runAnalysis;
async function runAnalysis(){
  if(ran){['#stageBook','#stagePrompt','#stageOutput','#stageTask8'].forEach(s=>$(s).hidden=true);}
  ran=true; $('#replayTag').hidden=false;
  // Stage 1: funnel
  $('#stageBook').hidden=false; const f=$('#funnel'); f.innerHTML='';
  DATA.funnel_order.forEach(k=>{
    const el=document.createElement('div'); el.className='fdoc';
    el.innerHTML=`<div class="k">${k}</div>${esc(DATA.funnel_labels[k]||k)}`;
    f.appendChild(el);
  });
  for(const el of $$('#funnel .fdoc')){ await sleep(450); el.classList.add('in'); }
  // Stage 2: prompt peek
  await sleep(500); $('#stagePrompt').hidden=false;
  const tl=$('#taskList'); tl.innerHTML='';
  const tasks=['P&L','Guidance','Segments','KPIs','Q&A','Sell-side','Stock reaction'];
  tasks.forEach(t=>{const e=document.createElement('div');e.className='tk-item';e.textContent=t;tl.appendChild(e);});
  const t8=document.createElement('div'); t8.className='tk-item t8';
  t8.innerHTML='★ Task 8 — Drivers loop: runs against our saved debates. No vendor can do this.';
  tl.appendChild(t8);
  // Stage 3: output tables (real, tasks 1-7 content)
  await sleep(700); $('#stageOutput').hidden=false;
  const ot=$('#outputTables'); ot.innerHTML='';
  // first 5 real tables from the full analysis are P&L/guidance/segment/KPI/sell-side
  DATA.analysis_full_tables.slice(0,5).forEach((t,i)=>{
    const titles=['P&L Extraction','Guidance Analysis','Segment Summary','KPI Summary','Sell-side (bull/bear)'];
    const d=document.createElement('div'); d.innerHTML=`<div class="tbl-title">${titles[i]||'Table'}</div>`+mdTable(t);
    ot.appendChild(d);
  });
  // Stage 4: Task 8 wow
  await sleep(700); $('#stageTask8').hidden=false;
  const t8t=$('#task8Tables'); t8t.innerHTML='';
  if(DATA.task8_tables[0]){ // section-1 per-debate table
    t8t.innerHTML=`<div class="tbl-title">Per-debate progress (vs the saved Drivers)</div>`+mdTable(DATA.task8_tables[0]);
  }
  $('#carryLine').textContent='Q1-26: Blowout, traffic-led. 9.7% comp (6.8% traffic) beat Street 6.2%; Revs +4.5% / EBITDA +8.7% vs cons; RLM flat 25.1%. Guide raised but conservative. Honeymoon-fade bear weakened; salmon national, shrimp in test. Margin + ~58x valuation now the bear. Stock +7% AH.';
  $('#stageTask8').scrollIntoView({behavior:reduce?'auto':'smooth'});
}

/* ---------- SCREEN 3: picture ---------- */
const QUAD={
  done:['Document corpus organized by company × quarter (free EDGAR docs + your vendor/internal docs)',
        'Assemble any quarter’s "book" on demand',
        'Your full 8-task framework runs on the book',
        'Task 8 — the Drivers loop — proven on CAVA Q1-2026 against your real Drivers'],
  build:['Live model call (engine assembles the prompt; wiring the API is a small step)',
         'Save output + email it to you automatically',
         'Production database (move off the laptop file to Postgres + cloud storage)'],
  open:['Can we auto-create high-quality Drivers for a brand-new company? (honestly, not yet at your level)',
        'Drivers granularity — per-company vs per-sector vs master',
        'Measuring analysis quality at scale (catching a bad run without reading all of them)',
        'The multi-quarter carry-forward "memory" (designed; not yet automated)'],
  yours:['AlphaSense documents (still owed)',
         'The FactSet API — to fully automate vendor docs (~1 week, via corporate)',
         'Priority & pace, and which companies/sectors matter (drives the scale)']
};
const PATH=[
  ['0 · Finish the spine','Live call + auto-save + email to you','A real "it runs and lands in my inbox" loop'],
  ['1 · Drivers loop in production','Quarter-over-quarter carry-forward','The product — better than a summarizer'],
  ['2 · Production data layer','Postgres + cloud doc storage','Required before any scale'],
  ['3 · Automated runs','Earnings hits → run fires → delivered','Removes the human for the free-doc path'],
  ['4 · Multi-analyst','Logins, each analyst’s own Drivers','One-person tool → desk-wide (internal)'],
  ['5 · Quality & trust','Measure quality, catch bad runs','Trust 200 runs without reading all 200'],
  ['6 · A UI','Request slices, read, edit Drivers','Analysts stop needing us to run it'],
];
function renderPicture(){
  const set=(id,arr)=>$(id).innerHTML=arr.map(x=>`<li>${esc(x)}</li>`).join('');
  set('#qDone',QUAD.done);set('#qBuild',QUAD.build);set('#qOpen',QUAD.open);set('#qYours',QUAD.yours);
  $('#pathTable').innerHTML='<thead><tr><th>Phase</th><th>What it unlocks</th><th>Why it matters</th></tr></thead><tbody>'+
    PATH.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')+'</tbody>';
}

let diagramDrawn=false;
function drawDiagram(){
  if(diagramDrawn) return; diagramDrawn=true;
  const cnt = DATA.companies.map(c=>c.ticker).join(' · ');
  $('#diagram').innerHTML = `
  <div class="diag-legend">
    <span><i style="background:#1E8E3E"></i>Built & free (EDGAR / public)</span>
    <span><i style="background:#E08600"></i>Waiting on FactSet (vendor)</span>
    <span><i style="background:#C8A227"></i>Granite proprietary (the Drivers loop)</span>
    <span><i style="background:#9AA0A6"></i>Next to build</span>
  </div>`+SVG(cnt);
}
function box(x,y,w,h,fill,stroke,label,sub,dash){
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2" ${dash?'stroke-dasharray="6 5"':''}/>
    <text x="${x+w/2}" y="${y+(sub?h/2-4:h/2+5)}" text-anchor="middle" font-size="15" font-weight="700" fill="#1a2330">${label}</text>
    ${sub?`<text x="${x+w/2}" y="${y+h/2+15}" text-anchor="middle" font-size="11" fill="#5F6368">${sub}</text>`:''}</g>`;
}
function arrow(x1,y1,x2,y2,color){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color||'#9AA0A6'}" stroke-width="2.5" marker-end="url(#ah)"/>`;}
function SVG(cnt){
  const G='#1E8E3E',Gb='#E6F4EA',A='#E08600',Ab='#FEF3E0',Gr='#9AA0A6',Grb='#F1F3F4',Go='#C8A227',Gob='#FBF6E3';
  return `<svg viewBox="0 0 1440 660" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#9AA0A6"/></marker></defs>
  <!-- col1 sources -->
  <text x="150" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#1E8E3E">FREE · EDGAR / public</text>
  ${box(40,55,220,52,Gb,G,'Filings 10-K/10-Q/8-K')}
  ${box(40,117,220,52,Gb,G,'Press releases')}
  ${box(40,179,220,52,Gb,G,'Investor slides')}
  <text x="150" y="285" text-anchor="middle" font-size="13" font-weight="700" fill="#E08600">VENDOR · FactSet / AlphaSense</text>
  ${box(40,300,220,46,Ab,A,'Transcripts')}
  ${box(40,352,220,46,Ab,A,'Sell-side research')}
  ${box(40,404,220,46,Ab,A,'AlphaSense DCF',null,true)}
  ${box(40,456,220,46,Gob,Go,'Granite Drivers')}
  <!-- ribbons to catalog -->
  ${arrow(260,205,360,250,G)}${arrow(260,375,360,300,A)}
  <!-- col2 catalog -->
  ${box(360,235,200,90,'#fff','#1F3355','Catalog','organize by company × quarter')}
  ${arrow(560,280,640,280)}
  <!-- col3 assemble -->
  ${box(640,235,190,90,'#fff','#1F3355','Assemble the book','any quarter, on demand')}
  ${arrow(830,280,910,280)}
  <!-- col4 BRAIN -->
  <rect x="900" y="120" width="320" height="320" rx="14" fill="#fbfdff" stroke="#1F3355" stroke-width="2"/>
  <text x="1060" y="148" text-anchor="middle" font-size="14" font-weight="800" fill="#1F3355">THE BRAIN — your framework</text>
  ${box(925,165,270,46,'#eef3fa','#1F3355','Tasks 1–7 · earnings review')}
  ${box(925,225,270,70,Gob,Go,'★ Task 8 — Drivers loop','what happened on each debate?')}
  ${box(925,320,270,46,Gob,Go,'fed by Granite Drivers')}
  ${arrow(925,385,300,490,Go)}
  <text x="1060" y="410" text-anchor="middle" font-size="10.5" fill="#7A4A00">the loop: debates ↔ this quarter</text>
  ${arrow(1220,250,1300,250)}
  <!-- col5 model -->
  ${box(1255,205,150,90,Gb,G,'AI model','Gemini / Claude')}
  <circle cx="1395" cy="218" r="7" fill="#E08600"/>
  <text x="1330" y="312" text-anchor="middle" font-size="10" fill="#7A4A00">engine built · live call is a small step</text>
  ${arrow(1330,295,1330,360)}
  <!-- output -->
  ${box(1230,365,200,52,'#eef3fa','#1F3355','Earnings review')}
  ${box(1230,430,200,46,Grb,Gr,'PDF + email',null,true)}
  <!-- storage band -->
  <rect x="40" y="555" width="1360" height="80" rx="12" fill="#f7f9fc" stroke="#e3e8ef"/>
  ${box(70,575,360,42,Gb,G,'Today: one file on a laptop (SQLite)')}
  <line x1="450" y1="596" x2="560" y2="596" stroke="#9AA0A6" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#ah)"/>
  <text x="505" y="586" text-anchor="middle" font-size="10" fill="#5F6368">a swap, not a rewrite</text>
  ${box(575,575,360,42,Grb,Gr,'Production: Postgres + cloud storage',null,true)}
  <text x="1170" y="600" text-anchor="middle" font-size="12" font-style="italic" fill="#5F6368">Live corpus today: ${cnt} (real shelves)</text>
  </svg>`;
}

/* ---------- boot ---------- */
fetch('content.json').then(r=>r.json()).then(d=>{
  DATA=d; renderCards(); renderPicture();
}).catch(e=>{ $('#companyCards').innerHTML='<p style="color:#c00">content.json not loaded — serve this folder over http (e.g. python -m http.server).</p>'; });
