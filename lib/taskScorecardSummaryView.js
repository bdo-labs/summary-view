angular.module('taskScorecardSummaryView').directive('taskScorecardSummaryView',
	['$compile', 'scorecardService',
		function ($compile, scorecardService) {
		return {
			scope: {
				'scorecardId': '='
			},
			link: function (scope, el, attrs) {
				scope.scorecard = scorecardService.get(scope.scorecardId);
			},
			template: require('./task-scorecard-summary-view.html')
		};
	}]
);