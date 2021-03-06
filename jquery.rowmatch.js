/*!
 * jquery-rowmatch
 *
 * @author Dave Medema / @davemedema
 * @homepage https://github.com/davemedema/jquery-rowmatch
 * @version 0.1.0
 * @preserve
 *
 * Copyright 2013 Dave Medema
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See LICENSE.txt for more details.
 */

(function($) {
  'use strict';

  var RowMatch = function(element, options) {
    this.$el = $(element);
    this.opts = $.extend({}, $.fn.rowMatch.defaults, options || {});
    this.match();
  };

  RowMatch.prototype = {

    constructor: RowMatch,

    match: function() {
      var rowElements = [],
          rowTop = 0,
          tallest = 0;

      // Match rows
      this.$el.children().each(function() {
        var $el = $(this).css('height', 'auto');

        if ($el.position().top !== rowTop) {
          for (var i = 0; i < rowElements.length; i++) {
            rowElements[i].height(tallest);

            rowElements = [];
            rowTop = $el.position().top;
            tallest = 0;
          }
        }

        rowElements.push($el);
        var height = $el.height();
        if (height > tallest) {
          tallest = height;
        }
      });

      // Match last row
      for (var j = 0; j < rowElements.length; j++) {
        rowElements[j].height(tallest);
      }
    }

  };

  var old = $.fn.rowMatch;

  $.fn.rowMatch = function(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('rowMatch');
      if (!data) {
        $this.data('rowMatch', (data = new RowMatch(this, option)));
      } else {
        data.match();
      }
    });
  };

  $.fn.rowMatch.defaults = {};

  $.fn.rowMatch.noConflict = function() {
    $.fn.rowMatch = old;
    return this;
  };

})(jQuery);
