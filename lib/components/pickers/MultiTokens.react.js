/** @jsx React.DOM */
React = require("react");
var ReactPropTypes = React.PropTypes;
var _ = require("underscore");
var SingleToken = require("./SingleToken.react");
var cx = require("react/lib/cx");

var MultiTokens = React.createClass({
  propTypes: {
    tokens: ReactPropTypes.array,
    editable: ReactPropTypes.bool,
    selecting: ReactPropTypes.bool,
    getLabel: ReactPropTypes.func,
    icon: ReactPropTypes.string,
    onClick: ReactPropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="multiTokens">
        {this.renderTokens()}
      </div>
    );
  },
  renderTokens: function() {
    var items = this.props.tokens || [];
    return !items.length ? null : _.map(items, function(token){
      return (
        <SingleToken
          token={token}
          icon={this.props.icon}
          onClick={this._onClick}/>
      )
    }.bind(this));
  },
  _onClick: function(token) {
    this.props.onClick(token);
  }
});

module.exports = MultiTokens;
