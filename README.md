# Phynexis webpage

Source for the **Phynexis documentation site**, published at <https://apaam.github.io/webpage/>. Built with [Docusaurus](https://docusaurus.io/). The C++ API reference is generated with [Doxygen](https://www.doxygen.nl/) and styled with [doxygen-awesome-css](https://github.com/jothepro/doxygen-awesome-css).

**Site language:** Most guides, examples, API reference pages, and the landing copy are **English**. Two theory-topic pages (`manual/discrete-to-continuum.md`, `manual/particle-models.md`) are **Chinese drafts**; the sidebar shows English labels marking them as drafts. The Docusaurus UI is English (`en`) only.

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/apaam/webpage)

---

## License and what is public (read this first)

- **The Phynexis simulation core and full product source code are not released as open-source software.** Distribution is typically under a research license (or similar) to academic and industrial collaborators. For binaries, source access, or licensing, use [About](https://apaam.github.io/webpage/docs/about/) on the site.
- **What we primarily expose for external use is the Python interface:** this site publishes user guides, examples, and **Python API** reference (in-docs pages plus a downloadable API PDF). If you use Phynexis through the Python library, treat this site and the documentation shipped with your distribution as authoritative.
- **This repository contains only the documentation website and related static-generation tooling**, not the Phynexis engine sources. Contributions that improve docs or the site are welcome; that **does not** mean the Phynexis core is open source.

If you only want to **use Phynexis (Python)**, open **[Manual home](https://apaam.github.io/webpage/docs/manual/)** (header **Docs**), then [Installation](https://apaam.github.io/webpage/docs/manual/installation/), and [Software & Tools](https://apaam.github.io/webpage/docs/download/) for the API PDF and other assets.

---

## For users

| Goal | Where to go |
|------|-------------|
| Install, get started, examples | [Manual home](https://apaam.github.io/webpage/docs/manual/) (**Docs**), [Installation](https://apaam.github.io/webpage/docs/manual/installation/), [Examples](https://apaam.github.io/webpage/docs/examples/) |
| Distribution overview, PDFs, software tables | [Software & Tools](https://apaam.github.io/webpage/docs/download/) |
| Contact, collaboration, licensing | [About](https://apaam.github.io/webpage/docs/about/) (also linked from Download where relevant) |
| Python API lookup | **API → Python** on the site, plus **phynexis-python-api.pdf** on the download page |

New or updated material under `docs/` should stay in **English** so it matches the live site. The sections below describe how to build and maintain the site.

---

## For developers / doc maintainers

### Prerequisites

- Node.js ≥ 18 (latest LTS recommended)
- `doxygen` (only when regenerating the C++ API static pages)

### Setup

```bash
git clone --recurse-submodules https://github.com/apaam/webpage.git
cd webpage
make install   # same as npm install
```

If you cloned without submodules, run `git submodule update --init` (required for the `doxygen-awesome-css` theme).

### GitHub access via local proxy (FastGithub)

If GitHub is unreachable or Git fails (`git clone` / `pull` / `push` timeouts, **HTTP/2 framing** errors, etc.), run a local accelerator such as **[FastGithub](https://github.com/dotnetcore/fastgithub)** and route Git through its HTTP proxy.

1. **Start FastGithub** on your machine. The default HTTP proxy is **`http://127.0.0.1:38457`** (confirm in the app logs or upstream docs for your OS).
2. **One terminal session** — export proxy variables, then use Git as usual:

   ```bash
   export http_proxy=http://127.0.0.1:38457 https_proxy=http://127.0.0.1:38457
   export HTTP_PROXY=http://127.0.0.1:38457 HTTPS_PROXY=http://127.0.0.1:38457
   ```

3. **TLS / certificate warnings** — FastGithub may MITM HTTPS; trust its CA per upstream instructions (`cacert/fastgithub.cer`), or only if you accept the risk use per-command `git -c http.sslVerify=false` for GitHub.
4. **HTTP/2 issues** — try `git -c http.version=HTTP/1.1 …` on top of the proxy.

Optional shell helpers (e.g. in `~/.zshrc`):

```bash
git_proxy_set_fastgithub() {
  export http_proxy=http://127.0.0.1:38457 https_proxy=http://127.0.0.1:38457
  export HTTP_PROXY=http://127.0.0.1:38457 HTTPS_PROXY=http://127.0.0.1:38457
}
git_proxy_unset() { unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY; }
```

**Deploy (`make deploy`):** Docusaurus clones a temp repo and pushes **`gh-pages`**; keep FastGithub running with the same exports in that terminal. You still need working GitHub auth for HTTPS (`gh auth setup-git`, SSH, or a credential helper)—otherwise `git push` may fail with “could not read Password”.

**Protected `main`:** if force-push to **`main`** is disabled on GitHub, push a **feature branch** and open a **pull request** instead.

### Common tasks

| Task | Command |
|------|---------|
| Local dev server (hot reload) | `make dev` |
| Production build (`./build/`) | `make build` |
| Preview the production build | `make serve` |
| Regenerate Doxygen under `static/doxygen/` | `make doxygen` |
| Deploy to `gh-pages` | `make deploy` |
| Remove build artifacts | `make clean` |

Local dev URL (see `package.json` / `Makefile` for the port): <http://localhost:3001/webpage/>.

### Authoring

- **Language:** Write documentation in **English** (same as the deployed site).
- Markdown lives in `docs/`; sidebars in `sidebars.ts`. Narrative guides sit under **`docs/manual/`** (`userGuideSidebar`). Python API pages under **`docs/python-api/`** use a separate **`pythonApiSidebar`** (module tree + link back to the manual) so the manual nav is not cluttered with API entries.
- Static assets go under `static/` (e.g. `static/img/foo.png` → `/img/foo.png` in Markdown).
- Landing page: `src/pages/index.tsx`.
- Math: KaTeX via `remark-math` + `rehype-katex` — `$inline$` and `$$display$$`.

### Doxygen (C++ API reference)

`Doxyfile` writes to `static/doxygen/` so Docusaurus serves it as static files. The navbar entry **API → C++ (Doxygen)** opens `/webpage/doxygen/html/index.html` in a **new tab** (`target="_blank"`) because Doxygen uses separate styling from the Docusaurus site.

```bash
make doxygen   # writes static/doxygen/html/...
```

The `INPUT` paths in `Doxyfile` expect a Phynexis source tree on your machine (e.g. `../phynexis/src`). **Regenerating Doxygen requires access to the corresponding licensed sources.** `static/doxygen/` is usually `.gitignore`d — generate in a trusted environment before deploy when needed.

### File / folder naming

Use **kebab-case** for files and directories (e.g. `dem-basics.md`). Keep code identifiers in each language’s usual style (e.g. **snake_case** where applicable).

### Notes

- Use `https://` for external links in Markdown. Some Tencent Cloud video URLs default to `http://`; switch them to `https://` to avoid mixed-content blocking.
