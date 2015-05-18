"use strict";
var React = require("react");
var ReactPropTypes = React.PropTypes;
var cx = require("react/lib/cx");

var iconClasses = {
  "delete": "fa fa-times",
  "trash": "fa fa-trash-o"
};

var Icon = React.createClass({
  propTypes: {
    icon: ReactPropTypes.string.isRequired,
    disabled: ReactPropTypes.bool,
    onClick: ReactPropTypes.func
  },
  render: function() {
    var className = [
      cx({disabled: this.props.disabled}),
      iconClasses[this.props.icon]
    ].join(" ");

    return (<i ref="iTag" onClick={this.props.onClick} className={className} />);
  }
});

module.exports = Icon;
