"use strict";

var React = require('react');
var _ = require('underscore');
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
      className: "collection-component"
    };
  },
  render() {
    var Component = React.Children.only(this.props.children);
    var children = null;
    if (this.props.data && this.props.data.length) {
      children = this.props.data.map((object) => {
        var obj = _.clone(object);
        if ( !obj.key ) obj.key = obj.id;
        return( React.cloneElement(Component, _.extend(obj, this.props)));
      });
    }

    if (this.props.wrapper) {
      var Wrapper = this.props.wrapper;
      return (<Wrapper>{children}</Wrapper>);
    } else {
      return (
        <div className={this.props.className}>
          {children}
        </div>
      );
    }
  }
});

module.exports = Collection;
