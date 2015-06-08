var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');

var StatusPicker = React.createClass({
  getDefaultProps() {
    return {
      options: [{name: 'Open'}, {name: 'Closed'}] 
    }
  },
  getInitalState() {
    return{
      value: this.props.value || ['Open']
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
        collection={this.props.options}
        value={this.props.value}
        editable={this.props.editable}/>
    );
  },
  renderLabel() {
    return(<label>{this.props.value}</label>);
  }
});

module.exports = StatusPicker;
