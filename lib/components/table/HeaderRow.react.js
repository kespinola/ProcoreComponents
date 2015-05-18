
var React = require("react");
var Reflux = require("reflux");
var cx = require("react/lib/cx");
var _ = require("underscore");
//var FlexTableStore = require("../../stores/FlexTableStore");
//var FlexTableActions = require("../../actions/FlexTableActions");
var HeaderCell = require("./HeaderCell.react");

var HeaderRow = React.createClass({

  render: function() {
    var configs = this.props.config;
    var headerCells = _.map(configs, function(config) {
      return this.renderCell(config);
    }.bind(this));
    return(<tr>{headerCells}</tr>);
  },
  
  renderCell: function(config) {
    return (<HeaderCell config={config}/>);
  }
});

module.exports = HeaderRow;
