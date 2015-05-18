/** @jsx React.DOM */
var React = require("react");
var Reflux = require("reflux");
var cx = require("react/lib/cx");
//var FlexTableStore = require("../../stores/FlexTableStore")
//var FlexTableActions = require("../../actions/FlexTableActions")
var FlexTableMixin = require("./FlexTableMixin");
var Initialize = require('ProcoreComponents/mixins/Initialize');
var ScrollBarThumb = require("./ScrollBarThumb.react");
var _ = require("underscore");

var ScrollBar = React.createClass({
  //Mixins will go in here if any
  getInitialState: function() {
    return({
      scrollBarWidth: 0});
  },
  
    updateWidth: function(e) { 
    var node = $(this.getDOMNode());
    var scrollBarWidth = node.width();
    this.setState({scrollBarWidth: scrollBarWidth});
  },

  componentDidMount: function() {
    this.updateWidth();
    window.addEventListener('resize', this.handleResize);
  },

  
  onMouseDown: function(e) {
    this.props.mouseDownOnBar(e);
  },

  render: function() {
    return(
      <div className="scroll-bar" onMouseDown={this.onMouseDown}>
        <ScrollBarThumb ref="scrollThumb"
                        mouseDownOnThumb = {this.props.mouseDownOnThumb}
                        scrollThumbPosition = {this.props.scrollThumbPosition}
                        tableWidth={this.props.tableWidth}
                        viewPortWidth={this.props.viewPortWidth}
                        scrollBarWidth={this.state.scrollBarWidth}/>
      </div>
      );
  }
});

module.exports = ScrollBar;
