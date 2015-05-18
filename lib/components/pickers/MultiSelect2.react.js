/** @jsx React.DOM */
React = require("react");
var ReactPropTypes = React.PropTypes;
var AutocompleteSelect = require("./AutocompleteSelect.react");
var MultiTokens = require("./MultiTokens.react");
var cx = require("react/lib/cx");
var _ = require("underscore");

var MultiSelect2 = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    selectedTokens: React.PropTypes.array,
    onChange: React.PropTypes.func,
    getLabel: React.PropTypes.func,
    searchField: React.PropTypes.string,
    filterSelected: React.PropTypes.bool
  },
  getInitialState: function() {
    return {
      multiSelect: true,
      selecting: false
    };
  },
  render: function() {
    return (
      <div>
        <div className={cx({
          "multiselect2": true,
          "editable": this.props.editable,
          "selecting": (this.props.editable && this.state.selecting)
        })}>
          {this.renderTokens()}
          {this.renderAutocompleteSelect()}
        </div>
        {this.renderCloser()}
      </div>
    );
  },
  _getFilteredOptions: function() {
    var selectOptions = this.props.options || [];
    var selectedTokens = this.props.selectedTokens || [];
    selectOptions = _.filter(selectOptions, function(option) {
      return undefined === _.find(selectedTokens, function(token) {
        return _.isEqual(token, option);
      });
    }.bind(this));
    return selectOptions;
  },
  renderAutocompleteSelect: function() {
    var selectOptions = this._getFilteredOptions();
    return (!this.props.editable) ? null : (
      <AutocompleteSelect
        options={selectOptions}
        placeholder={"Select an option..."}
        multiSelect={this.props.multiSelect}
        searchField={this.props.searchField}
        onFilter={this._onFilter}
        onSelect={this._onSelect}
        onBlur={this._blur}
        onSpecialKey={this._onSpecialKey}
        getLabel={this.props.getLabel}
        optionsAlwaysVisible={false}/>
    );
  },
  renderCloser: function() {
    return !this.state.selecting ? null : (
      <div onClick={this._blur} className="pickerCloser"/>
    );
  },
  renderTokens: function() {
    var tokens = this.props.selectedTokens || [];
    return (<MultiTokens
      icon={"fa fa-times"}
      tokens={tokens}
      onClick={this.props.onRemove}
      selecting={this.state.selecting}/>
    );
  },
  _blur: function(){
    this.setState({selecting: false});
  },
  _toggleSelect: function() {
    this.setState({selecting: !this.state.selecting});
  },
  _onSelect: function(item) {
    this.setState({selecting: false, multiSelect: true});
    this.props.onSelect(item, this.state.multiSelect);
  },
  _onSpecialKey: function(key, value) {
    var func = this._specialKeys[key];
    func && func.call(this, value);
  },
  _specialKeys: {
    "Tab": function() {
      event.preventDefault();
      this._blur();
    },
    "Escape": function() {this._blur();}
  }
});

module.exports = MultiSelect2;
