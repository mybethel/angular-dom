/**
 * @license Angular DOM
 * (c) 2015 Bethel Technologies, LLC http://getbethel.com
 * License: MIT
 */
angular.module('bethel.dom')
.directive('equalize', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var maxHeight = 0;
      var mediaQuery = attrs.mediaQuery || false;

      if (mediaQuery && mediaQuery[0] !== '(') {
        mediaQuery = '(' + mediaQuery + ')';
      }

      function findElements() {
        if (!attrs.equalize)
          return element[0].children;

        return element[0].querySelectorAll(attrs.equalize);
      }

      function applyMaxHeight() {
        if (!maxHeight || !scope.equalized) return;
        angular.forEach(scope.equalized, function (el) {
          angular.element(el).css('height', maxHeight + 'px');
        });
      }

      function getMaxHeight() {
        if (!scope.equalized) return;
        maxHeight = 0;
        angular.forEach(scope.equalized, function (el) {
          angular.element(el).css('height', '');
          maxHeight = Math.max(maxHeight, el.offsetHeight);
        });

        // Only apply maximum height if the media query matches.
        if (!mediaQuery || matchMedia(mediaQuery).matches) {
          applyMaxHeight();
        }
      }

      scope.equalized = findElements();
      scope.$watch(function() {
        return element[0].childNodes.length;
      }, function (newValue, oldValue) {
        if (!newValue || newValue === oldValue) return;
        scope.equalized = findElements();
      });

      $window.addEventListener('resize', getMaxHeight);
      scope.$watch('equalized', function(newValue, oldValue) {
        if (!newValue) return;

        // Re-calculate height on `$digest()` to ensure that new content that
        // may have been added as child nodes are properly accounted for.
        scope.$watch(getMaxHeight);
      });

    }
  };
}]);
