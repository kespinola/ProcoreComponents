"use strict";

var React = require('react');

var App = React.createClass({
  render() {
    return (
      <div className="tool-body">
        <div className="tool-header">
          <h1>Wrench</h1>
        </div>

        <div className="inner-content">
          <section>
            <div className="table-header">
              <h2>Test your component here:</h2>
            </div>

          </section>
        </div>

      </div>
    );
  }
});

window.renderApp = function(node) {
  React.render(<App/>, node);
};
