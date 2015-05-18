
var React = require("react");
var ProgressCircle = require("./ProgressCircle.react");

var LabelProgressCircle = React.createClass({
  render: function() {
    return (
      <div className="progress-wrapper">
        <ProgressCircle completion={this.props.completion} color={this.props.color}/>
        <p> { this.props.completion.completed} {this.props.text}</p>
      </div>
    );

  }
});

module.exports = LabelProgressCircle
