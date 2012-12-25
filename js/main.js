requirejs.config({
  paths: {
    zepto: '../lib/zepto',
    underscore: '../lib/underscore',
    backbone: '../lib/backbone',
    jhere_zepto: '../lib/jhere/src/zepto.adapter',
    jhere: '../lib/jhere/src/jhere'
  },
  shim: {
    zepto: { exports: '$' },
    backbone: { deps: ['underscore', 'zepto'], exports: 'Backbone' },
    jhere: { deps: ['jhere_zepto'] }
  }
});

require([
  'backbone',
  'app'
], function(Backbone, App) {

  $(document).ready(function() {

    // initialize App
    window.App = new App();

    // initialize Backbone history
    Backbone.history.start();

  });

     // Try HTML5 geolocation
     //   if(navigator.geolocation) {
     //     navigator.geolocation.getCurrentPosition(function(position) {
     //       var pos = new google.maps.LatLng(position.coords.latitude,
     //                                        position.coords.longitude);

     //       var infowindow = new google.maps.InfoWindow({
     //         map: map,
     //         position: pos,
     //         content: 'Location found using HTML5.'
     //       });

     //       map.setCenter(pos);
     //     }, function() {
     //       handleNoGeolocation(true);
     //     });
     //   } else {
     //     // Browser doesn't support Geolocation
     //     handleNoGeolocation(false);
     //   }

});
