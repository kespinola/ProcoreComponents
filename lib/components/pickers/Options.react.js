'use strict';

var React = require('react');
var _ = require('underscore');
var cx = require('react/lib/cx');

var Options = React.createClass({
  propTypes: {
    collection: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func,
    getLabel: React.PropTypes.func
  },

  render: function() {
    return (
      <div className='pct-picker-option-list'>
        <ul>{this.renderOptions()}</ul>
      </div>
    );
  },
  renderOptions: function() {
    var selectOptions = this.props.collection || [];
    var collection = [];
    if (!collection.length) { collection = <li>Empty List.</li>; }
    collection = _.map(selectOptions, function(item, itemIndex) {
      return item.name ? this.renderOption(item, itemIndex) : null 
    }, this);
    return collection;
  },
  renderOption: function(item, itemIndex) {
    var className = cx({'hover': this.props.currentPickIndex === itemIndex});
    return (
      <li onMouseEnter={this.props.onHover.bind(null, item, itemIndex)}
          onMouseDown={this.props.onSelect.bind(null, item)}>
        {this._getLabel(item)}
      </li>
    );
  },
  _getLabel: function(item) {
    return this.props.getLabel ? this.props.getLabel(item) : item.name;
  },
});

module.exports = Options;
