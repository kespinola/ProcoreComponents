var React = require("react");
var Router = require('react-router');
//var FlexTableStore = require("../../stores/FlexTableStore")
//var FlexTableActions = require("../../actions/FlexTableActions")
var _ = require("underscore");

var TableRow = React.createClass({
  propTypes: {
    config: React.PropTypes.array,
    object: React.PropTypes.object
  },
  render: function() {
    var configs = this.props.config;
    var tableCells = _.map(configs, function(config) {
      var label = this.props.object[config.key] || "";
      return this.renderCell(config, label);
    }.bind(this));
    return(<tr>{tableCells}</tr>);
  },

  renderCell: function(config, label) {
    var styles;
    if(config.baseWidth){
       styles = {
         width:  config.baseWidth + config.offset
       }
     }
    return (<td style={styles}>{label}</td>);
  }
});

module.exports = TableRow;
