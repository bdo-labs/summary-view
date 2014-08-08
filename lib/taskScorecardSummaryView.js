angular.module('taskScorecardSummaryView').directive('taskScorecardSummaryView',
	['$compile', 'scorecardService', 'tagService',
		function ($compile, scorecardService, tagService) {
		return {
			scope: true,
			link: function (scope, el, attrs) {

				attrs.$observe('scorecardId', function (scorecardId) {
					scope.scorecard = scorecardService.get(
						isNaN(scorecardId) ?
							scorecardId : Number(scorecardId)
					);

					var indicatorWatchers = [];
					scope.$watchCollection(scope.scorecard.indicators,
							function () {
								indicatorWatchers.forEach(function (watcher) {
									watcher();
								});

								indicatorWatchers = [];

								scope.scorecard.indicators.forEach(function (indicator) {
									indicatorWatchers.push(scope.$watch(function(){return indicator.category;}, function () {
										scope.indicatorGroups = scorecardService
											.getIndicatorGroups(scope.scorecard.indicators);
									}));
								});
					});

					tagService.getByName(scope.scorecard.name).$promise.then(
						function (tags) {
							scope.pieData = [
							{
								value: 0,
								className: 'good'
							},
							{
								value: 0,
								className: 'medium',
							},
							{
								value: 0,
								className: 'bad'
							}
							]

							for (var i = 0; i < tags.length; i++) {
								if (Array.isArray(tags[i].tasks)) {
									for (var j = 0; j < tags[i].tasks.length; j++) {
										switch (tags[i].tasks[j].status) {
											case 'good':
												scope.pieData[0].value++;
												break;
											case 'medium':
												scope.pieData[1].value++;
												break;
											case 'bad':
												scope.pieData[2].value++;
												break;
										}
									}
								}
							}
							el.addClass('medium');
							el.empty().append($compile(require('./task-scorecard-summary-view.html'))(scope));
						})
				});
			}
		};
	}]
);
