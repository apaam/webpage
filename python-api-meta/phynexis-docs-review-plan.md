# Phynexis docs review plan (incremental)

Goal: align every `docs/**/*.md` page with the current site IA (Manual / API / Examples / Gallery / Download / About), Phynexis messaging, and consistent tone—without blocking on the proprietary engine repo.

How to use: work **top to bottom by phase**; tick items in git commits or PRs; adjust priorities if the engine API changes.

---

## Phase 1 — High-friction / visibly inconsistent

**Status: done (initial pass).**

| Page | Issue | Suggested action |
|------|--------|------------------|
| `manual/cfddem-simulation.md` | Formatting and tone differ sharply from the rest of the manual (indented code, informal notes); paths like `examples/` refer to the **engine/OpenFOAM case tree**, not this site’s **Examples** section—easy to confuse. | ~~Restructure~~ **Done:** engine vs site callout, prerequisites, fenced commands, ParaView cross-link, parameter bullets cleaned up. |
| `gallery/snapshots.md` | Placeholder only (“under development”). | ~~Replace with pointer~~ **Done:** links to animations, lab site, About. |
| `manual/basic-usage.md` | Long **Visualization in ParaView** section overlaps [paraview-rendering.md](manual/paraview-rendering.md). | ~~Shorten~~ **Done:** single “Visualization” stub + link. |

---

## Phase 2 — Accuracy & cross-links

**Status: done (initial pass).**

| Page | Issue | Suggested action |
|------|--------|------------------|
| `manual/installation.md` | Wheel/internal index wording is generic; no pointer to **Download** for PDF/assets. | ~~Add link~~ **Done:** pointer to Software & Tools / Download. |
| `manual/user-manual.md` | **Core modules** vs Python submodule names. | ~~Cross-ref~~ **Done:** paragraph + link to Python API overview. |
| `docs/python-api/index.md` | Submodule list vs actual doc tree. | ~~Clarify~~ **Done:** note on utils/fields/deprecated vs shipped package; tracker + PDF. |
| `manual/developer-manual.md` | Internal vs marketing names. | ~~Mapping~~ **Done:** user-facing / Python ↔ internal libs table before module list. |
| `download/index.md` | Tables vs About third-party—keep in sync when either changes. | ~~Sync note~~ **Done:** Cork, TetGen, MPI/OpenMP rows + “edit with About”; About points back to Download. |

---

## Phase 3 — Polish & consistency pass

**Status: done (initial pass).** *(WIP example pages still lack full scripts—API line-by-line audit deferred.)*

| Area | Notes |
|------|--------|
| `manual/paraview-rendering.md`, `manual/blender-rendering.md` | **Done:** ParaView cleanup, `dumper` typo fix, Basic usage link; Blender intro + index naming hint. |
| `manual/docker-hpc.md` | **Done:** prefer distributor images; Makefile target caveat. |
| `manual/computer-tips.md` | **Done:** third-party disclaimer. |
| `manual/dev-pybind-styles.md` | **Done:** submodule list matches API overview. |
| `manual/tips/read-restart.md` | **Done:** `tmp/out/` + cross-link to Basic usage. |
| `manual/dem-wiki.md`, `dem-basics.md` | **Done:** CN-draft callouts; hub link on dem-basics. |
| `manual/discrete-to-continuum.md`, `particle-models.md` | Sidebar/title drafts unchanged. |
| `examples/*.md` | **Done:** `description` + related-guide line; script/API parity still TODO when WIP examples ship code. |
| `gallery/animations.md` | **Done:** Tencent VOD hosting note. |
| `about/index.md` | Phase 2 sync; no change here. |

---

## Phase 4 — Python API autogen pages (`docs/python-api/**`)

**Status: initial pass done** (no bulk regen of binding stubs).

- **Spot-check:** `utils/index`, `fields/index`, `shape`, `console`, `deprecated/README` — navigation/copy only; Deprecated README now points to utils/fields + PDF + manual instead of implying on-site `netdem/` articles.
- **Navigation:** “See also” on `utils/index` / `fields/index` (manual links use `../../manual/`); overview page mentions `scripts/export-python-api-pdf.py` beside the hosted PDF.
- **Ongoing:** After binding changes, re-run the PDF script and refresh exports / `progress.json` via your pipeline.

---

## Global checks (any phase)

- Prefer relative links (`../manual/...`) for portability with `baseUrl`.
- Headers: **Docs** = manual entry; **API → Python** = reference—avoid “documentation home”.
- After substantive edits: `npm run build` (broken links).

---

## Suggested order of execution

1–4. **Done:** Phase 1–2 items above.  
5. **Partial:** `examples/*.md` metadata + links done; **still TODO:** ship scripts for WIP examples + verify imports against current `phynexis`.  
6. **Done:** Phase 3 polish pass.  
7. **Phase 4 (initial):** done—see section above; repeat spot-check when bindings ship.  
8. **Still open:** WIP example scripts + line-by-line API verification; full autogen refresh when the engine changes.
