This repository maintains the [documentation](https://net-dem.github.io/netdem_docs/) of the [NetDEM](https://github.com/net-dem/netdem) project.

### To update the site:

  0. Install prerequisite: mkdocs. (If pip or pip3 is not already installed in your computer, follow the instruciton in https://pip.pypa.io/en/stable/installing/ to install it.)
      ```
      pip3 install mkdocs
      pip3 install mkdocs-gitbook
      ```
  1. Make changes in docs/.
  2. Preview or review the site by running the following command in a terminal, and then visit http://127.0.0.1:8000 in a browser.
      ```
      mkdocs serve
      ```
  3. Update the remote site using
      ```
      mkdocs gh-deploy
      ```
  4. Push the change of site source to remote using 
      ```
      git add .
      git commit -m [message]
      git push
      ```
