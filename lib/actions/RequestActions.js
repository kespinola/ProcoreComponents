'use strict';
var Reflux = require("reflux");

var RequestActions = {
  create: Reflux.createAction('create'),
  complete: Reflux.createAction('complete'),

  getRequests: Reflux.createAction('getRequests'),
  throwError: Reflux.createAction('throwError')
};

module.exports = RequestActions;
