.PHONY: dev build serve deploy doxygen pdf install clean check-python-api-md-tables

install:
	npm install

dev:
	npm run dev

build:
	npm run build

serve: build
	npm run serve

deploy:
	npm run deploy

doxygen:
	rm -rf static/doxygen
	doxygen Doxyfile

pdf:
	python3 scripts/export-docs-pdf.py
	python3 scripts/export-python-api-pdf.py

check-python-api-md-tables:
	python3 scripts/check-python-api-md-tables.py

clean:
	rm -rf .docusaurus build node_modules static/doxygen
