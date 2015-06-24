'use strict';

var React = require('react');
var _ = require('underscore');

var Autocomplete = React.createClass({
  propTypes: {
    collection: React.PropTypes.array.isRequired,
    searchField: React.PropTypes.string,
    onResults: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      selecting: false,
      query: ''
    };
  },
  render: function() {
    return (
      <input 
        ref='input'
        placeholder={this.props.placeholder}
        onChange={this._onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        autoFocus={this.props.autoFocus}
        onKeyDown={this._onSpecialKeys}
        className="pct-picker-input"/>
    );
  },
  _nameMatches: function(item, query) {
    var searchField = this.props.searchField || 'name';
    var field = item[searchField];
    return field && field.toString().toLowerCase().indexOf(query.toLowerCase()) > -1;
  },
  getFilteredOptions: function(query) {
    var selectOptions = this.props.collection || [];
    return _.filter (selectOptions, function(option) {
      return this._nameMatches(option, query);
    }, this);
  },
  _onChange: function(event) {
    var queryString = event.target.value;
    this.setState( { query: queryString } );
    var filteredOptions = this.getFilteredOptions(queryString);
    this.props.onResults && this.props.onResults(filteredOptions, queryString);
  },
  _onSpecialKeys: function(e) {
    e.key && this.props.onSpecialKey && this.props.onSpecialKey(e.key, this.state.query);
  },
  blur: function() {
    this.refs.input.getDOMNode().blur();
  }
});

module.exports = Autocomplete;
