"use strict";

var React = require('react');
var _ = require('underscore');
var SortableMixin = require('sortablejs/react-sortable-mixin');
/**
* Generic Collection
*/
var Collection = React.createClass({

  mixins:[SortableMixin],


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
    sortableOptions: React.PropTypes.obj,

    /**
     * element to render
     * */

    componentClass: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),

    /**
    * function to run onSort
    * */
  },

  getInitialState(){
    return {
      items:[]
    }
  },

  getDefaultProps() {
    return {
      data:[],
      onClick: function() {},
      className: "collection-component",
      componentClass:'div',
      sortId:"position",
      sortableOptions:{
        disabled:true,
        handle:".my-handle"
      }
    };
  },

  _updateItemPosition(id,position){
    return this.props.actions && this.props.update({id:id, [this.props.sortId]: position});
  },

  handleSort(e){

    var id = React.findDOMNode(e.item).getAttribute("data-id");
    if(!id) new Error("Sortable items need a data-id attribute on DOM Node");

    var positiveChange = e.newIndex > e.oldIndex;

    this.props.data.forEach((obj)=>{
      var position = obj[this.props.sortId];
      var change = position + (positiveChange ? - 1:  + 1);
      this._updateItemPosition(obj.id,  obj.id == id ? e.newIndex : change)
    });

  },

  render() {
    var ComponentClass = this.props.componentClass;
    var Component = React.Children.only(this.props.children);
    var children = null;
    if (this.state.items && this.state.items.length) {
      children = this.state.items.map((object) => {
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
        <ComponentClass className={this.props.className}>
          {children}
        </ComponentClass>
      );
    }
  },

  _setDataState(data){
    this.setState({items:data})
  },

  componentDidMount(){
    this._setDataState(this.props.data)

  },

  componenWillReceiveProps(newProps){
    this._setDataState(newProps.data)
  }

});

module.exports = Collection;
