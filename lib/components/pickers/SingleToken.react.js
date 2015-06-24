'use strict';
var React = require('react');
var ReactPropTypes = React.PropTypes;
var Label = require('../Label.react');
var Icon = require('../Icon.react');
var If = require('../If.react');
var Input =  require('../Input.react')

var SingleToken = React.createClass({
  propTypes: {
    token: ReactPropTypes.object,
    editable: ReactPropTypes.bool,
    selecting: ReactPropTypes.bool,
    parseLabel: ReactPropTypes.func,
    onClick: ReactPropTypes.func.isRequired
  },
  render() {
    var item = this.props.token || {};
    if (Object.keys(item).length === 0) return null;
    return (
      <div className='pct-picker-selected-token'>
        <span className="padding-left">{this.renderLabel(item)}</span>
        <aside className="snugfit padding-right">{this.renderIcon(item)}</aside>
      </div>
    );
  },
  renderLabel(item) {
    return (
      <Label item={item} parseLabel={this.props.parseLabel}/>
    );
  },
  _click(item) {
    this.props.onClick(item);
  },
  renderIcon(item) {
    if (Object.keys(item).length == 0) return null;
    return( 
      <Icon onClick={this.props.onRemove} icon='delete'/>
    );
  }
});

module.exports = SingleToken;
