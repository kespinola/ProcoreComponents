var React = require('react');
var UtilityMixin = require('../mixins/UtilityMixin');

/**
 *  the If component conditionally renders its children
 */
var If = React.createClass({
  propTypes: {
    /**
     * Condition to check for
     */
    condition: React.PropTypes.bool.isRequired,
    /**
     * Optional div classname
     */
    className: React.PropTypes.string,
    /**
     * Optional div styles
     */
    style: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      style: {}
    };
  },
  mixins: [
    UtilityMixin
  ],

  render() {
    return !this.props.condition ? null : (
      <div
        className={this.props.className}
        style={this.props.style}>
        {this._cloneWithProps(this._buildProps())}
      </div>
    );
  }
});

module.exports = If;
