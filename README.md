This repository maintains the [documention](https://net-dem.github.io/netdem_docs/) of the [NetDEM](https://github.com/net-dem/netdem) project.

### To update the side:

  0. Install prerequisite: mkdocs. (If pip or pip3 is not already installed in your computer, follow the instruciton in https://pip.pypa.io/en/stable/installing/ to install it.)
      ```
      pip3 install mkdocs
      pip3 install mkdocs-gitbook
      ```
  1. Make changes in docs/.
  2. Pre-review the site by running the following command in a terminal, and then visit http://127.0.0.1:8000 in a browser.
      ```
      mkdocs serve
      ```
  3. Update the remote site using
      ```
      mkdocs gh-deploy
      ```
  4. Push the code to remote using 
      ```
      git add .
      git commit [message]
      git push
      ```