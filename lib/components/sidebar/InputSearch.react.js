
var React = require("react");
var cx = require("react/lib/cx");
var _ = require("underscore");
var Input = require("../Input.react");

var InputSearch = React.createClass({
  getInitialState: function() {
    return {
      value: ""
    };
  },

  render: function() {
    return(
    <div className={cx({"picker": true})}>
          <Input update={this._handleUpdate} 
            attribute={this.props.attribute}
            parentIsEditing={true}
            value={this.state.value}
            continuousUpdate={true}
            autoFocus={true}/>
      </div>
    );
  },
  _handleUpdate: function(attribute, value) {
    this.setState({value: value});
    this.props.handler(value);
  }
});

module.exports = InputSearch;
