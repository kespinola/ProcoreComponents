"use strict";

var React = require("react");
var AutocompleteSelect = require("./AutocompleteSelect.react");
var SingleToken = require("./SingleToken.react");
var cx = require("react/lib/cx");

var SingleSelect2 = React.createClass({
  propTypes: {
    collection: React.PropTypes.array.isRequired,
    selectedTokens: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    createOption: React.PropTypes.array,
    onChange: React.PropTypes.func,
    getLabel: React.PropTypes.func,
    searchField: React.PropTypes.string,
    editable: React.PropTypes.bool.isRequired,
    filterSelected: React.PropTypes.bool
  },
  getInitialState: function() {
    return {
      selecting: false,
      selectedTokens: this.props.selectedTokens
    };
  },
  componentWillReceiveProps(nextProps) {
    if ( this.props.selectedTokens !== nextProps.selectedTokens ) {
      this.setState({ selectedTokens: nextProps.selectedTokens });
    }
  },
  render: function() {
    return (
      <div>
        <div className={cx({
          "singleselect2": true,
          "editable": this.props.editable,
          "selecting": (this.props.editable && this.state.selecting)
        })}>
          {this.renderToken()}
          {this.renderAutocompleteSelect()}
        </div>
        {this.renderCloser()}
      </div>
    );
  },
  renderAutocompleteSelect: function() {
    return (!this.props.editable || !this.state.selecting) ? null : (
      <AutocompleteSelect
        filterSelected={true}
        collection={this.props.collection}
        createOption={this.props.createOption}
        searchField={this.props.searchField}
        onFilter={this._onFilter}
        onSelect={this._onSelect}
        onBlur={this._blur}
        onCreate={this.props.onCreate}
        onSpecialKey={this._onSpecialKey}
        getLabel={this.props.getLabel}
        placeholder={this.props.placeholder}
        optionsAlwaysVisible={true}/>
    );
  },
  renderCloser: function() {
    return !this.state.selecting ? null : (
      <div onClick={this._blur} className="pickerCloser"/>
    );
  },
  renderToken: function() {
    var tokens = this.state.selectedTokens;
    var token = (tokens && tokens[0]) || {};
    var icon = (this.state.selecting) ? "fa fa-caret-up" : "fa fa-caret-down";
    return (
      <SingleToken
        token={token}
        getLabel={this.props.getTokenLabel}
        onClick={this._toggleSelect}
        icon={icon}
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
    this.setState({
      selecting: false,
      selectedTokens: [item]
    });
    this.props.onSelect(item);
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

module.exports = SingleSelect2;