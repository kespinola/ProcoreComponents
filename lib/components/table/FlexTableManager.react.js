/** @jsx React.DOM **/
var React = require("react");
var Reflux = require('reflux');
var cx = require("react/lib/cx");
var _ = require("underscore");

var FlexTableHeader = require("./FlexTableHeader.react");
var FlexTableFooter= require("./FlexTableFooter.react");
var FlexTable= require("./FlexTable.react");
var FlexTableBody= require("./FlexTableBody.react");

var FlexTableManager = React.createClass({
  getInitialState: function() {
    return({
      config: this.props.config,
      stickyHeader: false,
      stickyFooter: false,
      viewPortWidth: 0,
      tableWidth: 0,
      dragging: null,
      scrollThumbPosition: 0
      });
  },

  recalculateWidth: function() {
    var node = $(this.getDOMNode());
    var viewPortWidth = node.width();
    var tableWidth = 0;

    _.map(this.state.config, function(widths){
      tableWidth += widths.baseWidth + widths.offset;
    });

    this.setState({viewPortWidth: viewPortWidth, 
                   tableWidth: tableWidth});

  },
  componentDidMount: function() {
   
    /*Going to start setting up event listeners*/
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('resize', this.handleResize);

    
    var config = this.props.config; /* || FlexConfigStore.populateContent();*/
    //TODO: work with Pierce for config actions.
    //  FlexConfigActions.setConfig(config);
     this.recalculateWidth();
  },

  //TODO: Becomes componentWillRecieveProps not a config change anymore, it's a prop change
  onConfigChange: function(eventType) {
    this.setState({ // In the config wrapper, 
      config: FlexConfigStore.getConfig()
    });
    this.recalculateWidth();
  },


  handleResize: function(e) {
    //console.log("resizing");
  },

  getDraggable: function() {
    var node = $(this.getDOMNode());
    return $(this.refs.flexFooter.refs.scrollBar.refs.scrollThumb.getDOMNode()); 
  },

  mouseMove: function(e) {
    console.log("mouse move out of the if statement");
    if(this.state.dragging){
      console.log("mouse is moving in if statement");
      this.moveBar(e.pageX);
    }
    e.preventDefault();
  },

  onMouseUp: function() {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    this.setState({dragging: false});
  },

  mouseDownOnThumb: function(e) {
    console.log("mouse is down on thumb");
    var $dragging = $(e.target);
    var relativeMargin = $dragging.parent().offset().left;
    var mouseOffset = e.pageX - $dragging.offset().left + relativeMargin;
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    this.setState({dragging: e.target, 
                   mouseOffset: mouseOffset,
                   relativeMargin: relativeMargin}); 
  },
  
  mouseDownOnBar: function(e) {
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    console.log("mouse is down on bar");
    $bar = $(e.target);
    $draggable = this.getDraggable();
    var relativeMargin = $bar.offset().left; 
    var mouseOffset = $draggable.width() / 2 + relativeMargin;
    this.setState({
      relativeMargin: relativeMargin,
      mouseOffset: mouseOffset,
      dragging: true}); 
    this.moveBar(e.pageX);
  },

  moveBar: function(mousePageX) {
    var $draggable = this.getDraggable();
    var relativeMargin =this.state.relativeMargin;
    var movementSpeed = (this.state.tableWidth)/(this.state.viewPortWidth);
    var blockWidth = $draggable.width();
    var constrainedX = mousePageX - this.state.mouseOffset;
    var max = $draggable.parent().width() - blockWidth;
    var min = 0;
    constrainedX = Math.min(max, constrainedX);
    constrainedX = Math.max(min, constrainedX); 
    var scrollThumbPosition = constrainedX;// + relativeMargin; 
    
    var minOffset = -(this.state.tableWidth) + this.state.viewPortWidth;
    minOffset = Math.max((-1 * constrainedX * movementSpeed ), minOffset);
    this.setState({scrollThumbPosition: scrollThumbPosition,
                   tablePosition: minOffset});
  },


 stickyHeaderToggle: function(show) {
  this.setState({stickyHeader: show});
  },

 stickyFooterToggle: function(show) {
   this.setState({stickyFooter: show});
  },

  getTableStyle: function () {
    return {
      position: "relative",
      left: this.state.tablePosition,
      width: this.state.tableWidth
    };
  },


 render: function() {
    var tableStyle = this.getTableStyle();
    return(<div className="flex-table-manager">
             <FlexTableHeader sticky = {this.state.stickyHeader} 
                              viewPortWidth = {this.state.viewPortWidth} 
                              tableStyle = {tableStyle}>
               <FlexTable config={this.props.config.viewConfig.columnDefinition} 
                          collection={this.props.collection} 
                          tableWidth={this.state.tableWidth}/> 
             </FlexTableHeader> 

             <FlexTableBody  ref = "flexBody"
                             stickyHeaderToggle = {this.stickyHeaderToggle}
                             stickyFooterToggle = {this.stickyFooterToggle}
                             tableStyle = {tableStyle}>


               <FlexTable config= {this.props.config.viewConfig.columnDefinition}
                          collection={this.props.collection} 
                          tableWidth={this.state.tableWidth}/> 
            </FlexTableBody>
            <FlexTableFooter ref = "flexFooter"
                             stickyFooter = {this.state.stickyFooter} 
                             viewPortWidth = {this.state.viewPortWidth}
                             tableWidth = {this.state.tableWidth}
                             mouseDownOnThumb = {this.mouseDownOnThumb}  
                             mouseDownOnBar = {this.mouseDownOnBar}
                             tableStyle = {tableStyle}
                             scrollThumbPosition = {this.state.scrollThumbPosition}>
              <FlexTable config=  {this.props.config.viewConfig.columnDefinition}
                          collection={this.props.collection} 
                          tableWidth={this.state.tableWidth}/> 
            </FlexTableFooter>
         </div>
    );
  }
});
module.exports = FlexTableManager;
