# Granite — analysis system demo

A clickable walkthrough of an internal investment-analysis system: explore the
document shelf (organized by the earnings funnel, with a coverage checklist),
watch an 8-task earnings review run, and see the architecture + roadmap.

**Demo mode** — all content is real but pre-generated; nothing calls a live model.
Document counts are computed from the live corpus. Built on real public-company
data for CAVA, Avery Dennison, and Goldman Sachs (Q1 2026).

## View locally
```
python3 -m http.server 8099
# open http://localhost:8099
```
(Serve over http — the page fetches content.json; opening index.html as a file won't load data.)

## Published
GitHub Pages → Settings → Pages → deploy from branch `main`, root `/`.
