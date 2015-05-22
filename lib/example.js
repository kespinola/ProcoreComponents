"use strict";

var React = require('react');

var App = React.createClass({
  render() {
    return (
      <div className="App">
        Put your shit here
      </div>
    );
  }
});

window.renderApp = function(node) {
  React.render(<App/>, node);
};
