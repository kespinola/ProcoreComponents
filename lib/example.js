"use strict";

var React = require('react');
var Collection = require('./components/Collection.react');
var ObjectTest = require('./components/Object.react');

var App = React.createClass({
  getDefaultProps() {
    return {
      data: [
        {
          "id": 7117,
          "name": "Section 1",
          "position": 1,
          "parent_id": 88,
          "child_url": "/2675/company/checklists/list_templates/88/sections/7117/items"
        },
        {
          "id": 10617,
          "name": "Section 2",
          "position": 2,
          "parent_id": 88,
          "child_url": "/2675/company/checklists/list_templates/88/sections/10617/items"
        }
      ]
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
