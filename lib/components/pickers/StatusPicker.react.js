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
        <SingleSelect2 
          collection={options}
          editable={true}/>
      </div>
    )
  }
});

module.exports = StatusPicker;
