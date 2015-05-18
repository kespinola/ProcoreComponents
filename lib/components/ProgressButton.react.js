/** @jsx React.DOM */
var React = require("react");
var Reflux = require("reflux");
var RequestMixin = require("ProcoreComponents/mixins/RequestMixin");
var NutLoader = require("ProcoreComponents/components/loaders/NutLoader.react");

var ProgressButton = React.createClass({
  mixins: [
    Reflux.ListenerMixin,
    RequestMixin
  ],
  propTypes: {
    handler: React.PropTypes.func,
    monitoredResources: React.PropTypes.array,
    actionLabel: React.PropTypes.string
  },
  render: function() {
    var loading = (this.state.percentage === 1) ? false : true;
    var disabled = (this.state.disabled) ? true : false;

    var actionLabel = (!loading) ? this.props.actionLabel : null;

    var progressBttn = {
      height: "30px",
      width: "75px",
      transition: "all 0.5s ease",
      padding: '0'
    };

    return(
      <span>
        <button style={progressBttn} disabled={loading || disabled} onClick={this.props.handler}>
          { actionLabel }
          <NutLoader loading={loading}/>
        </button>
      </span>
      )
  },
  _handleClick: function() {
    this.setState({disabled: true});
    this.props.handler && this.props.handler();
  }
});

module.exports = ProgressButton;
