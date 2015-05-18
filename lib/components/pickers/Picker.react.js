/** @jsx React.DOM */
var React = require("react");
var ReactPropTypes = React.PropTypes;
var cx = require("react/lib/cx");
var _ = require("underscore");


var Picker = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    filterSelected: React.PropTypes.bool,
    selectedTokens: React.PropTypes.array,
    editable: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    onCreate: React.PropTypes.func,
    quickAdd: React.PropTypes.bool,
    searchField: React.PropTypes.string,
    getLabel: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      selecting: false,
      query: ""
    };
  },
  render: function() {
    return !this.props.editable ? null : (
      <div className={cx({"picker": true, "selecting": this.state.selecting})}>
        <div className="token-selector">
          <div> { this.renderInput() } </div>
          <div> { this.renderAdder() } </div>
        </div>
        <ul>
          {this.renderOptions()}
        </ul>
      </div>
    );
  },
  renderInput: function() {
    return (
        <input 
          placeholder={this.props.placeholder} 
          onChange={this._onChange}
          onFocus={this._focus}
          onBlur={this._blur}
          value={this.props.templateName}/>
      );
  },
  renderAdder: function() {
    return !this.props.quickAdd ? null : (
      <button
      className="no-style-btn mock-bttn-small mock-bttn"
      onClick={this._onCreate}>
      <i className="fa fa-plus"/>
      </button>
    );
  },
  renderOptions: function() {
    var selectOptions = this.props.options || [];
    var selected = this.props.selectedTokens || [];
    if(this.props.filterSelected){
      selectOptions = _.difference(selectOptions, selected);
    }
    var query = this.state.query;
    selectOptions = _.filter (selectOptions, function(option) {
      return this._nameMatchs(option, query);
    }.bind(this));

    var options = _.map(selectOptions, function(item) {
      return (
        <li onMouseDown={this._onSelect.bind(null, item)}>
      {this._getLabel(item)}
        </li>
      );
    }.bind(this));

    if(!options.length) options = [];

    return options;
  },
  _getLabel: function(item) {
    return this.props.getLabel ? this.props.getLabel(item) : item.name
  },
  _nameMatchs: function(item, query) {
    var searchField = this.props.searchField || "name";
    return item[searchField] && item[searchField].toString().toLowerCase().indexOf(query.toLowerCase()) > -1;
  },
  _onSelect: function(item) {
    this._blur();
    this.props.onChange(item);
  },
  _focus: function(){
    this.setState({selecting: true});
  },
  _blur: function(){
    this.setState({selecting: false});
  },
  _onChange: function(event) {
    var queryString = event.target.value;
    this.setState( { query: queryString } );
    this.props.onInputChange && this.props.onInputChange(queryString);
  },
  _onCreate: function(event) {
    var object = {name: this.state.query};
    this.props.onCreate && this.props.onCreate(object);
  }

});

module.exports = Picker;
