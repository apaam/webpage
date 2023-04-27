local:
	mkdocs serve
deploy:
	mkdocs gh-deploy
doxygen: 
	doxygen Doxyfile

.PHONY: local remote doxygen 
