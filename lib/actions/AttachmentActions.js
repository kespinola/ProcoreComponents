'use strict';
var DefaultActions = require("ProcoreComponents/actions/DefaultActions");
var merge = require('react/lib/merge');
var Reflux = require("reflux");

var generatedActions = {};

function AttachmentActionFactory(store) {
  if(generatedActions[store.resourceType]) return generatedActions[store.resourceType];
  var AttachmentActions = merge(DefaultActions(), {
  });
  return AttachmentActions;
}


module.exports = AttachmentActionFactory;
