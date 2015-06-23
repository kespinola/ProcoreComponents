'use strict';

var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');
var _ = require('underscore');

var SpecSectionPicker = React.createClass({
  getInitialState() {
    return{
      value: this.props.value || [''],
      secondPicker: false
    };
  },
  _onSelect(item) {
    console.log('onSelect');
  },
  _getLabel(item) {
    if (Object.keys(item).length === 0) return null;
    return (item.number + "-" + item.description);
  },
  _togglePickers() {
    this.setState({
      secondPicker: !this.state.secondPicker
    });
  },
  render() {
    return(
      <div>
        {this.props.editable ? this.renderSelect() : this.renderLabels()}
      </div>
    );
  },
  renderSelect() {
    return(
      <div className='inline-block padded-children'>
        <SingleSelect2 
          collection={this.props.data}
          value={this.props.value}
          getLabel={this._getLabel}
          onSelect={this._onSelect}
          editable={this.props.editable}
        />
      </div>
    );
  },
  renderLabels() {
    var collection = this.props.data;
    var specs = _.each(collection, function(spec) { 
      return <label>{this._getLabel(spec)}</label> 
    }.bind(this));
    return specs;
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

