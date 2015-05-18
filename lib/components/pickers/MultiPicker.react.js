/** @jsx React.DOM */
var React = require("react");
var ReactPropTypes = React.PropTypes;
var Picker = require("./Picker.react");
var cx = require("react/lib/cx");
var _ = require("underscore");

var MultiPicker = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    filterSelected: React.PropTypes.bool,
    selectedTokens: React.PropTypes.array,
    editable: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    onCreate: React.PropTypes.func,
    quickAdd: React.PropTypes.bool,
    fieldPickers: React.PropTypes.object.isRequired
  },
  render: function() {
    var lastKey = _.last(_.keys(this.props.fieldPickers));
    var pickers = _.map(this.props.fieldPickers, function(field, fieldKey) {
      return (<Picker
        options={this.props.options}
        filterSelected={this.props.filterSelected}
        searchField={fieldKey}
        getLabel={this.props.getLabel}
        selectedTokens={this.props.selectedTokens}
        editable={this.props.editable}
        onChange={this.props.onChange}
        onInputChange={this._onInputChange(fieldKey)}
        onCreate={this._onCreate}
        quickAdd={this.props.quickAdd && (fieldKey === lastKey) }/>);
    }.bind(this));
    return ( <div> {pickers} </div> );
  },
  _onCreate: function () {
    var newToken = {};
    _.each(this.props.fieldPickers, function(field, fieldKey) {
      newToken[fieldKey] = this.state[fieldKey];
    }.bind(this));
    this.props.onCreate(newToken);
  },
  _onInputChange: function(fieldKey) {
    return function(value) {
      var newState = {};
      newState[fieldKey] = value;
      this.setState(newState)
    }.bind(this);
  }

});

module.exports = MultiPicker;
