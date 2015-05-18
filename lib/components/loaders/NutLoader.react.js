/** @jsx React.DOM */
var React = require("react");
var _ = require("underscore");
var cx = require("react/lib/cx");

var Loader = React.createClass({
  getInitialState: function() {
    return { frame: 0 };
  },
  render: function() {
    var styles = cx({
      hidden: !this.props.loading
    });
    return (
      <svg 
        width="25"
        height="25"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={styles}>
        <g transform="scale(.4)">
          {this.renderNut(6)}
        </g>
      </svg>
      );
  },
  renderNut: function(numFaces) {
    var fullOpacity = 100;
    var angleRatio = 360 / numFaces;
    var opacityRatio = fullOpacity / numFaces;
    return _(numFaces).times(function(i){
      var angle = angleRatio*i;
      var opacityAngle = this.state.frame + opacityRatio * i;

      var opacity = Math.abs((opacityAngle % fullOpacity) - fullOpacity/2) * (2 / 100);
      return (<NutFace angle={angle} opacity={opacity}/>);
    }.bind(this));
  }, 
  componentDidMount: function() {
    this.timer = setInterval(this.loop, 1000 / 60);
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
  },
  loop: function() {
    this.setState({frame: this.state.frame + 1});
  }
});

var NutFace = React.createClass({
  render: function() {
    var center = {
      x: 31.5,
      y: 27.3
    };
    return (<polygon 
      fill="#FFF" 
      points="26.2,18.1 36.8,18.1 47.3,0 15.7,0 "
      opacity={this.props.opacity}
      transform={ "rotate(" + this.props.angle + ","+ center.x+","+ center.y+")"}/>
      );
  }
});

module.exports = Loader;