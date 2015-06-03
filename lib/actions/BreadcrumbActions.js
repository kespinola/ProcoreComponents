'use strict';
var Reflux = require('reflux');

var BreadcrumbActions = Reflux.createActions([
  "updateBreadcrumbs",
  "resetBreadcrumbs"
]);

module.exports = BreadcrumbActions;
