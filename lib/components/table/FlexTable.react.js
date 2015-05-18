
var React = require("react");
var Reflux = require("reflux");
var cx = require("react/lib/cx");
//var FlexTableStore = require("../../stores/FlexTableStore")
//var FlexTableActions = require("../../actions/FlexTableActions")
var FlexTableHeader = require("./FlexTableHeader.react");
var HeaderRow = require("./HeaderRow.react");
var FlexTableFooter = require("./FlexTableFooter.react");
var TableRow = require("./TableRow.react");
var cloneWithProps = require("react/lib/cloneWithProps");
var _ = require("underscore");

var columnDefinition =  [
      { label: "First Name",
        position: 1,
        key: "firstname",
        offset: 0 },

      { label: "Middle Name",
        position: 2,
        key: "midname",
        offset: 0 },

      { label: "Surname",
        position: 3,
        key: "surname",
        offset: 0 },

      { label: "Suffix",
        position: 4,
        key: "suffix",
        offset: 0 },

      { label: "Title",
        position: 5,
        key: "title",
        offset: 0 },

      { label: "Prime Aspiration",
        position: 7,
        key: "dreams",
        offset: 0 },

      { label: "Songs",
        position: 8,
        key: "songs",
        offset: 0 },

      { label: "Grammys",
        position: 9,
        key: "grammys",
        offset: 0 },

      { label: "Followers",
        position: 10,
        key: "followers",
        offset: 0 },
    ]; 

var FlexTable = React.createClass({
  render: function() {
    var styles = {
      width:  this.props.tableWidth
    };
    return(
      <table style={this.props.style} className={cx({
          "flex-table": true,
          "item_list": true})}>
        <thead>
          <HeaderRow config={this.props.config}/>
        </thead>
        <tbody>
          { this.renderRows() }
        </tbody>
        <tfoot>
          <HeaderRow config={this.props.config}/>
        </tfoot>
      </table>
    );
  },
  renderRows: function() {
    return _.map(this.props.collection, function(object){
      return <TableRow config={this.props.config} object={object}/>;
    }.bind(this));
  }
});

module.exports = FlexTable;
