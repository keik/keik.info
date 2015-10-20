build: node_modules
	@node .

watch: node_modules
	@node . -w & node_modules/.bin/http-server build

node_modules: package.json
	@npm install

.PHONY: build
