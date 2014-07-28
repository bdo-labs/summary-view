
/**
 * Module dependencies.
 */
var angular = require('angular');

require('services');
require('filters')

/**
 * Expose summary-view.
 */
var summaryView = module.exports = angular.module('summary-view', ['services', 'filters']);

require('./summary-view.js');