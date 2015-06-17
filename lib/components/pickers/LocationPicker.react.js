'use strict';

var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');
var classNames = require('classnames');

var LocationPicker = React.createClass({
  getInitialState() {
    return{
      value: this.props.value || [''],
      selecting: true
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
    return(
      <div className='inline-block'>
        <SingleSelect2 
          collection={this.props.data}
          value={this.props.value}
          editable={this.props.editable}
          onSelect={this._toggleState}
          onRemove={this._toggleState}
          />
        {this.state.selecting ? this.renderButton() : null}
      </div>
    );
  },
  _toggleState(item) {
    this.setState({selecting: !this.state.selecting});
  },
  renderButton() {
    return (
      <button className='no-style-btn mock-bttn padding'>
          <i className='fa fa-plus'/>
      </button>
      )
  },
  renderLabel() {
    return(<label>{this.props.value}</label>);
  }
});

module.exports = LocationPicker;

