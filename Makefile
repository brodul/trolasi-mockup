LESSC = lessc
NODEJS = node
TARGETS = build/index.html build/images build/app.css build/app.js
all:: clean $(TARGETS)

build/app.css:
	$(LESSC) less/app.less -x $@
build/app.js:
	$(NODEJS) lib/r.js -o baseUrl=js insertRequire=app mainConfigFile=js/app.js name=../lib/almond include=app wrap=true optimize=uglify out=$@
build/images:
	mkdir -p build/images
	cp images/* build/images
build/index.html:
	cp index.html $@
	sed -i 's@stylesheet/less@stylesheet@g' $@
	sed -i 's@less/app.less@app.css@g' $@
	sed -i 's@<script src="http://cloud.github.com/downloads/cloudhead/less.js/less-1.3.1.min.js" type="text/javascript"></script>@@g' $@
	sed -i 's@<script data-main="js/app" src="lib/require.js" type="text/javascript"></script>@<script src="app.js" type="text/javascript"></script>@g' $@

bootstrap:
	mkdir -p build
	git submodule update --init --recursive

clean:
	rm -rf $(TARGETS)

.PHONY: all clean bootstrap test
