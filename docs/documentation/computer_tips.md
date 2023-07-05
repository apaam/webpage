###

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)
┊ [Next](paraview_rendering.md)

-------

We summarize some useful tips in linux and computer methods, e.g., github token, DNS issue, etc.

### Github token and  ``gh``

Github has abundon the access option of username and pwd and chosen to use token, which becomes fairly inconvenient. A solution to make life easier is to use [github CLI](https://cli.github.com) (i.e., ``gh``) to set up the access. For using github CLI, one may still need a token, which can be obtained from [https://github.com/settings/tokens](https://github.com/settings/tokens), for the initial set-up.

### ``fastgithub`` for github DNS

One may encounter ``404`` issue when accessing github relevent resources, which is very likely due to the DNS issue. A solution is to use [fastgithub](https://github.com/dotnetcore/FastGithub). As a practice, I put the following snippet in my ``bashrc/zshrc`` terminal profile. Once I need to use a git commmand towards github, I run ``git_proxy_set`` and ``fastgithub`` first, and then run conventional git commands, such as pull/fetch/push, and finally ``git_proxy_unset`` to reset git proxy. *Before using ``fastgithub``, one may need to follow the instruction in [fastgithub](https://github.com/dotnetcore/FastGithub) to set up the certificates.*

```bash
alias fastgithub=/Users/lzhshou/MyBin/fastgithub_osx/fastgithub

alias git_proxy_set='\
  git config --global http.proxy http://127.0.0.1:38457 && \
  git config --global https.proxy http://127.0.0.1:38457'
alias git_proxy_unset='\
  git config --global --unset http.proxy && \
  git config --global --unset https.proxy'
```

-------

[User manual](user_manual.md)
┊ [Previous](basic_usage.md)
┊ [Next](paraview_rendering.md)