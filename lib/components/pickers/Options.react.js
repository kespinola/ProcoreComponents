"use strict";
/** @jsx React.DOM */
var React = require("react");
var _ = require("underscore");
var cx = require("react/lib/cx");

var Options = React.createClass({
  propTypes: {
    collection: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func,
    getLabel: React.PropTypes.func
  },

  render: function() {
    return (<ul>{this.renderOptions()}</ul>);
  },
  renderOptions: function() {
    var selectOptions = this.props.collection || [];
    var collection = [];
    if (!collection.length) { collection = <li>Empty List.</li>; }
    collection = _.map(selectOptions, function(item, itemIndex) {
      return this.renderOption(item, itemIndex);
    }, this);
    return collection;
  },
  renderOption: function(item, itemIndex) {
    var className = cx({"hover": this.props.currentPickIndex === itemIndex});
    return (
      <li onMouseEnter={this.props.onHover.bind(null, item, itemIndex)}
          onMouseDown={this.props.onSelect.bind(null, item)}
          className={className}>
        {this._getLabel(item)}
      </li>
    );
  },
  _getLabel: function(item) {
    return this.props.getLabel ? this.props.getLabel(item) : item.name;
  },
});

module.exports = Options;
