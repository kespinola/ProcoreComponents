var React = require('react');
var ObjectTest = require('./Object.react');
var Collapsible = require('./Collapsible.react');

var Debug = React.createClass({

  render: function() {
    return (
      <Collapsible>
        <ObjectTest {...this.props}/>
      </Collapsible>
    );
  }

});

module.exports = Debug;
