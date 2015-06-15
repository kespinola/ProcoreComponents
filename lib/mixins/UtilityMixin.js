"use strict";

var React = require('react');
var _ = require('underscore');

var blacklistedProps = [
  "className",
  "style",
  "children"
];
/**
 * @module UtilityMixin
 * @type {Object}
 */
var UtilityMixin = {

  _buildProps() {
    if (this.buildProps) {
      return this.buildProps(this._cleanProps());
    }
    return this._cleanProps();
  },

  _cleanProps() {
    var propsToDestroy = blacklistedProps.concat(this.blacklistedProps || []);
    var propsForChildren = _.clone(this.props);
    var propKeys = Object.keys(propsForChildren);

    propsToDestroy.forEach(prop => {
      if (_.contains(propKeys, prop)) {
        delete propsForChildren[prop];
      }
    });
    return propsForChildren;
  },

  /**
   * Clones children with given props
   * @param  {object} props Props to give to children
   * @return {array}       Array of child components with new props
   */
  _cloneWithProps(props) {
    var children = React.Children.map(this.props.children, (child) => {
      if (!child) { return null; }
      return React.cloneElement(child, props);
    }, this.context);
    return children;
  },

/**
 * Console warns with component display name
 * @param  {string} warning Warning message
 */
  _warn(warning) {
    console.warn(this.constructor.displayName, warning);
  }
};

module.exports = UtilityMixin;
