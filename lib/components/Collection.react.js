"use strict";

var React = require('react');
var _ = require('underscore');
var SortableMixin = require('sortablejs/react-sortable-mixin');
var UtilityMixin = require('../mixins/UtilityMixin');

/**
* Generic Collection
*/
var Collection = React.createClass({

  mixins:[SortableMixin, UtilityMixin],


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
    return this.props.actions && this.props.actions.update({id:id, [this.props.sortId]: position});
  },

  handleSort(e){

    var id = React.findDOMNode(e.item).getAttribute("data-id");
    if(!id) new Error("Sortable items need a data-id attribute on DOM Node");

    var positiveChange = e.newIndex > e.oldIndex;

    this.props.data.forEach((obj)=>{
      var position = obj[this.props.sortId];
      var change = position + (positiveChange ? - 1 : + 1);
      this._updateItemPosition(obj.id,  obj.id == id ? e.newIndex : change)
    });

  },

  childrenWithData() {
    var Component = React.Children.only(this.props.children);

    if (this.state.items && this.state.items.length) {
      return this.state.items.map((object, idx) => {
        var obj = _.clone(object);
        if (!obj.key) { obj.key = obj.id; }
        obj.index = idx + 1;
        return (React.cloneElement(Component, _.extend(obj, this._buildProps())));
      });
    }
    else {
      return null;
    }
  },

  render() {
    var { wrapper, className } =  this.props;
    var children = this.childrenWithData();
    var Wrapper = wrapper ? wrapper : this.props.componentClass;

    return (
        <Wrapper className={className}>
          {children}
        </Wrapper>
    );
  },

  _setDataState(data){
    this.setState({items:data})
  },

  componentDidMount(){
    this._setDataState(this.props.data)

  },

  componentWillReceiveProps(newProps){
    this._setDataState(newProps.data)
  }

});

module.exports = Collection;
