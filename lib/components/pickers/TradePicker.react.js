var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');

var TradePicker = React.createClass({
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
    return(
      <SingleSelect2 
        collection={this.props.data}
        value={this.props.value}
        editable={this.props.editable}/>
    );
  },
  renderLabel() {
    return(<label>{this.props.value}</label>);
  }
});

module.exports = TradePicker;

