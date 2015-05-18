var React = require('react');
var UtilityMixin = require('../mixins/UtilityMixin');

/**
 *  the If component conditionally renders its children
 */
var If = React.createClass({
  propTypes: {
    // Condition to check for
    condition: React.PropTypes.bool.isRequired
  },

  mixins: [ 
    UtilityMixin 
  ],

  render() {
    return !this.props.condition ? null : (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = If;
