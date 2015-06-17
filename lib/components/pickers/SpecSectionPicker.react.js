'use strict';

var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');

var SpecSectionPicker = React.createClass({
  getInitialState() {
    return{
      value: this.props.value || [''],
      secondPicker: false
    };
  },
  _getLabel(object) {
    return object.description;
  },
  _onSelect(item) {
    console.log('onSelect');
  },
  _togglePickers() {
    this.setState({
      secondPicker: !this.state.secondPicker
    });
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
          getLabel={this._getLabel}
          onSelect={this._onSelect}
          editable={this.props.editable}
        />
        {this.renderOtherPicker()}
        <button 
          className='no-style-btn mock-bttn-small mock-bttn' 
          onClick={this._togglePickers}>
          <i className='fa fa-plus'/>
        </button>
      </div>
    );
  },
  renderLabel() {
    return(<label>{this.props.value}</label>);
  },
  renderOtherPicker() {
    if(this.state.secondPicker) { 
      return(
        <div>
          <SingleSelect2 
              collection={this.props.data}
              value={this.props.value}
              getLabel={this._getLabel}
              onSelect={this._onSelect}
              editable={this.props.editable}/>
        </div>
      );
    } else return ('');
  }
});

module.exports = SpecSectionPicker;

