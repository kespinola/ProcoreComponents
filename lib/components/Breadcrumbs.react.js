
var React = require("react");
var Reflux = require("reflux");
var Router = require("react-router");
var Utils = require('../mixins/Utils');
var BreadcrumbStore = require('../stores/BreadcrumbStore')

var Breadcrumbs = React.createClass({
  mixins: [
    Router.Navigation,
    Reflux.connect(BreadcrumbStore, 'breadcrumbs'),
  ],


/*
 * Render Methods
 */
  render: function() {
    if(this.props.current === Procore.Page.BreadcrumbsRoot) return null;
    return(
      <nav className="breadcrumbs">
        { this.renderRoot() }
        { this.renderCurrent() }
      </nav>
    );
  },
  renderRoot: function () {
    if(this.state.breadcrumbs == null) return null;
    return(
      <a onClick={ this._handleTransition.bind(null, "index")}>
        <b>
          { Procore.Page.BreadcrumbsRoot || "index" }
        </b>
      </a>
      );

  },
  renderCurrent: function() {
    console.log("BREADCRUMBS " + this.state.breadcrumbs);
    if(this.state.breadcrumbs == null) return null;
    return(
      <span>
        <i className="fa fa-chevron-right fa-fw"></i>
        <span className="light">
        {this.state.breadcrumbs}
        </span>
      </span>
    );
  },

/*
 * UI Methods
 */
  _handleTransition: function(target) {
    this.transitionTo(target);
  }
});


module.exports = Breadcrumbs;
