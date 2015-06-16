'use strict';
var React = require('react');
var ReactPropTypes = React.PropTypes;

var SingleToken = React.createClass({
  propTypes: {
    item: ReactPropTypes.object,
    parseLabel: ReactPropTypes.func,
  },
  getDefaultProps () {
    return {
      item: 'hello world'
    };
  },
  render() {
    var item = this.props.item || {};
    return (
      <div>
        <span ref='title'>{this.parseLabel(item)}</span>
      </div>
    );
  },
  parseLabel(item) {
    return this.props.parseLabel ? this.props.parseLabel(item) : this.getName(item);
  },
  getName(item) {
    return ({
      name: item.name,
      value: item.value,
      raw: item.raw
    });
  }
});

module.exports = SingleToken;
