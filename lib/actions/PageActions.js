'use strict';
var DefaultActions = require("./DefaultActions");
var _ = require('underscore');
var Reflux = require("reflux");

var PageActions = _.extend(DefaultActions(), {
  setActivePage: Reflux.createAction('setActivePage'),
  setPolicyMap: Reflux.createAction('setPolicyMap'),
  setConfig: Reflux.createAction('setConfig'),
  setCurrentObject: Reflux.createAction('setCurrentObject'),
  loadPolicies: Reflux.createAction('loadPolicies')
});

module.exports = PageActions;
