"use strict";

var React = require('react');
var _ = require('underscore');
var sortable = require('react-sortable-mixin');

/**
* Generic Collection
*/
var Collection = React.createClass({

  mixins:[sortable.ListMixin],

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

    componentClass: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),

    /**
    * function to run onSort
    * */
    onSort: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      data:[],
      onClick: function() {},
      className: "collection-component",
      componentClass:'div',
      sortable:false,
      handle:'.drag-handle',
    };
  },

  onResorted(order){
    order.forEach((val,i) =>{
      !_.isUndefined(val) && this.props.actions && this.props.actions.update({id:val.id, position:i});
    });
    this.setState({items:order});
  },

  render() {
    var ComponentClass = this.props.componentClass;
    var Component = React.Children.only(this.props.children);
    var children = null;
    if (this.props.data && this.props.data.length) {
      children = this.state.items.map((object) => {
        var obj = _.clone(object);
        var sortProps = this.props.sortable ? _.extend({index:obj.id, handle:this.props.handle}, this.movableProps) : {};
        if ( !obj.key ) obj.key = obj.id;
        return( React.cloneElement(Component, _.extend(obj, this.props, sortProps)));
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
    this.setState({items:data});
  },

  componentDidMount(){
    this._setDataState(this.props.data);

  },

  componentWillReceiveProps(newProps){
    this._setDataState({items:newProps.data})
  }
});

module.exports = Collection;
