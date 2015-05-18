
var React = require("react");
var ActionButton = require("../components/sidebar/ActionButton.react");
var _ = require("underscore");

var ButtonPane = React.createClass({
  render: function() {
    var buttons = _.map(this.props.configs, function(config) {
      var disabled = config.disabled && config.disabled.call(this) || false;
      var hidden = config.hidden && config.hidden.call(this) || false;
      return (
        <li>
          <ActionButton name={ config.label }
            disabled={ disabled }
            hidden={ hidden }
            handleClick={ config.handler }
            title={ config.title && config.title() }>
            <i className={config.icon}/>
            { config.label }
          </ActionButton>
        </li>
        );
      }.bind(this));

    return(
      <div>
        <ul className="contain-list">
          { buttons }
        </ul>
      </div>
    );
  }
});

module.exports = ButtonPane;
