/** @jsx React.DOM **/
var React = require("react");
var Reflux = require("reflux");
var cx = require("react/lib/cx");
//var FlexTableStore = require("../../stores/FlexTableStore")
//var FlexTableActions = require("../../actions/FlexTableActions")
var Initialize = require('ProcoreComponents/mixins/Initialize');
var FlexTableHeader = require("./FlexTableHeader.react");
var FlexTableFooter= require("./FlexTableFooter.react");
var FlexTableManager= require("./FlexTableManager.react");
var FlexTable = require("./FlexTable.react");
var _ = require("underscore");
var FlexTableMixin = require("./FlexTableMixin");
var cloneWithProps = require("react/lib/cloneWithProps");

var FlexTableBody = React.createClass({
  // mixins: [FlexTableMixin],
  propTypes: {
    "tableStyle": React.PropTypes.object
  },
  getInitialState: function() {
    return({
      table: ''
    });
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.onScroll);
  },

  onScroll: function(e) {
    var table = this.refs.flexTable.getDOMNode();
    var $table = $(table);
    
    // ready
    var scrollTop = $(window).scrollTop();
    var scrollBarHeight = $(".scroll-bar").height();
    var headerHeight = $table.find("thead").height();
    var headerBuffer = 2.4*headerHeight;
    var scrollBottom = scrollTop + $(window).height();
    var tableOffset = $table.offset().top;
    var tableHeight = $table.height();
    var elemBottom = tableOffset + tableHeight;
    
    var showHeader = scrollTop > tableOffset && scrollTop < elemBottom;
    var showFooter = scrollBottom - headerBuffer > tableOffset  && (scrollBottom - scrollBarHeight) < elemBottom;
    
    if (showHeader){ 
      //  this.setState( { needsScrollUpdate: true, firstRange: true, toggleDisplay: true });
       this.props.stickyHeaderToggle(true);
    }else{
       this.props.stickyHeaderToggle(false);
    }
      
    // this.props.footerStick(showFooter);
    if(showFooter){
      this.props.stickyFooterToggle(true);
    }else{
      this.props.stickyFooterToggle(false);
    }
  },

  render: function() {

    var children = React.Children.map(this.props.children, function(child) {
      return cloneWithProps(child, {ref: 'flexTable', style: this.props.tableStyle});
    }.bind(this));
    return (<div className="flex-body">{children} </div>);
  }
});
module.exports = FlexTableBody;
