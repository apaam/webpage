local:
	mkdocs serve
publish:
	mkdocs gh-deploy
doxygen: 
	doxygen Doxyfile

.PHONY: local remote doxygen 
