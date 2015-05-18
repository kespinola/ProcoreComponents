/** @jsx React.DOM */
var React = require("react");
var ReactPropTypes = React.PropTypes;
var _ = require("underscore");
var cx = require("react/lib/cx");

var PickList = React.createClass({
  propTypes: {
    items: ReactPropTypes.array.isRequired,
    editable: ReactPropTypes.bool,
    getLabel: ReactPropTypes.func,
    onRemove: ReactPropTypes.func.isRequired
  },
  render: function() {
    var listItems = this.props.items || {};
    var items = _.map(listItems, function(item) {
      return (
        <li>
          <div>{this._getLabel(item)}</div>
          {this.renderDeleteButton(item)}
        </li>
      );
    }.bind(this));

    return (
      <ul className={cx({"pickList": true, "editable": this.props.editable})}>
        {items}
      </ul>
    );
  },
  renderDeleteButton: function(item) {
    return !this.props.editable ? null : (
      <div className="button" onClick={this._remove.bind(null, item)}>
        <i className="fa fa-times"/>
      </div>
    )
  },
  _getLabel: function(item) {
    return this.props.getLabel ? this.props.getLabel(item) : item.name
  },
  _remove: function(item) {
    this.props.onRemove(item);
  }
});

module.exports = PickList;
