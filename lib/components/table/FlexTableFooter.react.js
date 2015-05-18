/** @jsx React.DOM */
var React = require("react");
var cx = require("react/lib/cx");
var ScrollBar = require("./ScrollBar.react");
var cloneWithProps = require("react/lib/cloneWithProps");
var _ = require("underscore");
var FlexTableMixin = require("./FlexTableMixin");

var FlexTableFooter = React.createClass({
  
  propTypes: {
    "tableStyle": React.PropTypes.object,
    "stickyFooter": React.PropTypes.bool
  },

  render: function() {
    var style = {
      width: this.props.viewPortWidth};
    var className = cx({
      "flex-footer": true,
      "stick-foot": true
    });


    var children = React.Children.map( this.props.children, function(child) {
        return cloneWithProps(child, {style: this.props.tableStyle});
    }.bind(this));

    return !this.props.stickyFooter ? this.renderScrollBar() : this.transferPropsTo(
      <div style={style} className={className}>
          {children}
          {this.renderScrollBar()}
      </div>);
  },

  renderScrollBar: function() {
    return this.transferPropsTo(
          <ScrollBar
            ref = "scrollBar"
            TableWidth={this.props.tableWidth}
            viewPortWidth={this.props.viewPortWidth}
            mouseDownOnThumb={this.props.mouseDownOnThumb}
            mouseDownOnBar = {this.props.mouseDownOnBar}
            scrollThumbPosition={this.props.scrollThumbPosition}/>
      );
  },
});

module.exports = FlexTableFooter;
