/**
 * @license Angular DOM
 * (c) 2015 Bethel Technologies, LLC http://getbethel.com
 * License: MIT
 */
angular.module('bethel.dom')
.directive('sticky', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var parent = element.parent(),
          offset = Number(attrs.offset) || 0;

      parent.css({ position: 'relative' });

      $window.addEventListener('scroll', stickyElement);
      $window.addEventListener('resize', stickyElement);
      scope.$watch(stickyElement);

      function calculateForStyles(parent, width) {
        var styles = [
          'border-left-width',
          'border-right-width',
          'padding-left',
          'padding-right'
        ];

        angular.forEach(styles, function(style) {
          if (parseFloat(parent.css(style)) >= 1) {
            width -= parseFloat(parent.css(style));
          }
        });

        return width;
      }

      function stickyElement() {
        var parentRect = parent[0].getBoundingClientRect(),
            distanceFromTop = parentRect.top,
            distanceFromBottom = parentRect.bottom - (element[0].offsetHeight + offset),
            parentWidth = parent[0].offsetWidth;

        parentWidth = calculateForStyles(parent, parentWidth);

        element.css({
          position: 'fixed',
          top: offset + 'px',
          width: parentWidth + 'px'
        });

        if (distanceFromTop > 0) {
          element.css('position', 'static');
        }

        if (parseFloat(parent.css('border-bottom-width')) >= 1) {
          distanceFromBottom -= parseFloat(parent.css('border-bottom-width'));
        }

        if (distanceFromBottom < 0) {
          element.css('top', Math.round(distanceFromBottom) + 'px');
        }
      }
    }
  };
}]);
