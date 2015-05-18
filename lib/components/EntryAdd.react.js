/** @jsx React.DOM */
var React = require("react");

var ItemAdd = React.createClass({
  render: function() {
    return (
      <a className="add-new"
        onClick={this._addItem}>{ this.props.placeholder }</a>
    );
  },
  _addItem: function() {
    this.props.onAdd();
  }
});

module.exports = ItemAdd;
