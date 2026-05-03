---
title: "Developer Tools"
sidebar_label: "Git & workstation"
---

## Developer Tools

Notes for Linux and macOS workstations when using Git, GitHub, and related tooling alongside Phynexis development. Third-party tools linked here are **not** part of Phynexis; vet security and licensing before use.

### GitHub authentication with the `gh` CLI

GitHub no longer accepts account passwords for Git operations over HTTPS. A practical workflow is the [GitHub CLI](https://cli.github.com) (`gh`). You still create a [personal access token](https://github.com/settings/tokens) once for initial `gh auth login`, after which `gh` manages credentials.

### `fastgithub` and Git proxy (China / unstable DNS)

If GitHub assets fail intermittently (often DNS-related), some developers use [FastGithub](https://github.com/dotnetcore/FastGithub). Follow that project’s certificate instructions before use.

After FastGithub is running locally, you can route Git through its HTTP proxy when needed:

```bash
alias fastgithub=/path/to/fastgithub

alias git_proxy_set='\
  git config --global http.proxy http://127.0.0.1:38457 && \
  git config --global https.proxy http://127.0.0.1:38457'
alias git_proxy_unset='\
  git config --global --unset http.proxy && \
  git config --global --unset https.proxy'
```

Typical sequence: start FastGithub, run `git_proxy_set`, perform `git pull` / `push`, then `git_proxy_unset`. Adjust the proxy port if your FastGithub build uses a different listen address.
