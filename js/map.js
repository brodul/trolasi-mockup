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

      $el.css({
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden'
      });

      this.resize();
      $el.on('resize', this.resize);

      $el.jHERE({
        enable: [
        'behavior', // enables map interaction (drag to pan, scroll-wheel to zoom)
        'zoombar', // shows a zoom control
        'scalebar', // shows a scalebar on the map
        'typeselector', // shows a dropdown where the user can select map, satellite, terrain
        'overview', // shows a button to activate the overview panel
        //'traffic', // shows a button to enable the traffic layer
        //'publictransport', // shows a button to enable the public transport view
        //'positioning', // shows a button that triggers detection of the user's position
        //'rightclick', // shows a contextual menu on right click to zoom in and out
        'contextmenu' // shows an enriched contextual menu with: current address, zoom in/out, directions

        ], // An array of components as strings.
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
    resize: function() {
      this.$el.css({
        width: $(window).width(),
        height: $(window).height()
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
