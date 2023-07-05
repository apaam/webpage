This repository maintains the [documentation](https://apaam.github.io/netdem_docs/) of the [NetDEM](https://github.com/apaam/netdem) project. It is built on [mkdocs](https://www.mkdocs.org/) and the template extracted from [mfem](https://mfem.org/).

## To update the site:

0. Install prerequisite: ``mkdocs`` packages using [pip](https://pip.pypa.io/en/stable/installing/) or [pip3](https://pip.pypa.io/en/stable/installing/).
  
```bash
pip3 install mkdocs
pip3 install mkdocs-bootswatch
pip3 install pymdown-extensions
pip3 install attr
pip3 install mkdocs-bibtex
pip3 install mkdocs-video
```
          
1. Make changes in ``docs/``. If a new page are added, please index this page in the ``nav`` section of ``mkdocs.yml`` in the root directory, otherwise the new added page will not be rendered.

2. Preview or review the site by running the following command in a terminal, and then visit http://127.0.0.1:8000 in a browser.
      
```bash
mkdocs serve
```
      
3. Update the remote site using

```bash
mkdocs gh-deploy
```

4. Push the change of site source to remote using 

```bash
git add .
git commit -m [message]
git push
```

## To update the code doxygen

Update the doxygen files in ``docs/`` using command ``doxygen Doxyfile``, then follow the previsous procedures to update the files to the remote and website. Make sure that the directory of the source code (i.e., ``INPUT = ../netdem/readme.md ../netdem/src``, near line 867 in ``Doxyfile``) is correct.


## Tips

- mkdocs does not support ``http``, please make sure the web links are starting with ``https``. For example, the videl links copied from ``tecent cloud`` are starting with ``http`` by default, which could result in no response when using ``http`` links in the ``Animations`` page.