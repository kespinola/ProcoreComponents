'use strict';
var React = require('react');
var ReactPropTypes = React.PropTypes;
var Label = require('../Label.react');
var Icon = require('../Icon.react');

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
    return (
      <div className='singleToken' onClick={this._click.bind(null, item)}>
        {this.renderLabel(item)}
      </div>
    );
  },
  renderLabel(item) {
    return (
      <div>
        <Label item={item} parseLabel={this.props.parseLabel}/>
        <Icon onClick={this.props.onRemove} icon='delete'/>
      </div>
    );
  },
  _click(item) {
    this.props.onClick(item);
  }
});

module.exports = SingleToken;
