define([
  'jquery',
  'bootstrap_typeahead'
], function($, Typeahead) {

  var Search = function($element, options) { this.init($element, options); };
  Search.prototype = $.extend({}, Typeahead.prototype, {
    constructor: Search,
    defaults: $.extend({}, $.fn.typeahead.defaults, {
        menuId: 'lpp-search-results',
        prefix: 'Postajališče: '
      }),
    init: function($element, options) {
      var self = this;
      options = $.extend(self.defaults, options);
      Typeahead.apply(self, [$element, options]);
      self.$content = $('#lpp-content');
      self.$menu.attr('id', this.options.menuId);
      self.$element.on('focus', function(e) {
        var prefix = self.options.prefix;
        if ($(this).val().substr(0, prefix.length) === prefix) {
          $(this).val($(this).val().substr(prefix.length));
        }
      });
    },
    toItemsWithNames: function(items) {
      var itemsWithNames = [];
      $.each(items, function(i, item) {
        itemsWithNames.push(item.name);
      });
      return itemsWithNames;
    },
    click: function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.select(e);
    },
    select: function (e) {
      var value = this.$menu.find('.active').attr('data-value');
      if (value) {
        this.showContent(value);
      } else {
        value = $(e.target).parents('[data-value]').data('value');
        this.showContent(value, $(e.target).html());
      }
      this.$element
        .val(this.updater(value))
        .change();
      return this.hide();
    },
    show: function() {
      this.$content.hide();
      return Typeahead.prototype.show.call(this);
    },
    updater: function (itemName) {
      return this.options.prefix + itemName;
    },
    matcher: function(item) {
      return Typeahead.prototype.matcher.apply(this, [item.name]);
    },
    sorter: function(items) {
      var self = this, sorted = [];
      items = this.toItemsWithNames(items);
      $.each(Typeahead.prototype.sorter.apply(this, [items]), function(i, item) {
        sorted.push(self.options.stations_by_name[item]);
      });
      return sorted;
    },
    render: function(items) {
      var self = this, $routes;
      items = self.toItemsWithNames(items);
      Typeahead.prototype.render.apply(self, [items]);
      if (self.options.stations_by_name) {
        self.$menu.children().each(function(i, item) {
          $routes = $('<ul>').appendTo(item);
          $.each(self.options.stations_by_name[$(item).data('value')].routes, function(i, route) {
            $routes.append(
              $('<li/>').addClass('lpp-route-' + route).append(
                $('<a href="#"/>').html(route)));
          });
        });
      }
      return self;
    },
    showContent: function(itemName, selectedRoute) {
      var self = this;
          $progresbar = $('' +
              '<div class="progress progress-striped active">' +
              ' <div class="bar" style="width: 100%;"></div>' +
              '</div>'),
          $closebtn = $('' +
              '<a href="#" class="lpp-close-btn">Zapri</a>'),
          $title = $('' +
              '<h2>Prihodi avtobusov:</h2>');

      // empty content area
      self.$content.html('');

      // close button
      $closebtn
        .appendTo(self.$content)
        .on('click', function(e) {
          e.stopPropagation();
          e.preventDefault();
          self.$content.hide();
        });

      // loader
      self.$content.css('min-height', $(window).height() - 100);
      $progresbar
        .appendTo(self.$content)
        .css('margin-top', self.$content.height()/2 - $progresbar.outerHeight()/2);
      self.$content.show();

      // request station data
      setTimeout(function() {

        // TODO: for now we only fake it
        var result = {};
        $.each(self.options.stations_by_name[itemName].routes, function(i, route) {
          result[route] = {};
          result[route]['Direction 1'] = [ 7, 12, 20, 30, 45 ];
          result[route]['Direction 2'] = [ 7, 20, 45, 55 ];
        });

        // remove progressbar
        $progresbar.remove();

        // title
        $title.appendTo(self.$content);

        // list of station routes with arrival times
        var $list = $('<ul/>').appendTo(self.$content), $item;
        $.each(result, function(route, directions) {
          if (!selectedRoute || selectedRoute === route) {
            $item = $('<li/>')
              .append('<a class="lpp-route-' + route + '" href="#">' + route + '</a>')
              .appendTo($list);
            $.each(directions, function(direction, route_times) {
              $('<div class="lpp-arrival-times">' +
                ' <h3>' + direction + '</h3>' +
                ' <p>' + route_times.join('\', ') + '\'</p>' +
                '</div>').appendTo($item);
            });
            $('<div style="clear:both;"></div>').appendTo($item);
          }
        });

      }, 1000);
    }
  });

  return Search;
});
