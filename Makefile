
DEPLOY_ENV=gh-pages
PAGES_BRANCH=$(DEPLOY_ENV)

github-pages:
	ember build --environment=$(DEPLOY_ENV)
	git checkout $(PAGES_BRANCH)
	rm -rf tests assets
	mv dist/* .
	rmdir dist
	git add -u
	git add assets
	git add tests
	git add guides.html
	git commit

clean:
	-rm -rf tmp
	-rm -rf dist
	-rm -rf node_modules
	-rm -rf bower_components

install:
	npm install
	bower install
