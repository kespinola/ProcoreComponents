'use strict';

var React = require('react');
var UtilityMixin = require('../mixins/UtilityMixin');
var _ = require('underscore');

var allowedContainers = ['div', 'span', 'h1', 'section'];
var Container = React.createClass({
  propTypes: {
    /**
     * Optional div classname
     */
    className: React.PropTypes.string,
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
    "element"
  ],
  render() {
    var {element} = this.props || 'div';
    var Node = _.contains(allowedContainers, element) ? element : 'div';

    return (
      <Node
        className={this.props.className}
        style={this.props.style}>
        {this._cloneWithProps(this._buildProps())}
      </Node>
    );
  }
});

module.exports = Container;
