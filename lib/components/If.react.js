"use strict";

var React = require('react');
var UtilityMixin = require('../mixins/UtilityMixin');

/**
 *  the If component conditionally renders its children
 */
var If = React.createClass({
  propTypes: {
    /**
     * Optional div classname
     */
    className: React.PropTypes.string,
    /**`
     * Condition to check for
     */
    condition: React.PropTypes.bool.isRequired,
    /**
     * Optional div styles
     */
    style: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      className: "",
      style: {}
    };
  },
  mixins: [
    UtilityMixin
  ],
  blacklistedProps: [
    "condition"
  ],
  render() {
    return !this.props.condition ? null : (
      <div
        className={this.props.className}
        style={this.props.style}>
        {this._cloneWithProps(this._buildProps())}
      </div>
    );
  }
});

module.exports = If;
