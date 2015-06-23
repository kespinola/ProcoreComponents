'use strict';

var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');
var classNames = require('classnames');

var LocationPicker = React.createClass({
  getInitialState() {
    return{
      value: this.props.value || [''],
      selecting: true
    };
  },
  _handleSelect(item) {
    this.setState({value: item, selecting: false});
    this.props.onSelect(item);
  },
  _onResults(value, collection) {
    this.setState({
      value: value
    });
  },
  _onClick() {
    this.props.onSelect(this.state.value);
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
          onSelect={this._handleSelect}
          onRemove={this._handleRemove}
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
    );
  },
  renderLabel() {
    return(<label>{this.props.value}</label>);
  }
});

module.exports = LocationPicker;

