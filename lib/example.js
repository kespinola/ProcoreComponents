"use strict";

var React = require('react');
var Collection = require('./components/Collection.react');
var If = require('./components/If.react');
var ObjectTest = require('./components/Object.react');
var Paginate = require('./components/Paginate.react');
var Paginator = require('./components/Paginator.react');
var sectionMock = require('./mockData/sections');
var Collapsible = require('./components/Collapsible.react');
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
  toggleCollapser(){
    this.refs.collapsible.toggle();
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
              <section>
                <h2>Sortable Collection Example</h2>
                <SortableListExample />
              </section>
              <section>
                <button onClick={this.toggleCollapser}>Toggle</button>
                <Collapsible ref="collapsible" maxHeight={200}>
                  <h2>Collapisbler</h2>
                  <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</p>
                </Collapsible>
              </section>
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
