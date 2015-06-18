'use strict';

var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');
var classNames = require('classnames');

var LocationPicker = React.createClass({
  getInitialState() {
    return{
      value: this.props.value || [''],
      newLocation: '',
      selecting: true
    } 
  },
  _toggleState(item) {
    this.setState({selecting: !this.state.selecting});
  },
  _onResults(value, colletion) {
    this.setState({
      newLocation: value
    });
  },
  _onClick() {
    var locations = this.props.data;
    var exists = false;
    locations.map(function(l) {  
      if(this.state.newLocation === l.name) exists = true; 
    }.bind(this));
    if(!exists) { 
      this.props.handleChange('location', this.state.newLocation); 
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
          ref='select'
          value={this.props.value}
          editable={this.props.editable}
          onSelect={this._toggleState}
          onRemove={this._toggleState}
          onResults={this._onResults}
          />
        {this.state.selecting ? this.renderButton() : null}
      </div>
    );
  },
  renderButton() {
    return (
      <button 
        className='no-style-btn mock-bttn padding'
        onClick={this._onClick}>
        <i className='fa fa-plus'/>
      </button>
    )
  },
  renderLabel() {
    return(<label>{this.props.value}</label>);
  }
});

module.exports = LocationPicker;

