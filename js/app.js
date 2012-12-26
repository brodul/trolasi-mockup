define([
  'jquery',
  'map',
  'search'
], function($, Map, Search) {

  $(document).ready(function() {

    // XXX: this should be optimized on server
    var stations_by_name = {},
        stations = [];
    $.each(window.LPP_STATIONS, function(i, item) {
      if (!stations_by_name[item.name]) {
        stations.push(item);
        stations_by_name[item.name] = {
          name: item.name,
          number: [ item.number ]
        };
      } else {
        stations_by_name[item.name].number.push(item.number);
      }
    });
    $.each(window.LPP_STATIONS_BY_ROUTE, function(i, item) {
      if(stations_by_name[item.station_name]) {
        if (!stations_by_name[item.station_name].routes) {
          stations_by_name[item.station_name].routes = [];
        }
        if ($.inArray(item.number, stations_by_name[item.station_name].routes) === -1) {
          stations_by_name[item.station_name].routes.push(item.number);
        }
      }
    });


    var map = new Map(
      $('#lpp-map'), {
        home_latitude: '46.051426',
        home_longitude: '14.505965'
      });

    var search = new Search(
      $('#lpp-search'), {
        map: map,
        source: stations,
        stations_by_name: stations_by_name
      });


    //$('#lpp-current-geolocation').on('click', function(e) {
    //  e.stopPropagation();
    //  e.preventDefault();
    //  // Try to get current location (via HTML5 geolocation)
    //  if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(function(position) {
    //      map.center(position.coords.latitude,
    //                          position.coords.longitude);
    //    });
    //  }
    //});

  });

});
