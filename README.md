This repository maintains the [documentation](https://net-dem.github.io/netdem_docs/) of the [NetDEM](https://github.com/net-dem/netdem) project.

### To update the site:

  0. Install prerequisite: ``mkdocs`` packages using [pip](https://pip.pypa.io/en/stable/installing/) or [pip3](https://pip.pypa.io/en/stable/installing/).
  
          pip3 install mkdocs
          pip3 install mkdocs-bootswatch
          pip3 install pymdown-extensions
          pip3 install attr
          pip3 install mkdocs-bibtex
          
  1. Make changes in ``docs/``. If a new page are added, please index this page in the ``nav`` section of ``mkdocs.yml`` in the root directory, otherwise the new added page will not be rendered.
  2. Preview or review the site by running the following command in a terminal, and then visit http://127.0.0.1:8000 in a browser.
      
          mkdocs serve
      
  3. Update the remote site using

          mkdocs gh-deploy

  4. Push the change of site source to remote using 

          git add .
          git commit -m [message]
          git push

