/** @jsx React.DOM */
var React          = require("react/addons");
var ReactPropTypes = React.PropTypes;
var Select         = require("./Select");
var _              = require("underscore");
var sa             = require("superagent");

var StickyFilter = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
  },
  getInitialState: function() {
    return {selectedFilters: [], lastFilter: {}};
  },
  renderChildren: function() {
    var activeFilter        = this.state.lastFilter;
    var data                = this.props.data;
    var queryer             = this.handleQuery;
    var remover             = this.handleClear;
    var dropdowns           = this.state.selectedFilters.map(function(filter) {
      return (
        <FilterWrapper endpoint={filter.endpoint}>
          <Select
            active      = {filter === activeFilter}
            onChange    = {queryer}
            onRemove    = {remover}
            placeHolder = {filter.value}
            qi          = {filter}
            removable   = {true}
          />
        </FilterWrapper>
      );
    });
    return dropdowns;
  },
  handleQuery: function(e) {
    // TODO once endpoint is made
  },
  handleAddFilter: function(filter) {
    var newFilters = _.compact(this.state.selectedFilters.concat(filter));
    this.setState({selectedFilters: newFilters, lastFilter: filter});
  },
  handleClear: function(e) {
    var newFilters = _.without(this.state.selectedFilters, e);
    this.setState({selectedFilters: newFilters});
  },
  handleClearAll: function(e) {
    this.setState({selectedFilters: []});
  },
  render: function() {
    return(
      <div className="lineup">
        <Select
          data        = {_.difference(this.props.data, this.state.selectedFilters)}
          onChange    = {this.handleAddFilter}
          placeHolder = {"Choose a Filter"}
          removable   = {false}
        />
        {this.renderChildren()}
      </div>
    );
  }
});

var FilterWrapper = React.createClass({
  propTypes: {
    endpoint: React.PropTypes.string.isRequired
  },
  componentWillMount: function() {
    sa
    .get(this.props.endpoint)
    .end(function(error, res) {
      if (error) {
        console.log(error);
        return;
      }

      this.setState({data: JSON.parse(res.text)});
    }.bind(this));
  },
  getInitialState: function() {
    return {data: []}
  },
  render: function() {
    var child = React.addons.cloneWithProps(React.Children.only(this.props.children), {data: this.state.data});
    return(
      <div>
        {child}
      </div>
    )
  }
});

var StickyFilterWrapper = React.createClass({
  render: function() {
    return(
      <FilterWrapper endpoint={this.props.options}>
        <StickyFilter />
      </FilterWrapper>
    );
  }
});

module.exports = StickyFilterWrapper;
