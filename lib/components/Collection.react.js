"use strict";

var React = require('react');
var _ = require('underscore');
var UtilityMixin = require('../mixins/UtilityMixin');
/**
* Generic Collection
*/
var Collection = React.createClass({
  propTypes: {
    /**
     * Child components
     */
    children: React.PropTypes.array,
    /**
     * Classes to apply to container
     */
    className: React.PropTypes.string,
    /**
     * Array of objects to display
     */
    data: React.PropTypes.array,
    /**
     * Wrapper component
     */
    wrapper: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      className: "collection-component"
    };
  },
  mixins: [
    UtilityMixin
  ],
  blacklistedProps: [
    "wrapper"
  ],
  childrenWithData() {
    var Component = React.Children.only(this.props.children);

    if (this.props.data && this.props.data.length) {
      return this.props.data.map((object) => {
        var obj = _.clone(object);
        if (!obj.key) { obj.key = obj.id; }
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
    var Wrapper = wrapper ? wrapper : "div";

    return (
      <Wrapper className={className}>
        {children}
      </Wrapper>
    );
  }
});

module.exports = Collection;
