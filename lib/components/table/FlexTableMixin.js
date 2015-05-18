var React = require("react");
var Reflux = require("reflux");
var cx = require("react/lib/cx");
var _ = require("underscore");

var FlexTableMixin = {
 /*  componentDidMount: function() {
     this._adjustOffset(this.props.passTheTablePosition);
     this.customComponentDidMount && this.customComponentDidMount();
   },

   _adjustOffset: function(tablePosition) {

     var node = $(this.getDOMNode()).children(".flex-table");
     console.log("is this number changing? " + tablePosition) ; 

      node.offset({
        left: tablePosition
      }); 
     
   },
  
  componentWillReceiveProps: function(nextProps){
     this._adjustOffset(nextProps.passTheTablePosition);
  }, */

};
module.exports = FlexTableMixin;
