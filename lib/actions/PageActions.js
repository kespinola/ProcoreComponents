'use strict';
var DefaultActions = require("ProcoreComponents/actions/DefaultActions");
var merge = require("react/lib/merge");
var Reflux = require("reflux");

var PageActions = merge(DefaultActions(), {
  setActivePage: Reflux.createAction('setActivePage'),
  setPolicyMap: Reflux.createAction('setPolicyMap'),
  setConfig: Reflux.createAction('setConfig'),
  setCurrentObject: Reflux.createAction('setCurrentObject'),
  loadPolicies: Reflux.createAction('loadPolicies')
});

module.exports = PageActions;
