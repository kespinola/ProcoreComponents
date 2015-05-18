"use strict";
/** @jsx React.DOM */
var React = require("react");
var Autocomplete = require("./Autocomplete.react");
var Options = require("./Options.react");

var AutocompleteSelect = React.createClass({
  propTypes: {
    collection: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    createOption: React.PropTypes.array,
    getLabel: React.PropTypes.func,
    searchField: React.PropTypes.string,
    optionsAlwaysVisible: React.PropTypes.bool,
    onBlur: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      collection: this._buildOptions(this.props.collection),
      selecting: !!this.props.optionsAlwaysVisible,
      value: "",
      currentPickIndex: 0
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({collection: this._buildOptions(nextProps.collection)});
  },
  render: function() {
    return (
      <div className="autocompleteSelect">
        {this.renderAutocomplete()}
        {this.renderOptions()}
      </div>
    );
  },
  renderAutocomplete: function() {
    return (<Autocomplete
      ref="autocomplete"
      collection={this.props.collection}
      searchField={this.props.searchField}
      onResults={this._onResults}
      onFilter={this._onFilter}
      autoFocus={!!this.props.optionsAlwaysVisible}
      onFocus={this._toggleState.bind(null, true)}
      onBlur={this._toggleState.bind(null, false)}
      query={this.props.query}
      placeholder={this.props.placeholder}
      onSpecialKey={this._onSpecialKey}/>
    );
  },
  renderOptions: function() {
    return !this.state.selecting ? null : (
      <Options
        collection={this.state.collection}
        onSelect={this._onSelect}
        getLabel={this.props.getLabel}
        currentPickIndex={this.state.currentPickIndex}
        onHover={this._clearPickIndex}/>
    );
  },
  getPreviousItem: function() {
    var collection = this.state.collection;
    var previousIndex = this.state.currentPickIndex;
    previousIndex = previousIndex === 0 ? collection.length - 1 : previousIndex - 1;
    var previousItem = collection[previousIndex];
    this.setState({currentPickIndex: previousIndex});
    return previousItem;
  },
  getInputValue: function(value){
    return value;
  },
  getNextItem: function() {
    var collection = this.state.collection;
    var nextIndex = this.state.currentPickIndex;
    nextIndex = nextIndex + 1 < collection.length ? nextIndex + 1 : 0;
    var nextItem = collection[nextIndex];
    this.setState({currentPickIndex: nextIndex});
    return nextItem;
  },
  _buildOptions: function(baseOptions, value){
    var createOption = (this.props.createOption) ? {name: this.props.createOption.name} : null;
    var newOptions = [];
    if (value == null) value = "";
    if (createOption && value != "") {
      createOption = {name: createOption.name + " (" + value + ")", label: value, new: true};
      newOptions = newOptions.concat(createOption);
    }
    else if (value === "") { newOptions = this._addBlankOption(newOptions); }
    return newOptions.concat(baseOptions);
  },
  _addBlankOption: function(collection){
    var blankOption = [{ id: null, name: ""}];
    if (this.props.multiSelect) { return collection; }
    return blankOption.concat(collection);
  },
  _toggleState: function(value) {
    if (this.props.optionsAlwaysVisible && !value) {
      this.props.onBlur();
    }
    this.setState({selecting: value});
  },
  _onResults: function(collection, value) {
    this.setState({collection: this._buildOptions(collection, value)});
  },
  _onSpecialKey: function(key, value) {
    var func = this._specialKeys[key];
    if (func) { func.call(this, value); }
    this.props.onSpecialKey(key,value);
  },
  _onSelect: function(item){
    if (item && item.new === true) {
      item = { name: item.label };
      this.props.onCreate(item);
    }
    this.setState({selecting: false});
    this.refs.autocomplete.blur();
    if (item) { this.props.onSelect(item); }
    else { this.props.onBlur(); }
  },
  _clearPickIndex: function(item, itemIndex){
    this.setState({currentPickIndex: itemIndex});
  },
  _specialKeys: {
    "ArrowLeft": function() {
      this.setState({selection: this.getPreviousItem()});
    },
    "ArrowRight": function() {
      this.setState({selection: this.getNextItem()});
    },
    "ArrowDown": function() {
      this.setState({selection: this.getNextItem()});
    },
    "ArrowUp": function() {
      this.setState({selection: this.getPreviousItem()});
    },
    "Enter": function() {
      var selection;
      if (this.state.selection == null) {
        selection = this.state.collection[this.state.currentPickIndex];
      } else {
        selection = this.state.selection;
      }
      this._onSelect(selection);
      this.setState({selection: null});
    }
  }
});

module.exports = AutocompleteSelect;
