/* Real v3-prompt runs — full reports for the Prompt tab example.
   NOT Pankaj-approved (DRAFT). Numbers recomputed from each company's financial
   schedule; consensus bars are real, from the post-print sell-side notes.
   Markdown-ish: **bold**, <br>, <span class="red">…</span> render as-is. */
window.REPORTS = {
  AVY: {
    name: "Avery Dennison", period: "Q1 2026",
    note: "Tasks 1–7. Task 8 (Drivers loop) omitted by design — AVY has no authored Granite Drivers file yet. Sources: press release, transcript, slides, one Jefferies sell-side note, 10-Q.",
    sections: [
      { t: "Executive Summary — The View", kind: "prose", body:
        "<p>A productivity-driven <b>quality beat</b> in a soft, deflationary quarter: adj EPS <b>$2.47</b> (+7.4%) above the <b>$2.43</b> Street bar, on net sales of $2,298.5M (+7.0% reported but only <b>+1.1% organic</b>). The growth is earnings quality, not volume — Materials productivity plus a ~5¢ March tariff pre-buy carried the print while organic demand stayed sluggish. Materials resilient (EBITDA margin +10bps to 17.8%) vs Solutions weak (−80bps). The debate is no longer “can they grow earnings?” but “what's the organic-demand floor once the pre-buy and FX tailwinds fade?”</p>" +
        "<p class='ex3'><b>The three that matter:</b> (1) +7.0% reported but <b>+1.1% organic</b> — the delta is FX + price; (2) EPS $2.47 vs $2.43 cons on productivity + a one-time pre-buy, not run-rate; (3) the FCF swing to <b>+$104.4M from −$53.1M</b> PY.</p>" +
        "<p class='exwatch'><b>Watch:</b> the ~5¢ pre-buy unwinds in 2Q; Intelligent Labels adoption pace; deflation price cuts vs raw-material inflation that flipped mid-March.</p>" +
        "<p class='ex-read'><b>Read:</b> a quality beat on a soft top line — own the earnings durability, but the organic line is the tell; this is productivity + timing, not a demand inflection.</p>" },

      { t: "Task 1 · P&L Extraction", kind: "table",
        head: ["Metric","$MMs","PY$","y/y %","vs Consensus","Notes"],
        rows: [
          ["<b>Revs</b>","2,299","2,148","7.0%","beat — ex-FX +2.3%","Organic <b>+1.1%</b>; FX + price drove reported; Materials +11.4%, Solutions <span class='red'>(2.8%)</span>"],
          ["<b>GP$</b>","665","622","7.0%","—","GM ~28.9% (flat); productivity offsetting higher employee costs"],
          ["<b>Adj EPS</b>","2.47","2.30","7.4%","<b>$2.47 vs $2.43 — beat</b>","~5¢ from March tariff pre-buy; productivity + favorable price/cost"],
          ["<b>OP</b>","290","275","5.5%","—","Adj op income; productivity + price/cost, offset by mix + employee costs"],
          ["<b>Adj EBITDA</b>","377","352","6.8%","—","Margin 16.4% (flat)"],
          ["<b>Adj FCF</b>","104.4","<span class='red'>(53.1)</span>","n/m","strong swing","Big working-capital improvement vs PY outflow"]
        ],
        read: "a quality beat on a soft top line — +7.0% reported sales but only +1.1% organic; the delta is FX and price. EPS cleared the $2.43 bar on productivity + a one-time pre-buy, not demand; margins broadly flat. The cash-flow swing (+$104M vs −$53M PY) is the underappreciated positive." },

      { t: "Task 2 · Guidance Analysis", kind: "prose", body:
        "<p><b>Macro posture:</b> <span class='red'>Cautious / steady — management held the FY26 frame despite the 1Q beat, explicitly because the ~5¢ pre-buy unwinds in 2Q and a price/cost squeeze hits 2Q. A don't-extrapolate-the-beat signal.</span></p>" +
        "<table class='mdtable ex-table'><thead><tr><th>Metric</th><th>Guidance</th><th>Consensus</th><th>Prior</th><th>Mgmt Explanation</th></tr></thead><tbody>" +
        "<tr><td><b>2Q Adj EPS</b></td><td>$2.43–2.53</td><td>~$2.43</td><td>—</td><td>Sequential improvement; pre-buy unwinds</td></tr>" +
        "<tr><td><b>2Q Reported EPS</b></td><td>$2.21–2.31</td><td>—</td><td>—</td><td>~$0.22 restructuring/other gap</td></tr>" +
        "<tr><td><b>FY26 Adj EPS</b></td><td>$9.90–10.20 (held)</td><td>~$10.05</td><td>$9.90–10.20</td><td>Held despite 1Q beat — 1H noise</td></tr></tbody></table>" +
        "<p class='ex-read'><b>Read:</b> holding the guide after a beat IS the message — management is telling you the 1Q upside is timing (pre-buy + FX), not a run-rate to extrapolate.</p>" },

      { t: "Task 3 · Segment Summary", kind: "table",
        head: ["Segment","Revs","Margin Y/Y","Notes","Sell-Side"],
        rows: [
          ["<b>Materials Group</b>","1,650 vs 1,481 +11.4% rpt (+1.9% organic)","Adj EBITDA 17.8% (+10bps)","MSD volume/mix offset by deflation price cuts; base +MSD, high-value <span class='red'>(LSD)</span>; Graphics/Reflectives <span class='red'>(MSD)</span>","Jefferies: ~5¢ pre-buy benefit in label materials, continues into Apr"],
          ["<b>Solutions Group</b>","649 <span class='red'>(2.8%)</span> rpt <span class='red'>(0.9%)</span> organic","Adj EBITDA 16.4% <span class='red'>(80bps)</span>","<b>Intelligent Labels <span class='red'>(LSD)</span></b>; Embelex/Vestcom +MSD; apparel flat; margin hit by employee costs + investment","Jefferies: IL disappointed on weak logistics + destocking"]
        ],
        read: "the quarter's tension is <b>Materials carrying Solutions.</b> Materials' productivity + pricing held margin up; Solutions' IL softness + investment dragged adj OM down 120bps. Intelligent Labels is the swing factor for the bull case." },

      { t: "Task 4 · KPI Summary", kind: "table",
        head: ["Metric","Value","Y/Y","Notes","Sell-side"],
        rows: [
          ["<b>Organic sales growth</b>","+1.1%","—","The real demand signal (vs +7% reported)","Soft; volume not yet recovered"],
          ["<b>Materials organic</b>","+1.9%","—","MSD volume/mix less deflation pricing","Pre-buy-aided"],
          ["<b>Solutions organic</b>","<span class='red'>(0.9%)</span>","—","IL + base softness","IL destocking"],
          ["<b>Intelligent Labels</b>","<span class='red'>(LSD)</span>","—","Down vs tough pre-tariff PY comp; expected to outpace 2025 for the year","The long-term TAM story (Wiliot)"],
          ["<b>Adj EBITDA margin</b>","16.4%","flat","Productivity vs employee-cost/investment","—"],
          ["<b>Capital returned</b>","$133M","—","$61M buyback (0.3M sh) + dividends; share count −1.9M y/y","Jefferies: leaning into buybacks"],
          ["<b>Net debt / Adj EBITDA</b>","2.4x","—","Balance sheet strong","—"]
        ],
        read: "organic +1.1% is the number that matters — the +7% headline is FX and price. Intelligent Labels down LSD is the one secular-growth line to watch; everything else is steady." },

      { t: "Task 5 · The Call — Management Discussion & Q&A", kind: "qa",
        prepared: [
          "Organic +1%, adj EPS +7%; <i>“strength and resilience of our portfolio… in a dynamic environment”</i> — Materials strong, Solutions soft.",
          "Raw-material inflation shifted mid-March (geopolitical); responding with price + material re-engineering: <i>“high confidence in our ability to protect our profits.”</i>",
          "Wiliot +$75M investment deepens the Intelligent Labels / RFID platform; +75bn-unit condition-monitoring TAM.",
          "2Q guide: organic 0–2%, adj EPS $2.43–2.53 (~3% midpoint); FY26 factors held."
        ],
        qa: [
          ["Intelligent Labels vs expectations","Panjabi","IL is the growth/multiple driver","1Q slightly lower (logistics volume + a customer chip transition); full-year growth still &gt; 2025, 2H-weighted on Walmart food + apparel.","the miss is timing/logistics, not apparel demand — thesis intact but back-half loaded (execution risk)."],
          ["Pricing vs cost cadence","Staphos","is the inflation offset real?","high-single-digit sequential inflation in 2Q, price low-to-mid single; <i>“we don't anticipate any real gap.”</i>","AVY claims the historical ~1-quarter price lag is gone — the key margin-defense variable."],
          ["2Q flat vs 1Q / seasonality","Zekauskas","why no seasonal step-up?","a $0.05 pre-buy → $0.10 Q1→Q2 swing offsets the usual seasonal benefit.","the flat 2Q is a pre-buy artifact, not deterioration."],
          ["Buyback pace","Cacanando","capital-return support","return-based grid; bought more in March on the dip, capacity intact at 2.4x leverage.","disciplined, opportunistic — they leaned in on weakness."]
        ],
        read: "the whole call is a “don't extrapolate the beat” message — the 1Q upside is pre-buy + FX timing; the real tells are the IL back-half ramp and management's claim that the price/cost lag has closed." },

      { t: "Task 6 · Sell-Side Summary", kind: "prose", body:
        "<p class='exwatch'><b>Honesty flag:</b> AVY's filed corpus contains a single sell-side note (Jefferies) — one house's view, not a consensus panel. Full multi-broker sell-side awaits the FactSet/AlphaSense feed.</p>" +
        "<ul class='qa'><li><b>Rating: HOLD.</b> PT framework: base ~$175 (11.0x), bull ~$205, bear ~$150.</li>" +
        "<li><b>Thesis:</b> “2Q Pinch Point, But 2026 Soft Guide Intact.” The 1Q beat is real but pre-buy-aided; 2Q has the unwind + a price/cost squeeze; demand normalizes in 2H.</li>" +
        "<li><b>Bull:</b> productivity playbook delivering EPS in a soft tape; Wiliot/IL TAM (~75bn-unit expansion); buybacks + below-target leverage; WMT partnership.</li>" +
        "<li><b>Bear:</b> organic demand weak (IL/base); pre-buy reverses 2Q; raw-material costs surging HSD% QoQ while price lags; tariff risk; valuation.</li></ul>" +
        "<p class='ex-read'><b>Read:</b> a HOLD that likes the execution but won't pay up until organic demand and Intelligent Labels actually inflect.</p>" },

      { t: "Task 7 · Stock Reaction", kind: "prose", body:
        "<p class='exwatch'><b>Honesty flag:</b> with only one sell-side note and no explicit price data in the corpus, this is inferred from the print + Jefferies' framing, not measured.</p>" +
        "<p>Likely a <b>muted-to-modestly-positive</b> reaction: a clean adjusted-EPS beat (+7.4%) and a strong FCF swing are positives, but (1) the beat is pre-buy-aided and management <i>held</i> the full-year guide, capping the “raise” narrative; (2) organic demand stayed soft and Intelligent Labels was down; (3) the 2Q unwind + price/cost squeeze is a known near-term drag.</p>" +
        "<p class='ex-read'><b>Read:</b> a quality-over-growth quarter that supports the stock but doesn't re-rate it — the kind of print a HOLD-rated name digests rather than jumps on.</p>" },

      { t: "Task 8 · Drivers Loop", kind: "prose", body:
        "<p class='exwatch'><b>Omitted by design.</b> The Drivers loop runs only against a saved Granite thesis, and AVY has no authored Drivers file yet — so v3 <b>skips it and says so</b> rather than fabricating debates. To bring AVY to CAVA's standard, author an AVY Drivers file (key debates: pre-buy / volume recovery? Intelligent Labels inflection? Materials-vs-Solutions margin mix? Wiliot payoff?) and Task 8 becomes available.</p>" }
    ]
  },

  CAVA: {
    name: "CAVA", period: "Q1 2026",
    note: "Full 8-task run. Sources: press release, transcript, slides, 10-Q, a 10-broker sell-side compilation, and CAVA's saved Granite Drivers file (enables Task 8).",
    sections: [
      { t: "Executive Summary — The View", kind: "prose", body:
        "<p>A clean, <b>traffic-led beat</b> across every Street line into a soft, promotional QSR tape: revenue $438.3M (+32.1%) vs $419M cons, adj EBITDA $61.7M (+37.7%) vs $57.3M cons, EPS $0.20 vs $0.17 cons. The 9.7% comp was <b>traffic-led (6.8% of it)</b> and printed ~350bps above the Street's 6.2% — share gain through execution, not price. Management raised the FY26 comp guide (midpoint +150bps to 5.5%) yet barely touched RLM — a deliberately conservative posture. The print de-risks the growth algorithm; at ~58x EBITDA, <b>valuation is now the debate, not growth.</b></p>" +
        "<p class='ex3'><b>The three that matter:</b> (1) <b>9.7% comp, 6.8% traffic</b> vs 6.2% cons — quality (traffic, not price) is the tell; (2) <b>RLM flat at 25.1%</b> despite the comp — deliberate reinvestment, not a miss; (3) the <b>raise reads conservative</b> — 5.5% mid vs a ~10% run-rate, leaving re-raise optionality.</p>" +
        "<p class='exwatch'><b>Watch:</b> ~58x EBITDA prices the bull in; H2 salmon (~100bps) + energy (20–40bps) RLM headwinds; the guide implies an H2 deceleration not yet seen; salmon permanence unresolved.</p>" +
        "<p class='ex-read'><b>Read:</b> a near-flawless quarter — the only “soft” line (flat RLM) is reinvestment by choice; own the durability, but the ~58x multiple is now what the debate turns on.</p>" },

      { t: "Task 1 · P&L Extraction", kind: "table",
        head: ["Metric","$MMs","PY$","y/y %","vs Consensus","Notes"],
        rows: [
          ["<b>Revs</b>","438","332","32%","<b>$438 vs $419 — +4.5% beat</b>","Traffic +6.8%, price/mix +2.9%; 9.7% comp vs 6.2% cons; 20 net new units → 459"],
          ["<b>RLP</b>","109","82.3","32%","in-line","Restaurant-Level Profit +32.3%; COGS beat ~60bps on mix"],
          ["<b>RLM %</b>","25.1%","25.1%","0 bps","25.1% vs 25.0% — in-line, flat","Leverage offset by 3P-mix + 2% wage; JPM 80bps below JPMe"],
          ["<b>EPS</b>","0.20","0.22","<span class='red'>(9%)</span>","<b>$0.20 vs $0.17 — beat</b>","Beat despite y/y drop; tax optic (lower equity-comp benefit); PBT +48%"],
          ["<b>G&amp;A</b>","51.6","41.4","25%","in-line (JPM)","11.8% of rev vs 12.5% <span class='red'>(70) bps</span> leverage; ex-SBC 9.9% vs 10.5%"],
          ["<b>OP</b>","25.3","15.7","61%","—","RLP growth + G&amp;A leverage; pre-opening 6.2 vs 4.5"],
          ["<b>Adj EBITDA</b>","61.7","44.9","38%","<b>$61.7 vs $57.3 — +8.7% beat</b>","RBC: +49bps margin ahead; top-line upside flowed through"],
          ["<b>EM %</b>","14.1%","13.5%","+57 bps","ahead","Flow-through on the comp beat"]
        ],
        read: "clean beat on every line vs Street; the only non-beat is RLM (in-line/flat) — deliberate (3P-mix + wage reinvestment), not a miss. EPS-down y/y is a tax-line optic (PBT +48%), not an earnings problem." },

      { t: "Task 2 · Guidance Analysis (FY2026, raised)", kind: "prose", body:
        "<p><b>Macro posture:</b> Conservative / hedged. SSS midpoint raised +150bps to 5.5% (range 4.5–6.5%) yet Q1 printed 9.7% and Q2-to-date tracks ~9.7% — the guide embeds an H2 deceleration management isn't yet seeing. RLM guide raised only +10bps at the top despite the comp raise.</p>" +
        "<table class='mdtable ex-table'><thead><tr><th>Metric</th><th>Guidance</th><th>Cons</th><th>Prior</th><th>Mgmt Explanation</th></tr></thead><tbody>" +
        "<tr><td><b>Net New Units</b></td><td>75–77</td><td>76</td><td>74–76</td><td>Accelerated pipeline; NRO productivity &gt;100%</td></tr>" +
        "<tr><td><b>SSS %</b></td><td>4.5–6.5%</td><td>5.1%</td><td>3.0–5.0%</td><td>Q1 traffic + menu; H2 moderate MSD</td></tr>" +
        "<tr><td><b>RLM %</b></td><td>23.7–24.3%</td><td>24.0%</td><td>23.7–24.2%</td><td>+10bps top only; salmon/energy/wage offset</td></tr>" +
        "<tr><td><b>Adj EBITDA</b></td><td>$181–191M</td><td>$186–187M</td><td>$176–184M</td><td>+$6M mid on Q1 flow-through</td></tr></tbody></table>" +
        "<p class='ex-read'><b>Read:</b> a sandbag — the raise lags the run-rate by ~450bps; management is banking conservatism and reinvestment, not signaling deceleration.</p>" },

      { t: "Task 3 · Segment / Channel Summary", kind: "table",
        head: ["Segment","Revs","Margin Y/Y","Notes","Sell-Side"],
        rows: [
          ["<b>CAVA (brand)</b>","434 vs 328 +32%","RLM 25.1% flat","459 units (+20.2%); AUV $3.0M (vs $2.3M 1st-yr target); Food 29.1% <span class='red'>(20bps)</span>, Labor 25.7% flat, Occupancy 6.9% <span class='red'>(50bps)</span>","RBC/Blair: RLM 25.1% vs 25.0% cons"],
          ["<b>Digital (channel)</b>","~40% mix","profit-neutral","Mix 39.9% vs ~36% PY; digital rev +1,080bps q/q; KDS investment","Priced dollar-profit-neutral (optic)"]
        ],
        read: "the model is the brand — digital mix rising is optically margin-dilutive but priced profit-neutral; don't read the Other-OpEx tick as pressure." },

      { t: "Task 4 · KPI Summary", kind: "table",
        head: ["Metric","Value","Y/Y","Mgmt Explanation","Sell-side"],
        rows: [
          ["<b>% SSS</b>","9.7%","<span class='red'>(110) bps</span>","Lapped +10.8% PY; traffic-led","RBC: beat Street 6.2% + ~8% whisper"],
          ["<b>% Traffic</b>","6.8%","—","Below-CPI pricing drives visits","JPM: 6.8% vs 6.0%e — the surprise"],
          ["<b>% Price/Mix</b>","2.9%","—","~1.4% Jan price + mix","RBC: only 1.4% price → traffic quality"],
          ["<b>CAVA Units</b>","459","+20%","21 opens, 1 closure; 29 states + DC","RBC: 459 beat cons 455"],
          ["<b>Net New Openings</b>","20","+33%","Midwest entries; &gt;100% productivity","RBC: 20 beat Street 16"],
          ["<b>AUV</b>","$3,027k","+3%","New units &gt;$3M vs $2.3M target","RBC/Blair: best-in-class unit econ"],
          ["<b>Digital Mix</b>","39.9%","+~390 bps","3P + 1P up; KDS investment","Blair: digital rev +1,080bps q/q"]
        ],
        read: "traffic 6.8% is the whole story — visits, not price, drove the 9.7% comp. That's the highest-quality kind of comp and the hardest for peers to copy." },

      { t: "Task 5 · The Call — Management Discussion & Q&A", kind: "qa",
        prepared: [
          "Revs +32% $438M; adj EBITDA +38% $61.7M; SSS 9.7% on 6.8% traffic — <i>“a clear industry leader… meet the moment for the modern consumer.”</i>",
          "20 net new units → 459 (+20.2%); Midwest entries; honeymoon NOT fading — 2024 class still positive at 18 months.",
          "Salmon national launch (first seafood; ~100bps RLM headwind, “penny-profit neutral”); shrimp in Nashville market test.",
          "Zero debt, $403M cash; OCF $64.1M, FCF $15.5M (vs $2.7M PY)."
        ],
        qa: [
          ["Comp sustainability","analyst","is 9.7% repeatable?","Q2-to-date tracking ~Q1 (~9.7%), above the guide; buffer built for tougher comps + macro.","the conservative guide is a sandbag — the run-rate is well ahead of it."],
          ["Honeymoon fade","BofA / Baird","the biggest structural bear on the unit model","2024 class outpacing expectations at 18 months; NRO productivity &gt;100%.","the fade-bear is directly refuted — de-risks the growth algorithm, which matters to the multiple more than the print."],
          ["Margin mechanics / RLM flat","Stifel","will margin ever inflect?","flat by choice — 3P-mix (profit-neutral) + 2% wage + H2 energy absorb the leverage; would not take price.","flat RLM is reinvestment, not pressure — but the bear has migrated from growth to margin."],
          ["Pricing power","Citi","demand risk from price","chose NOT to price (only ~1.4% list); traffic outperformed — the AB1228 precedent.","pricing power is held in reserve, a future lever, not a current crutch."]
        ],
        read: "the call dismantled the honeymoon-fade bear and reframed the debate as margin + valuation — management is deliberately reinvesting the comp upside rather than banking it, and sandbagging the guide." },

      { t: "Task 6 · Sell-Side Summary (10 brokers; stock +~7% AH)", kind: "prose", body:
        "<p><b>Ratings:</b> Piper OW PT→$105 (raised) · JPM OW $90 · Blair/Baird/Roth/RBC constructive · Loop HOLD $85 · Davidson NEUTRAL $84 · Stifel cautious.</p>" +
        "<ul class='qa'><li><b>Five bullish:</b> 9.7% comp beat Street 6.2% + ~8% whisper; NRO productivity &gt;100%, ~2,000-unit TAM; low-income cohort outperforming; EBITDA beat 8.7%; pristine balance sheet.</li>" +
        "<li><b>Five bearish:</b> ~58x FY26 EBITDA (the dominant bear); RLM flat not expanding; guide implies sharp H2 decel; salmon permanence unresolved; EPS down y/y (tax optic).</li>" +
        "<li><b>Macro:</b> QSR soft/promotional — CAVA gaining share without discounting; energy/fuel-surcharge a new H2 input watch.</li></ul>" +
        "<p class='ex-read'><b>Read:</b> the desk is constructive on the algorithm and split on the multiple — the bears are valuation bears, not growth bears.</p>" },

      { t: "Task 7 · Stock Reaction (+~7% after-hours)", kind: "prose", body:
        "<ul class='qa'><li><b>Traffic-led comp crushed the bar</b> (9.7% vs 6.2%, ~350bps) — the prime mover; CAVA the share consolidator.</li>" +
        "<li><b>The honeymoon-fade bear was dismantled</b> — de-risks the growth algorithm, which matters to the multiple more than the print.</li>" +
        "<li><b>Conservative raise</b> (mid 5.5% vs ~10% run-rate) sets an easily-beatable bar → re-raise optionality.</li></ul>" +
        "<p class='exwatch'><b>Offset (why +7%, not euphoric):</b> ~58x EBITDA caps upside; flat RLM + EPS-down optics gave cautious desks cover.</p>" +
        "<p class='ex-read'><b>Read:</b> strong, but priced for greatness — the print confirmed the bull case that was already largely in the stock.</p>" },

      { t: "Task 8 · Drivers Loop (the part that's ours)", kind: "prose", body:
        "<p>Run against CAVA's saved Granite Drivers, with this quarter's evidence cross-read per debate — the product piece.</p>" +
        "<table class='mdtable ex-table'><thead><tr><th>Saved debate</th><th>This quarter</th><th>Verdict</th></tr></thead><tbody>" +
        "<tr><td><b>Honeymoon + tough-comp recur?</b> (bear)</td><td>2024 class positive at 18mo; productivity &gt;100%; AUV $3.0M vs $2.3M target</td><td><b>Resolving Bull (bear weakened)</b></td></tr>" +
        "<tr><td><b>Keep RLM flat again?</b> (bear)</td><td>Effectively yes for FY26 — guide implies flat-ish as salmon/wage/energy absorb leverage</td><td><b>Resolving Bear (flat deliberately)</b></td></tr>" +
        "<tr><td><b>RLM cushion / easy comps</b> (bull)</td><td>RLM held flat not expanded — cushion reinvested, not banked; easy-comp thesis intact</td><td><b>Live — reinvested</b></td></tr>" +
        "<tr><td><b>Shrimp / menu pipeline?</b> (bull)</td><td>Shrimp → market test (Nashville); salmon launched national as tent-pole</td><td><b>Progressing</b></td></tr></tbody></table>" +
        "<p><b>New debates to track:</b> energy/fuel-surcharge H2 drag (20–40bps); digital-mix margin optics (~40%); the Data/AI platform (CAVA Core + Current).</p>" +
        "<p class='ex3'><b>Quarter recap (carry-forward):</b> Q1-26 blowout, traffic-led. 9.7% comp (6.8% traffic) beat 6.2%; RLM flat 25.1% (deliberate). Honeymoon-fade bear weakened; salmon national, shrimp in test. Margin + ~58x valuation now the bear. Stock +7% AH.</p>" +
        "<p class='ex-read'><b>Read:</b> this is what makes it ours — not just “what happened,” but what each saved debate did to the thesis, and the one-line state we carry into next quarter.</p>" }
    ]
  }
};
