/** @jsx React.DOM */
var React = require("react");
var cx = require ("react/lib/cx");
var _ = require("underscore");
var ProgressCircle = React.createClass({
  render: function() {
    var completed =  this.props.completion.completed;
    var percentage =  this.props.completion.percentage;


    var classes = cx({
      "radial-progress": true,
      "green": this.props.color==="green",
      "red": this.props.color==="red"
    });
    var numbers = this.renderPercentageNumbers();
    return (
      <div className={classes} data-progress={percentage}>
        <div className="circle">
          <div className="mask full">
            <div className="fill"></div>
          </div>
          <div className="mask half">
            <div className="fill"></div>
            <div className="fill fix"></div>
          </div>
        </div>
        <div className="inset">
          <div className="percentage-container">
            <div className="numbers"><span>-</span>{ numbers }</div>
          </div>
        </div>
      </div>
    );
  },
  renderPercentageNumbers: function() {
    return _(101).times(function(pct){
      return (<span>{pct + "%"}</span>);
    });
  }
});

module.exports = ProgressCircle;
