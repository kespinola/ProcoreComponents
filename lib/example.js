"use strict";

var React = require('react');
var Collection = require('./components/Collection.react');
var ObjectTest = require('./components/Object.react');

var sectionMock = require('./mockData/sections');

var App = React.createClass({
  getDefaultProps() {
    return {
      data: sectionMock
    };
  },
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
              <Collection data={this.props.data}>
                <ObjectTest/>
              </Collection>
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
