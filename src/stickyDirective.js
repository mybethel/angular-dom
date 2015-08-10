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

      function stickyElement() {
        var parentRect = parent[0].getBoundingClientRect(),
            distanceFromTop = parentRect.top,
            distanceFromBottom = parentRect.bottom - (element[0].offsetHeight + offset),
            parentWidth = parent[0].offsetWidth;

        if (parseFloat(parent.css('border-left-width')) >= 1) {
          parentWidth -= parseFloat(parent.css('border-left-width'));
        }

        if (parseFloat(parent.css('border-right-width')) >= 1) {
          parentWidth -= parseFloat(parent.css('border-right-width'));
        }

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
