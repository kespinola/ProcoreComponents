/**
  * ReactComponents
  *@jsx React.DOM
  */
var es5Shim = require('es5-shim');
var React = require('react');
function init() {
  Object.freeze = Object.freeze || function() {};
  window.React = React;
}
module.exports = init;
