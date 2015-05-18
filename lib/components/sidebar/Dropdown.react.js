
var React = require("react");
var cx = require("react/lib/cx");
var _ = require("underscore");

var DropdownFilter = React.createClass({
  getDefaultProps: function() {
    return {
      defaultOption: { name: "All" }
    }
  },
  render: function() {
    var options = _.map(this.props.options, function(option){
      return(<option>{ option.name || option }</option>);
    });
    options.unshift(<option>{ this.props.defaultOption }</option>);
    return(
      <div className={cx({"picker": true})}>
          <select onChange={this._handleUpdate}>
            { options }
          </select>
      </div>
    )
  },
  _handleUpdate: function(e) {
    var value = (e.target.value === "All") ? null : e.target.value;
    var config = {
      key: this.props.attribute,
      condition: value,
      type: this.props.type
    };
    this.props.handler(config);
  }
});

module.exports = DropdownFilter;
