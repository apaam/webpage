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
	@test "$$(git branch --show-current)" = "main" || { echo "deploy: checkout main first"; exit 1; }
	@test -z "$$(git status --porcelain)" || { echo "deploy: working tree not clean; commit or stash first"; exit 1; }
	$(MAKE) build
	git fetch origin gh-pages 2>/dev/null || true
	git checkout gh-pages
	@if git rev-parse --verify origin/gh-pages >/dev/null 2>&1; then git reset --hard origin/gh-pages; fi
	@if [ -n "$$(git ls-files)" ]; then git ls-files -z | xargs -0 git rm -f; fi
	git clean -fdx --exclude=build --exclude=node_modules --exclude=.docusaurus --exclude=local
	cp -a build/. .
	git add -A
	@if git diff --cached --quiet; then \
		echo "deploy: nothing to commit"; \
	else \
		git commit -m "Deploy website - based on $$(git rev-parse main)"; \
	fi
	git checkout main
	@echo "Local gh-pages updated. Push when ready: git push origin gh-pages"

doxygen:
	rm -rf static/doxygen
	doxygen Doxyfile

clean:
	rm -rf .docusaurus build node_modules static/doxygen
