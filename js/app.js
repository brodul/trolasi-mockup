define([
  'zepto',
  'backbone',
  'map_view'
], function($, Backbone, MapView) {

  var App = Backbone.Router.extend({
    routes: {
      '': 'to_current_location',
      'station/:id': 'to_station'
    },
    initialize: function(options) {
      this.map_view = new MapView({
        el: $('<div id="lpp-map"/>').appendTo('body')
      });
    },
    to_current_location: function() {
      this.map_view.current();
      console.log('current');
    },
    to_station: function(id) {
    }
  });

  return App;

});
