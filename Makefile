COMMIT_HASH := $(shell git log --pretty=format:'%h' -n 1)

# Publishes the Storybook to gh-pages.
publish-storybook:
	# Checkout to master branch.
	git checkout master
	# Build Storybook.
	yarn build-storybook
	# Checkout to gh-pages branch.
	git checkout gh-pages
	# Cleanup previous build.
	rm -rf sb_dll static favicon.ico iframe.html index.html main.* runtime~main.* vendors~main.*
	# Bring the contents of the storybook-static to the root project.
	mv storybook-static/* .
	# Commit the changes.
	git add -A
	# git config alias.c "commit -s -v".
	git c -m "Update gh-pages $(COMMIT_HASH)"
	git push origin gh-pages
	# Back to master after publishing.
	git checkout master

.PHONY: publish-storybook
