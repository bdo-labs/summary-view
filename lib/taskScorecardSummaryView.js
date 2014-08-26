
/**
 * Module dependencies.
 */
var angular = require('angular');

angular.module('taskScorecardSummaryView').directive('taskScorecardSummaryView',
  ['$compile', 'scorecardService', 'tagService', 'indicatorService', 'organizationalNodeService',
    function ($compile, scorecardService, tagService, indicatorService, orgNodeService) {

      function link(scope, el, attrs) {
        var indicatorWatchers = [];

        attrs.$observe('scorecardId', function (scorecardId) {
          scorecardId = isNaN(scorecardId) ? scorecardId : Number(scorecardId);
          scope.scorecard = scorecardService.get(scorecardId);

          tagService.getByName(scope.scorecard.name).$promise.then(function (tags) {
            var template = $compile(require('./task-scorecard-summary-view.html'));

            scope.pieData = [
              { value: 0, className: 'good' },
              { value: 0, className: 'medium', },
              { value: 0, className: 'bad' }
            ];
            var mapping = { good: 0, medium: 1, bad: 2 };

            tags.forEach(function(tag){
              if (angular.isArray(tag.tasks)){
                tag.tasks.forEach(function(task){
                  scope.pieData[mapping[task.status]].value++;
                });
              }
            });

            el.addClass('medium');
            el.empty().append(template(scope));

          });
        });

        function updateValues() {
          if (!scope.scorecard || !scope.scorecard.indicators) return;
          var indicators = scope.scorecard.indicators;
          scope.indicatorGroups = scorecardService.getIndicatorGroups(indicators);
        }

        scope.$watchCollection('scorecard.indicators', function () {
          indicatorWatchers.forEach(function (watcher) {
            watcher();
          });

          if (!scope.scorecard || !scope.scorecard.indicators) return;
          indicatorWatchers = [];

          scope.scorecard.indicators.forEach(function (indicator) {
            indicatorWatchers.push(scope.$watch(function () { return indicator.category; }, updateValues));
          });
        });

      }

      return {
        scope: { orgnode: '=?' },
        link: link
      };
  }]
);

