
var React = require("react");
var Router = require('react-router');
//var FlexTableStore = require("../../stores/FlexTableStore");
//var FlexTableActions = require("../../actions/FlexTableActions");
//var FlexConfigActions = require("../../actions/FlexConfigActions");
//var FlexColumnActions = require("../../actions/FlexColumnActions");
var cloneWithProps = require("react/lib/cloneWithProps");
//var FlexColumnStore = require("../../stores/FlexColumnStore");
var _ = require("underscore");

var HeaderCell = React.createClass({

  getInitialState: function() {
    return {
      handleOffset: 0, 
      handlePosition: 0,
      dragHandle: null
    };
  },
  componentDidMount: function() {
    var config = this.props.config;
    var node = $(this.getDOMNode());
    if(config.baseWidth) return; 
    config.baseWidth = node.outerWidth(); 
  },

 /* will be replaced with dragging mechanism */   
  mouseDownOnHandle: function(e) {
    console.log("mouse is down");
  /*  console.log("mouse is down on handle"); */
    document.addEventListener("mouseup", this.handleIsUp);
    document.addEventListener("mousemove", this.handleIsMoving);/*
    var $dragHandle = $(e.target);
    var relativeMargin = $dragHandle.parent().offset().left;
    var mouseOffset = e.pageX - $dragHandle.offset().left + relativeMargin;
    this.setState({
      dragHandle: e.target,
      mouseOffset: mouseOffset,
      relativeMargin: relativeMargin
      }); */
 }, 

  handleIsMoving: function(e){
      console.log("im here in handle is not  moving");
/*    if(this.state.dragHandle){
      var $dragHandle  = $(this.refs.handle.getDOMNode());
      var relativeMargin = this.state.relativeMargin;
      var conX = e.pageX - this.state.mouseOffset;
     var max = $dragHandle.parent().width();
      var min = 0;
      conX = Math.min(max, conX);
      conX = Math.max(min, conX); 
      
    var handlePosition = conX;
    console.log("handle position is " + handlePosition);
      this.setState({handlePosition: conX});
     } */
    e.preventDefault();
  }, 

  handleIsUp: function(e){
   /* var config = this.props.config; */
    document.removeEventListener("mousemove", this.handleIsMoving);
    document.removeEventListener("mouseup", this.handleIsUp);
   /* config.baseWidth = config.baseWidth + this.state.handleOffset;
    var widthOfHeader = $(this.getDOMNode()).width();    
    console.log(" widthOfHeader is " + widthOfHeader );
    console.log("handleOffset is "+ handleOffset);
    console.log("baseWidth is " + console.baseWidth);
    this.setState({handleOffset: this.state.handlePosition});
    FlexConfigActions.setConfigForKey(this.props.key, config) */
    console.log("pageX---------------- " + e.pageX);
  },

  render: function() {
    var config = {};
    Object.keys(this.props.config).forEach(function(key){
      config[key] = this.props.config[key];
    }.bind(this));
    var handleOffset = this.state.handlePosition;
    var handleStyle = { left: -handleOffset}
    /*console.log("config.baseWidth for ", config.label, "is ",  config.baseWidth);
    console.log("state.HandleOffset for", config.label, "is ", this.state.handleOffset);*/
    if(config.baseWidth){
       var styles = {
          width:  config.baseWidth  + this.state.handleOffset 
       };
     }

    return (
      <th style={styles}>
      {config.label}
        <div draggable={true} 
             className="smhandle"
             ref="handle"
             onMouseDown={this.mouseDownOnHandle}
             >
        </div>
      </th>
    );
  }

});

module.exports = HeaderCell;
