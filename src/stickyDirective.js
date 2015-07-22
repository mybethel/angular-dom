/**
 * @license Angular DOM
 * (c) 2015 Bethel Technologies, LLC http://getbethel.com
 * License: MIT
 */
angular.module('bethel.dom')
.directive('sticky', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var parent = element.parent(),
          offset = Number(attrs.offset) || 0;

      parent.css({ position: 'relative' });

      window.addEventListener('scroll', stickyElement);
      window.addEventListener('resize', stickyElement);

      function stickyElement() {
        var distanceFromTop = parent[0].getBoundingClientRect().top;
        var distanceFromBottom = parent[0].getBoundingClientRect().bottom - (element[0].offsetHeight + offset);

        element.css({
          position: 'fixed',
          top: offset + 'px',
          width: parent[0].offsetWidth + 'px'
        });

        if (distanceFromTop > 0) {
          element.css('position', 'static');
        }
        if (distanceFromBottom < 0) {
          element.css('top', Math.round(distanceFromBottom) + 'px');
        }
      }

      scope.$watch(function() {
        return [parent[0].clientWidth, parent[0].clientHeight].join('x');
      }, function (newValue, oldValue) {
        if (!newValue || newValue === oldValue) return;
        stickyElement();
      });
    }
  };
});
