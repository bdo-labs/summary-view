
/**
 * Module dependencies.
 */
var angular = require('angular');

require('services');
require('filters')

/**
 * Expose summary-view.
 */
var taskScorecardSummaryView = module.exports = angular.module('taskScorecardSummaryView', ['services', 'filters']);

require('./summary-view.js');