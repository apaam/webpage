serve:
	mkdocs serve
deploy:
	mkdocs gh-deploy
doxygen: 
	doxygen Doxyfile
push:
	message=update
	git add .
	git commit -m "$(message)"
	git push 

.PHONY: serve deploy doxygen push
