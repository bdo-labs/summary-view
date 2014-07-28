angular.module('summary-view').directive('summaryView',
	['$compile', 'scorecardService', function ($compile, scorecardService) {
		return {
			scope: {
				'scorecardId': '='
			},
			link: function (scope, el, attrs) {
				scope.scorecard = scorecardService.get(scope.scorecardId);
				el.addClass('medium');
				var elements = $compile(require('./summary-view.html'))(scope);
				el.empty().append(elements);
			}
		};
	}]
);