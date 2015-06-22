var React = require('react');
var SingleSelect2 = require('./SingleSelect2.react');

var StatusPicker = React.createClass({
  getDefaultProps() {
    return {
      collection: [{name: 'Open'}, {name: 'Closed'}] 
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
    status = this.props.data ? this.props.data.status : "Open";
    return(
      <SingleSelect2 
        collection={this.props.collection}
        value={status}/>
    );
  },
  renderLabel() {
    return(<label>{this.props.value}</label>);
  }
});

module.exports = StatusPicker;
