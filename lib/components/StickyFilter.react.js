"use strict";

var React = require("react");
var Select = require("./Select");
var Ajaxer = require("./Ajaxer");
var _ = require("underscore");

var StickyFilter = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {selectedFilters: [], lastFilter: {}};
  },
  renderChildren: function() {
    var activeFilter = this.state.lastFilter;
    var data = this.props.data;
    var queryer = this.handleQuery;
    var remover = this.handleClear;
    var dropdowns = this.state.selectedFilters.map(function(filter) {
      return (
        <Ajaxer endpoint={filter.endpoint}>
          <Select
            active= {filter === activeFilter}
            onChange= {queryer}
            onRemove= {remover}
            placeHolder = {filter.value}
            qi= {filter}
            removable= {true}
          />
        </Ajaxer>
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
    return (
      <div className="lineup">
        <Select
          data = {_.difference(this.props.data, this.state.selectedFilters)}
          onChange = {this.handleAddFilter}
          placeHolder = {"Choose a Filter"}
          removable = {false}
        />
        {this.renderChildren()}
      </div>
    );
  }
});

module.exports = StickyFilter;
