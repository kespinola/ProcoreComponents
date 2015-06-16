
var React = require("react");
var ProgressCircle = require("./ProgressCircle.react");

var LabelProgressCircle = React.createClass({
  propTypes: {
    completion: React.PropTypes.shape({
      percentage: React.PropTypes.number,
      completed: React.PropTypes.number,
    }),
    color: React.PropTypes.string,
    text: React.PropTypes.string,
  },
  render: function() {
    return (
      <div className="progress-wrapper">
        <ProgressCircle completion={this.props.completion} color={this.props.color}/>
        <p> { this.props.completion.completed} {this.props.text}</p>
      </div>
    );

  }
});

module.exports = LabelProgressCircle;
