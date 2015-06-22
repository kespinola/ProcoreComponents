"use strict";

var React = require('react');
var _ = require('underscore');
var UtilityMixin = require('../mixins/UtilityMixin');

var Transformer = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    funk: React.PropTypes.func.isRequired
  },
  mixins: [UtilityMixin],
  getDefaultProps() {
    return {
      data: [],
      className: ""
    };
  },
  blacklistedProps: [
    "funk"
  ],
  buildProps(props) {
    var newProps = _.clone(props);
    newProps.data = this.props.funk(newProps.data);
    return newProps;
  },
  render() {
    var { data, funk } = this.props;
    var children = this._cloneWithProps(this._buildProps());
    return (
      <div className={this.props.className}>
        { children }
      </div>
    );
  }
});

module.exports = Transformer;
