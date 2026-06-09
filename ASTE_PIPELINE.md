# ASTE — Astec Industries | Q1 2026 (FY26) — INDEPENDENT PIPELINE GENERATION

> **What this is:** the output of running our real pipeline prompt
> (`prompts/earnings.md` + the assembled ASTE book, via `build_brief.py ASTE`) and
> generating the 8 tasks from the prompt **blind** — no Gemini reference exists or was
> used for ASTE. This is the test of whether the *prompt* produces the contract structure
> on a fresh company. Books-only: every financial carries a source tag; `N/F` = should
> exist but not found in the book. DRAFT — not analyst-approved.
>
> **Note on Task 4:** ASTE is **not** in `master_kpi.md`, so there is no predefined KPI
> block — Task 4 falls back to the operating KPIs management actually reported (flagged).
> This is itself a pipeline finding (see the diagnosis doc).

---

## Task 0 — Executive Summary: The View

**The View:** A clean top-line beat masking a sharp profit miss — revenue grew 20% to
$396.3M [SE-PR] but adjusted EPS fell to $0.54 from $0.91 [SE-PR] and badly missed the
$0.88 Street bar [SE-SS Sidoti], driving a price-target cut to $64 from $69 [SE-SS Sidoti].
The growth is **acquired, not organic** (Materials Solutions +70.6% on the acquisitions vs
Infrastructure Solutions +0.4% [SE-PR]); the miss is margin — gross margin fell 310bps as
acquired mix + integration costs diluted the core. Backlog is the bull's anchor: $549.2M,
+36.4% y/y [SE-PR].

**Three things that matter:**
1. **GM compression is the story** — 25.0% vs 28.1%, (310)bps [SE-PR]; the OP walk shows
   revenue +$67M almost fully eaten by COGS +$60M and SG&A +$18M.
2. **The beat is M&A** — Materials Solutions doubled on acquisitions; the legacy
   Infrastructure business was flat [SE-PR]. Quality-of-growth question.
3. **Backlog +36% + a possible highway-bill catalyst** is the forward bull case
   [SE-PR][SE-CT] against a soft-margin present.

**Watch:** whether Q2 margins inflect (CFO guided "stronger margins in Q2 than Q1"
[SE-CT]) and whether infrastructure order releases wait on a surface-transportation
reauthorization [SE-CT].

---

## Task 1 — P&L Summary: Astec Industries | Q1 2026

| Metric | $MMs | PY$ | y/y % | vs Consensus | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Revs** | 396.3 | 329.4 | 20.3% | $396.3 vs ~$385 — beat [SE-SS] | •Acquired-led: Materials Solutions +70.6% on acquisitions; Infrastructure +0.4% organic-flat [SE-PR] |
| **GP$** | 99.1 | 92.4 | 7.3% | — | •**Variance Bridge:** Revs +66.9, COGS <60.2> → GP +6.7 [SE-PR]<br>•Acquired lower-margin mix + integration the drag |
| **GM%** | 25.0% | 28.1% | (304) bps | — | •**Variance Bridge:** acquired-mix dilution + purchase-accounting/integration cost the bps drag [SE-PR][SE-CT] |
| **EPS (adj)** | 0.54 | 0.91 | (40.7%) | $0.54 vs $0.88 — miss [SE-SS Sidoti] | •Margin compression + higher SG&A; GAAP diluted $0.06 vs $0.62 [SE-PR] |
| **G&A** | 90.2 | 71.9 | 25.5% | — | •SG&A +$18.3M, faster than the 20% revenue growth — acquired cost base + integration [SE-PR] |
| **S&M** | in SG&A | — | — | •Not broken out — embedded in reported SG&A [SE-PR] |
| **R&D** | N/F | N/F | — | — | •Engineering expense not separately disclosed in the PR income statement [SE-PR] |
| **OP** | 9.0 | 20.5 | (56.1%) | — | •**Variance Bridge:** Revs +66.9, COGS <60.2>, SG&A <18.3> → OP <11.5> [SE-PR]<br>•Gross-profit gain fully consumed by SG&A growth |
| **OM %** | 2.3% | 6.2% | (395) bps | — | •**Variance Bridge:** the (304)bps GM drag + SG&A de-leverage compounds to (395)bps [SE-PR] |
| **EBITDA (adj)** | 23.6 | 27.5 | (14.2%) | — | •**Variance Bridge:** OP 9.0 + D&A ~14.6 ≈ 23.6 (adj) [SE-PR]<br>•D&A cushions the OP fall vs EBITDA |
| **EM %** | 6.0% | 8.3% | (230) bps | — | •EBITDA margin compresses less than OM% — D&A + add-backs absorb part of the integration cost [SE-PR] |

*Read:* The top line beat but the quarter is a **profit miss** — revenue +20% produced
OP −56% because the +$67M of revenue carried +$60M of cost of sales and +$18M of SG&A
[SE-PR]. The OP walk is the whole story: every dollar of incremental gross profit was
consumed by the acquired cost base. Adjusted EPS $0.54 vs the $0.88 Street bar is a clean
miss [SE-SS Sidoti]; the bull has to underwrite a 2H margin normalization that hasn't
shown up yet.

---

## Task 2 — Guidance Analysis

**Guidance Type:** Reaffirmed five-year framework + qualitative near-term (no hard FY26
EPS range re-set in the PR).

**Macro Posture:** Cautiously constructive — management leaned on backlog (+36.4%) and a
potential highway-bill catalyst as forward support while conceding near-term margin
pressure; the Street read it as a miss and cut targets [SE-SS Sidoti]. *pending [SE-SS]*
for a hard consensus FY bar.

**Common Narrative:**
- *The Why:* the quarter's weakness is integration/mix-driven, not demand — backlog
  grew 36% [SE-PR].
- *Trends:* infrastructure order releases may be waiting on a surface-transportation
  reauthorization; replacement/aftermarket steadier than new equipment [SE-CT].
- *The Noise:* GAAP EPS ($0.06) is distorted by acquisition/restructuring charges; the
  adjusted $0.54 is the cleaner read [SE-PR].

| Metric | Guidance | Consensus | Prior | Management Explanation | Sell-Side Comment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FY26 framework | 5-yr targets reaffirmed | *pending [SE-SS]* | — | Robust five-year targets presented; near-term margin pressure flagged [SE-CT] | Sidoti: 2027 EPS est cut to $3.98 from $4.33 |
| Q2-26 margin | "Stronger than Q1" | — | — | CFO: Q2 margins emerge stronger than Q1; full normalization 2H [SE-CT] | Sidoti: PT to $64 (from $69) on the 1Q miss |
| Backlog | $549.2M, +36.4% | — | $402.6M | Demand intact; releases gated on funding clarity [SE-PR][SE-CT] | Backlog the bull anchor vs soft current margin |

*Read:* The tell is the gap between a +36% backlog and a −56% OP quarter — management is
asking you to look through integration drag to a 2H inflection, but offered no hard FY EPS
guide to anchor it, and the Street responded by cutting 2027 numbers and the PT [SE-SS Sidoti].

---

## Task 3 — Segment Summary

| Segment | Revs | OM/EM Y/Y | Notes | Sell-Side |
| :--- | :--- | :--- | :--- | :--- |
| **Infrastructure Solutions** | 237.0 vs 236.0<br>+0.4% | 14.7%<br>(350) bps | •Organic-flat — the legacy core<br>•Op income $34.8 vs $42.9, <8.1> [SE-PR]<br>•Margin pressure the y/y drag; awaiting highway-bill order releases [SE-CT] | Sidoti: 1Q disappointment centered here |
| **Materials Solutions** | 159.3 vs 93.4<br>+70.6% | 5.6%<br>— bps | •Acquisition-driven doubling<br>•Op income $8.9 vs $5.2 [SE-PR]<br>•Margin flat y/y (5.6%) — structurally lower than Infrastructure, dilutive to mix [SE-PR] | Acquired growth diversifies the mix but dilutes consolidated GM |
| **Corporate & Other** | — | — | •Corporate cost (13.4) vs (12.9) [SE-PR] | — |

*Read:* The segment split explains the consolidated miss exactly: the growth came from
**Materials Solutions (+70.6%, but a structurally lower 5.6% margin)** while the
higher-margin **Infrastructure core was flat and lost 350bps** of operating margin
[SE-PR]. Mix + integration, not demand — and the lower-margin half is the one growing.

---

## Task 4 — KPI Summary  *(no predefined block — fallback to reported operating KPIs)*

> ASTE is not in `master_kpi.md`, so there is no predefined region×product KPI list to
> fill. Per the contract, this falls back to the KPIs management actually reported.
> *(Pipeline finding: add an ASTE block to master_kpi.md to upgrade this task.)*

| Metric | Value | y/y | Read |
| :--- | :--- | :--- | :--- |
| Backlog | $549.2M | +36.4% [SE-PR] | The bull anchor — demand banked, release-gated |
| Infrastructure Solutions rev | $237.0M | +0.4% [SE-PR] | Legacy core flat; the margin-pressure segment |
| Materials Solutions rev | $159.3M | +70.6% [SE-PR] | Acquisition-driven; structurally lower margin |
| Consolidated GM | 25.0% | (310) bps [SE-PR] | The quarter's headline weakness |
| Adj EBITDA | $23.6M | (14.2%) [SE-PR] | Down despite +20% revenue — margin, not demand |

*Read:* The reported KPIs confirm the teardown: demand (backlog +36%) is not the problem;
**margin and mix are** — the growing segment is the lower-margin one and the core is flat.

---

## Task 5 — Earnings Call: Management Discussion & Q&A

### Section 1 — Management Discussion (Prepared Remarks)
- **Revenue & growth:** Q1 net sales $396.3M, +20% y/y, led by the Materials Solutions
  acquisitions [SE-PR][SE-CT].
- **Margin candor:** management flagged near-term gross-margin pressure from acquired mix
  and integration, framing it as transitional [SE-CT].
- **Backlog strength:** backlog $549.2M, +36.4% — positioned as evidence demand is intact
  and the issue is timing/mix, not orders [SE-PR].
- **Catalyst:** a surface-transportation (highway-bill) reauthorization framed as a
  potential unlock for infrastructure order releases [SE-CT].

### Section 2 — Q&A (Analyst Inquiries)

**1. Margin normalization timing** *(David MacGregor, Longbow Research)*
- **Concern:** is there more y/y margin pressure in Q2 before it normalizes in 2H?
- **Response:** CFO Brian Harris — "possible," but Q2 should "emerge with stronger margins
  than we saw in the first" quarter; full normalization weighted to 2H [SE-CT].
- **Takeaway:** management is underwriting a sequential margin recovery — the entire 2H
  thesis rests on this not slipping.

**2. Highway-bill reauthorization as an order catalyst** *(David MacGregor, Longbow Research)*
- **Concern:** how big a catalyst is a highway-bill reauthorization, and are customers
  holding POs until a bill is in place?
- **Response:** management (CEO Jaco) framed reauthorization as a meaningful unlock for
  infrastructure order releases, consistent with a backlog that's banked but release-gated
  [SE-CT].
- **Takeaway:** part of the backlog conversion is policy-dependent — a known catalyst, but
  not in management's control.

**3. Acquisition synergy realization** *(Steve Ferazani, Sidoti & Co.)*
- **Concern:** where integration of the acquisitions stands and the synergy path over the
  next several quarters.
- **Response:** management pointed to an ongoing integration with synergies layering in
  over multiple quarters — consistent with the near-term margin drag being transitional
  [SE-CT].
- **Takeaway:** the margin miss and the synergy story are the same story — the question is
  cadence, and management is asking for patience.

*Read:* The Q&A is entirely about **margin timing and synergy cadence** — the analysts
are pressure-testing the "transitional" framing, and management's defense (Q2 better than
Q1, 2H normalization, policy catalyst) is a set of forward promises, not delivered results.

---

## Task 6 — Sell-Side Summary

**🐂 Bullish**
- Backlog +36.4% to $549.2M — demand banked ahead of release [SE-PR]
- Materials Solutions diversifies the mix and adds scale (+70.6%) [SE-PR]
- Five-year targets reaffirmed; management confident in the framework [SE-CT]
- A highway-bill reauthorization is an identifiable forward order catalyst [SE-CT]
- Healthy balance sheet supports the integration and the growth program [SE-SS]

**🐻 Bearish**
- Clean 1Q miss: adj EPS $0.54 vs $0.88 est [SE-SS Sidoti]
- Gross margin (310)bps; the acquired growth is structurally lower-margin [SE-PR]
- Sidoti cut PT to $64 (from $69) and 2027 EPS to $3.98 (from $4.33) [SE-SS Sidoti]
- Infrastructure core flat (+0.4%) with (350)bps of op-margin erosion [SE-PR]
- The 2H normalization + policy catalyst are promises, not yet delivered [SE-CT]

**🌍 Macro Themes**
- Infrastructure spending cadence gated on a surface-transportation reauthorization [SE-CT]
- Equipment buyers reportedly may defer POs pending funding clarity [SE-CT]

**🔄 Industry / Ecosystem Shifts**
- ASTE diversifying away from pure infrastructure equipment via the Materials Solutions
  acquisitions — broadening the addressable base but diluting consolidated margin [SE-PR][SE-SS]

*Read:* The desk reaction is one-directional this quarter — the miss + PT cut dominate;
the bull case is entirely forward (backlog, 2H margins, highway bill) and unproven.

---

## Task 7 — Stock Reaction Analysis
- **The miss drove it:** adj EPS $0.54 vs $0.88 est is a ~39% miss [SE-SS Sidoti] — the
  proximate cause of the negative reaction.
- **Target cuts confirmed the read:** Sidoti to $64 from $69; 2027 EPS to $3.98 from $4.33
  [SE-SS Sidoti] — the Street marked down the out-year, not just the quarter.
- **Backlog is the offset:** +36.4% backlog is why this is a margin-timing de-rate rather
  than a demand-thesis break [SE-PR].

*Read:* A margin-driven miss into a reaffirmed long-term framework — the stock is being
asked to wait for the 2H inflection while the Street trims the bridge to it.

---

## Task 8 — Drivers Loop  *(Granite addition — AUTO-DRAFT, not in a Gemini 7-task run; needs analyst review)*

> Auto-drafted from the Q&A [SE-CT] + sell-side bull/bear [SE-SS]. Candidate key debates —
> NOT a blessed Granite thesis.

- **Debate 1 — Does Q2 margin actually inflect?** *Verdict: unproven.* CFO promised "stronger
  than Q1" [SE-CT]; the entire 2H thesis depends on it. Watch Q2 GM vs the 25.0% Q1 print.
- **Debate 2 — Is the acquired growth accretive or just dilutive scale?** *Verdict: dilutive
  so far.* Materials Solutions grows 70.6% at a 5.6% margin vs Infrastructure's 14.7% [SE-PR]
  — mix is pulling consolidated GM down. Synergy realization is the swing factor.
- **Debate 3 — How policy-dependent is the backlog conversion?** *Verdict: partly gated.*
  Management tied infrastructure order releases to a highway-bill reauthorization [SE-CT] —
  a catalyst outside its control.

**Triggers:** Q2 gross margin print · highway-bill reauthorization progress · synergy-
realization update.
**New debates:** is the 5-year framework still credible after a 2027 EPS cut? · does the
lower-margin Materials mix become structural?
**Working view (auto-draft):** a margin-timing miss with intact demand — the de-rate is
rational, but the thesis turns entirely on a 2H margin inflection that is promised, not
delivered. *Needs analyst review.*

---

## Sourcing
All financials [SE-PR] = ASTE Q1-2026 FactSet Public Information Book (press release income
statement + segment data). [SE-CT] = earnings-call transcript (prepared remarks + Q&A).
[SE-SS] = sell-side (Sidoti note: $0.54 vs $0.88 est, PT $64 from $69, 2027 EPS $3.98).
0 web figures. `N/F` = R&D/Engineering not separately disclosed in the PR. ASTE absent from
`master_kpi.md` → Task 4 fallback (flagged).
