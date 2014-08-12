angular.module('taskScorecardSummaryView').directive('taskScorecardSummaryView',
	['$compile', 'scorecardService', 'tagService', 'indicatorService', 'organizationalNodeService',
		function ($compile, scorecardService, tagService, indicatorService, orgNodeService) {
		return {
			scope: {
				orgnode: '=?'
			},
			link: function (scope, el, attrs) {
				var indicatorWatchers = [];

				attrs.$observe('scorecardId', function (scorecardId) {
					scope.scorecard = scorecardService.get(
						isNaN(scorecardId) ?
							scorecardId : Number(scorecardId)
					);

					tagService.getByName(scope.scorecard.name).$promise.then(function (tags) {
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
							];

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
					});
				});

				function updateValues() {
					if (!scope.scorecard || !scope.scorecard.indicators) return;

					scope.indicatorGroups = scorecardService
						.getIndicatorGroups(scope.scorecard.indicators);
				}


				scope.$watchCollection('scorecard.indicators', function () {
					indicatorWatchers.forEach(function (watcher) {
						watcher();
					});

					if (!scope.scorecard || !scope.scorecard.indicators) return;
					indicatorWatchers = [];

					scope.scorecard.indicators.forEach(function (indicator) {
						indicatorWatchers.push(scope.$watch(function () {
								return indicator.category;
							}, updateValues
						));
					});
				});

			}
		};
	}]
);
