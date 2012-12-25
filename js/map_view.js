define([
  'backbone',
  'jhere'
  //'stations'
], function(Backbone, Stations) {

  var MapView = Backbone.View.extend({
    initialize: function(options) {
      //$.jHERE.defaultCredentials(appId, authToken);
      //this.listenTo(Stations, 'all', this.render);
      this.$el.jHERE({
        enable: [], //An array of components as strings.
        type: 'map', //can be map (the default), satellite, terrain, smart, pt.
        zoom: 12 //a positive integer.
      });
    },
    center: function(lat, lon) {
      this.$el.jHERE('center', [lat, lon]);
    }
  });

  return MapView;

});

