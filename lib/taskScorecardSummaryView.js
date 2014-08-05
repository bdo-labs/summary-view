angular.module('taskScorecardSummaryView').directive('taskScorecardSummaryView',
	['$compile', 'scorecardService',
		function ($compile, scorecardService) {
		return {
			scope: {
				'scorecardId': '='
			},
			link: function (scope, el, attrs) {
				scope.scorecard = scorecardService.get(scope.scorecardId);
				el.addClass('medium');
				el.empty().append($compile(require('./task-scorecard-summary-view.html'))(scope));
			}
		};
	}]
);