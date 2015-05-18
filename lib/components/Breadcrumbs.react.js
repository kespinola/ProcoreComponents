/** @jsx React.DOM */
var React = require("react");
var Reflux = require("reflux");
var Router = require("react-router");
var Utils = require('ProcoreComponents/mixins/Utils');

var Breadcrumbs = React.createClass({
  mixins: [
    Router.Navigation,
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
    return(
      <a onClick={ this._handleTransition.bind(null, "index")}>
          <b>
            { Procore.Page.BreadcrumbsRoot || "index" }
          </b>
      </a>
      );

  },
  renderCurrent: function() {
    console.log("BREADCRUMBS " + this.props.current);
    return(
      <span>
        <i className="fa fa-chevron-right fa-fw"></i>
        <span className="light">
          { this.props.current }
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
