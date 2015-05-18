/** @jsx React.DOM */
var React = require("react");
var cx = require("react/lib/cx");
var cloneWithProps = require("react/lib/cloneWithProps");
var _ = require("underscore");
var FlexTableMixin = require("./FlexTableMixin");
var FlexTableHeader = React.createClass({
    mixins: [FlexTableMixin],

  propTypes: {
    "tableStyle": React.PropTypes.object,
    "sticky": React.PropTypes.bool
  },

  render: function() {
    var style = {width: this.props.viewPortWidth};
    
    var className = cx({"stick": true, });

    var children = React.Children.map( this.props.children, function(child) {
        return cloneWithProps(child, {style: this.props.tableStyle});
    }.bind(this));

    return !this.props.sticky ? null : this.transferPropsTo(
      <div style={style} className={className}>
          {children}
      </div>);
  }
});

module.exports = FlexTableHeader;
