# Phynexis webpage

Source for the Phynexis documentation site, published at <https://apaam.github.io/webpage/>. Built with [Docusaurus](https://docusaurus.io/), API reference generated with [Doxygen](https://www.doxygen.nl/) and styled with [doxygen-awesome-css](https://github.com/jothepro/doxygen-awesome-css).

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/apaam/webpage)

## Prerequisites

- Node.js >= 18 (recommend the latest LTS)
- `doxygen` (only needed when regenerating the C++ API reference)

## Setup

```bash
# clone with the doxygen-awesome-css submodule
git clone --recurse-submodules https://github.com/apaam/webpage.git
cd webpage

# install Docusaurus deps
make install   # equivalent to: npm install
```

## Common tasks

| Task | Command |
|------|---------|
| Local dev server (hot reload) | `make dev` |
| Production build (`./build/`) | `make build` |
| Preview the production build | `make serve` |
| Regenerate Doxygen HTML in `static/doxygen/` | `make doxygen` |
| Deploy to `gh-pages` branch | `make deploy` |
| Wipe build artifacts | `make clean` |

The dev server hosts the site at <http://localhost:3000/webpage/>.

## Authoring

- Markdown source lives in `docs/`. Sidebars are defined in `sidebars.ts`.
- Static assets (images, video posters, downloadable files) go under `static/`. They are served at the site root, so `static/img/foo.png` is referenced from Markdown as `/img/foo.png`.
- The landing page is React (`src/pages/index.tsx`); update copy or features there.
- Math uses KaTeX via `remark-math` + `rehype-katex`. Use `$inline$` and `$$display$$`.

## Doxygen API reference

`Doxyfile` writes its output to `static/doxygen/` so Docusaurus serves it as a static asset:

```bash
make doxygen           # writes static/doxygen/html/...
```

The navbar entry **API (Doxygen)** links to `/webpage/doxygen/html/index.html`. The `Doxyfile` expects the Phynexis source tree at `../phynexis/src` (see `INPUT` directive).

`static/doxygen/` is `.gitignore`d — regenerate locally before each deploy.

## File / folder naming

Per the project convention, file and folder names use **kebab-case** (e.g. `dem-basics.md`, `doxygen-css/`). Code identifiers stay in **snake_case**.

## Notes

- All external links in Markdown should use `https://`. Tencent Cloud video URLs sometimes default to `http://`; replace them with `https://` to avoid mixed-content blocking.
- The `doxygen-css` git submodule is required for the styled API reference. Run `git submodule update --init` if you forgot `--recurse-submodules` at clone time.
