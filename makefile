.PHONY: dev build serve deploy doxygen install clean

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

clean:
	rm -rf .docusaurus build node_modules static/doxygen
