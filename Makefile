YARN := yarn

deps:
	$(YARN)

build: clean deps
	$(YARN) run build

clean:
	rm -rf ./dist
	test -f .token && rm -rf .token

generate-token:
	test -f .token || openssl rand -hex 32 > .token
	$(eval TOKEN := $(shell cat .token))

run: generate-token
	@TOKEN=$(TOKEN) node ./dist/main.js
