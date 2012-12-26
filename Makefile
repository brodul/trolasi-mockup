LESSC = lessc
NODEJS = node
UGLIFYJS = uglifyjs
TARGETS = build/index.html build/images build/app.css build/js
all:: clean $(TARGETS)

build/app.css:
	$(LESSC) less/app.less -x $@
build/app.js:
	$(NODEJS) lib/r.js -o build/build.js optimize=none out=$@
build/images:
	mkdir -p build/images
	cp images/* build/images
build/index.html:
	cp index.html $@
	sed -i 's@stylesheet/less@stylesheet@g' $@
	sed -i 's@less/app.less@app.css@g' $@
	sed -i 's@<script src="http://cloud.github.com/downloads/cloudhead/less.js/less-1.3.1.min.js" type="text/javascript"></script>@@g' $@
	sed -i 's@<script data-main="js/main" src="lib/require.js" type="text/javascript"></script>@<script data-main="main" src="require.js" type="text/javascript"></script>@g' $@
build/js:
	$(UGLIFYJS) lib/require.js > build/require.js
	$(UGLIFYJS) lib/jquery.js > build/jquery.js
	$(UGLIFYJS) lib/jhere/src/jhere.js > build/jhere.js
	$(UGLIFYJS) lib/bootstrap/js/bootstrap-typeahead.js > build/bootstrap_typeahead.js
	$(UGLIFYJS) js/deploy.js > build/main.js
	$(UGLIFYJS) js/app.js > build/app.js
	$(UGLIFYJS) js/map.js > build/map.js
	$(UGLIFYJS) js/search.js > build/search.js


bootstrap:
	mkdir -p build
	git submodule update --init --recursive

clean:
	rm -rf $(TARGETS)

.PHONY: all clean bootstrap test
