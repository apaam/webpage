local:
	mkdocs serve
deploy:
	mkdocs gh-deploy
doxygen: 
	rm -rf docs/doxygen/
	doxygen Doxyfile

.PHONY: local remote doxygen 
