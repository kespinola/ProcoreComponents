"use strict";

var React = require('react');
var Collection = require('./components/Collection.react');
var If = require('./components/If.react');
var ObjectTest = require('./components/Object.react');
var Paginate = require('./components/Paginate.react');
var Paginator = require('./components/Paginator.react');
var sectionMock = require('./mockData/sections');
var SortableListExample = require('./components/SortableListExample.react');

var App = React.createClass({
  getDefaultProps() {
    return {
      data: sectionMock
    };
  },
  getInitialState: function() {
    return {
      show: true,
      limit: 5,
      page: 0
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
              <aside>
                <button onClick={this.toggleShow}>RERENDERRRR</button>
              </aside>
              <SortableListExample />
              <Paginate 
                data={this.props.data}
                limit={this.state.limit}
                page={this.state.page}>
                <Collection>
                  <ObjectTest/>
                </Collection>
                <Paginator onPageChange={this.changePage}/>
              </Paginate>

            </div>
          </section>
        </div>

      </div>
    );
  },
  toggleShow(e) {
    var {show} = this.state;
    this.setState({show: !show});
  },
  changePage(page) {
    this.setState({page});
  }
});

window.renderApp = function(node) {
  React.render(<App/>, node);
};
