requirejs.config({
  paths: {
    jquery: '../lib/jquery',
    jhere: '../lib/jhere/src/jhere',
    bootstrap_typeahead: '../lib/bootstrap-typeahead'
  },
  shim: {
    jhere: { deps: ['jquery'] },
    bootstrap_typeahead: { deps: ['jquery'] }
  }
});

require([
  'jquery',
  'bootstrap_typeahead',
  'map'
], function($, Typeahead, Map) {

  $(document).ready(function() {

    // XXX: this should be optimized on server
    var stations_by_name = {},
        stations = [];
    $.each(window.LPP_STATIONS, function(i, item) {
      if (!stations_by_name[item.name]) {
        stations.push(item.name);
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


    var map = new Map($('#lpp-map'), {
      home_latitude: '46.051426',
      home_longitude: '14.505965'
    });

    $('#lpp-current-geolocation').on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      // Try to get current location (via HTML5 geolocation)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          map.center(position.coords.latitude,
                              position.coords.longitude);
        });
      }
    });

    $('#lpp-query').typeahead({
      source: stations,
      highlighter: function (item) {
        var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'),
            routes = '';

        $.each(stations_by_name[item].routes, function(i, route) {
          routes += '<li class="lpp-route-' + route + '">' + route + '</li>';
        });

        return '<h2>' +
          item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
            return '<strong>' + match + '</strong>';
          }) + '</h2><ul class="lpp-routes">' + routes + '</ul>';
      }
    });

    $('#lpp-query').on('change', function(e) {
      var $el = $(this);
      if ($.inArray($el.val(), stations) !== -1) {
        e.stopPropagation();
        e.preventDefault();

        // TODO: create request /stations/:number
        var result = {};
        $.each(stations_by_name[$el.val()].routes, function(i, route) {
          result[route] = {};
          result[route]['Direction 1'] = [ 7, 12, 20, 30, 45 ];
          result[route]['Direction 2'] = [ 7, 20, 45, 55 ];
        });

        var $container = $('#lpp-station').html('');

        //var $closeTop = $('<a href="#" class="lpp-close-btn">Zapri</a>')
        //  .appendTo($container)
        //  .on('click', function() {
        //    e.stopPropagation();
        //    e.preventDefault();
        //    $(this).parents('#lpp-station').hide();
        //  });

        $('<h1>Postajališe: <strong>' + $el.val() + '</strong></h1>').appendTo($container);

        var $list = $('<ul/>').appendTo($container);

        $.each(result, function(route, directions) {
          var $item = $('<li/>')
              .append('<a class="lpp-route" href="#">' + route + '</a>')
              .appendTo($list);
          $.each(directions, function(direction, route_times) {
            $('<div class="lpp-route-times">' +
              ' <h3>' + direction + '</h3>' +
              ' <p>' + route_times.join('\', ') + '\'</p>' +
              '</div>').appendTo($item);
          });
          $('<div style="clear:both;"></div>').appendTo($item);
        });

        var $closeBottom= $('<a href="#" class="lpp-close-btn">Zapri</a>')
          .appendTo($container)
          .on('click', function() {
            e.stopPropagation();
            e.preventDefault();
            $(this).parents('#lpp-station').hide();
          });

        $container.show();
      }
    });

    $("a.lpp-close-btn").on('click', function() {
        e.stopPropagation();
        e.preventDefault();
        $(this).parents('#lpp-station').hide();
    });
  });

});
