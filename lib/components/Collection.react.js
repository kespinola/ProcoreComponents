"use strict";

var React = require('react');
/**
* Generic Collection
*/
var Collection = React.createClass({
  propTypes: {
    /**
    * Array of objects to display
    */
    data: React.PropTypes.array.isRequired
  },
  render() {
    var Component = React.Children.only(this.props.children);
    var children = null;
    if (this.props.data && this.props.data.length) {
      children = this.props.data.map((object) => {
        return( React.cloneElement(Component, object || {}) );
      });
    }
    return (<div>{children}</div>);
  }
});

module.exports = Collection;
