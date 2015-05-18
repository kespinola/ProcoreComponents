/** @jsx React.DOM */
var React = require("react");
var Reflux = require("reflux");
var _ = require('underscore');

var Header = React.createClass({
  /*
   * Render Methods
   */
  render: function() {
    return(
      <h1 className="main_panel">{this.props.current}</h1>
      );
  }
});

module.exports = Header;
