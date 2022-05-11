local:
	mkdocs serve
remote:
	mkdocs gh-deploy
doxygen: 
	doxygen Doxyfile

.PHONY: local remote doxygen 
