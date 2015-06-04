"use strict";

var React = require('react');
var UtilityMixin = require('../mixins/UtilityMixin');

var Transformer = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    funk: React.PropTypes.func.isRequired
  },
  mixins: [UtilityMixin],
  getDefaultProps() {
    return {
      data: []
    };
  },
  render() {
    var { data, funk } = this.props;
    var children = this._cloneWithProps({data: funk(data)});
    return (
      <div>
        { children }
      </div>
    );
  }
});

module.exports = Transformer;
