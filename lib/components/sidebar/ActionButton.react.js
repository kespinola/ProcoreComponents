
var React = require("react");
var cx = require("react/lib/cx");
var Router = require('react-router');

var ActionButton = React.createClass({
  mixins: [
    Router.Navigation
  ],
  render: function() {
    if(this.props.hidden) return null;
    var classes = cx({ 
      "action_button": true,
      "disabled":this.props.disabled
    });
    return(
      <a className={ classes }
        onClick={this._handleClick}
        name={this.props.name}
        title={this.props.title}>
        { this.props.children }
      </a>
    );
  },
  _handleClick: function(e) {
    if (this.props.disabled) return;
    this.props.handleClick.call(this);
  }
});

module.exports = ActionButton;
