"use strict";

var React = require('react');
var _ = require('underscore');
var Sortable = require('react-sortable-items');

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

    /**
     * element to render
     * */

    componentClass: React.PropTypes.element,

    /**
    * Key to sort by
    * */

    sortId: React.PropTypes.string,

    /**
    * function to run onSort
    * */
    onSort: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      onClick: function() {},
      className: "collection-component",
      componentClass:'div',
      sortable:false,
      sortId:'position'
    };
  },

  _handleSort(reorder){
    this.props.onSort && this.props.onSort(reorder)
  },

  render() {
    var ComponentClass = this.props.sortable ? Sortable : this.props.componentClass;
    var Component = React.Children.only(this.props.children);
    var children = null;
    if (this.props.data && this.props.data.length) {
      children = this.props.data.map((object) => {
        var obj = _.clone(object);
        if ( !obj.key ) obj.key = obj.id;
        return( React.cloneElement(Component, _.extend(obj, this.props, this.props.sortable ? {sortData:obj.id, isDraggable:true} : {})));
      });
    }
    if (this.props.wrapper) {
      var Wrapper = this.props.wrapper;
      return (<Wrapper>{children}</Wrapper>);
    } else {
      return (
        <ComponentClass className={this.props.className} onSort={this._handleSort}>
          {children}
        </ComponentClass>
      );
    }
  }
});

module.exports = Collection;
