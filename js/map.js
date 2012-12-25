define([
  'jquery',
  'jhere'
], function($) {

  var Map = function($el, options) { this.init($el, options); };
  Map.prototype = {
    init: function($el, options) {
      this.$el = $el;
      this.options = options;

      //$.jHERE.defaultCredentials(appId, authToken);

      $el.jHERE({
        enable: [
          'behavior', // enables map interaction (drag to pan, scroll-wheel to zoom)
          'zoombar', // shows a zoom control
          'scalebar' // shows a scalebar on the map
        ], // An array of components as strings.
        type: 'smart', //can be map (the default), satellite, terrain, smart, pt.
        zoom: 15, //a positive integer
        center: [ parseFloat(this.options.home_latitude),
                  parseFloat(this.options.home_longitude) ] // center map into center of ljubljana
      });


      $.each(window.LPP_STATIONS, function(i, station) {
        $el.jHERE('marker',
          [ parseFloat(station.latitude),
            parseFloat(station.longitude) ], {
              text: station.name,
              textColor: '#333333',
              fill: '#ff6347',
              stroke: '#333333',
              icon: 'images/marker.png',
              anchor: {x: 12, y: 32}
            });
      });
    },
    center: function(lat, lon) {
      this.$el.jHERE('center', [parseFloat(lat), parseFloat(lon)]);
    },
    home: function() {
      this.center(this.options.home_latitude,
                  this.options.home_longitude);
    }
  };

  return Map;

});
