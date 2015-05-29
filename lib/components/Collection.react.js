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
    data: React.PropTypes.array,
    /**
     * On Click function
     */
    onClick: React.PropTypes.func,
    /**
     * Classes to apply to container
     */
    className: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      onClick: function() {},
      className: ""
    };
  },
  render() {
    var Component = React.Children.only(this.props.children);
    var children = null;
    if (this.props.data && this.props.data.length) {
      children = this.props.data.map((object) => {
        if ( !object.key ) object.key = object.id;
        return( React.cloneElement(Component, object || {}) );
      });
    }

    if (this.props.wrapper) {
      var Wrapper = this.props.wrapper;
      return ( 
        <Wrapper {...this.props}> {children} </Wrapper>
        );
    } else {
      return (
        <div className={this.props.className} {...this.props} onClick={this.props.onClick}>
          {children}
        </div>
      );
    }
  }
});

module.exports = Collection;
