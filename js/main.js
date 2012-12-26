requirejs.config({
  paths: {
    jquery: '../lib/jquery',
    jhere: '../lib/jhere/src/jhere',
    bootstrap_typeahead: '../lib/bootstrap/js/bootstrap-typeahead'
  },
  shim: {
    jhere: { deps: ['jquery'] },
    bootstrap_typeahead: { deps: ['jquery'], exports: '$.fn.typeahead.Constructor' }
  }
});

require([ 'app' ]);
