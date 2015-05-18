
var React = require("react");
var Reflux = require("reflux");
var cx = require("react/lib/cx");
var Router = require('react-router');
//var FlexTableStore = require("../../stores/FlexTableStore")
//var FlexTableMixin = require("./FlexTableMixin");
var _ = require("underscore");
var ScrollBarThumb = React.createClass({

  onMouseDown: function(e) {
    this.props.mouseDownOnThumb(e)
    e.stopPropagation();
  },

  render: function() {
    var viewPortWidth = this.props.viewPortWidth;
    var tableWidth = this.props.tableWidth;
    var relativeScrollBarThumbSize = Math.floor((this.props.scrollBarWidth * viewPortWidth)/tableWidth);
    var style = {
      position: "relative",
      width: relativeScrollBarThumbSize, 
      left: this.props.scrollThumbPosition
    };
    return(
      <div onMouseDown={this.onMouseDown}  style={style} className="scroll-bar-thumb"></div>
    );
  }
});

module.exports = ScrollBarThumb;
