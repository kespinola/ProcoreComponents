'use strict';

var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');
var classNames = require('classnames');

var LocationPicker = React.createClass({
  getInitalState() {
    return{
      value: this.props.value || ['']
    } 
  },
  render() {
    return(
      <div>
        {this.props.editable ? this.renderSelect() : this.renderLabel()}
      </div>
    );
  },
  renderSelect() {
    var classes = classNames('foo', 'bar');
    return(
      <SingleSelect2 
        collection={this.props.data}
        value={this.props.value}
        editable={this.props.editable}
        classes={classes}/>
    );
  },
  renderLabel() {
    return(<label>{this.props.value}</label>);
  }
});

module.exports = LocationPicker;

