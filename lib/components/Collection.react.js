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
    sortable: React.PropTypes.bool,

    componentClass: React.PropTypes.element
  },
  getDefaultProps() {
    return {
      onClick: function() {},
      className: "collection-component",
      componentClass:'div',
      sortable:false
    };
  },

  render() {
    var ComponentClass = this.props.sortable ? 'Sortable' : this.props.componentClass;
    var Component = React.Children.only(this.props.children);
    var children = null;
    if (this.props.data && this.props.data.length) {
      children = this.props.data.map((object) => {
        var obj = _.clone(object);
        if ( !obj.key ) obj.key = obj.id;
        return( React.cloneElement(Component, _.extend(obj, this.props, this.props.sortable ? {sortData:this.props.position, isDraggable:true} : {})));
      });
    }
    else if (this.props.wrapper) {
      var Wrapper = this.props.wrapper;
      return (<Wrapper>{children}</Wrapper>);
    } else {
      return (
        <ComponentClass className={this.props.className}>
          {children}
        </ComponentClass>
      );
    }
  }
});

module.exports = Collection;
