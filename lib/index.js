
/**
 * Module dependencies.
 */
var angular = require('angular');

require('services');
require('filters');
require('d3-charts');

/**
 * Expose summary-view.
 */
var taskScorecardSummaryView = module.exports = angular.module('taskScorecardSummaryView', [
  'services',
  'filters',
  'd3Charts'
]);

require('./taskScorecardSummaryView.js');

