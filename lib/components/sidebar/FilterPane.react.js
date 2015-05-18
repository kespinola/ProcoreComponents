
var React = require("react");
var _ = require("underscore");

var Pickers = {
  Default: require("./Dropdown.react.js"),
  Input: require("./InputSearch.react.js"),
  ViewList: require("./ViewList.react.js")
};

var FilterPane = React.createClass({
  render: function() {
   var filters = this.props.filters;
   var pickers = _.map(filters, function(filter) {
      Picked = Pickers[filter.picker];
      return (
        <li>
          <label>
            {filter.label}
          </label>
          <Picked handler={filter.handler}
            attribute={filter.attribute}
            type = {filter.type}
            options={filter.options} />
        </li>
        );
    }.bind(this));
    return(
      <div>
        <div className="sidebar_panel_title">{this.props.title}</div>
        <div className="sidebar_panel_content">
          <ul className="contain-list">
            { pickers }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = FilterPane;
