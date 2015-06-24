var React = require("react");
var cx = require('classnames');

var NotificationBanner = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    content: React.PropTypes.func.isRequired,
  },

  render: function() {
    var Content = this.props.content;
    var classes= {
      'notification-banner': true,
    };
    classes[this.props.type] = true;
    classes = cx(classes);

    if(!Content) return null;
    return(
      <div className={classes}>
        <Content/>
      </div>
    );
  }
});

module.exports = NotificationBanner;
