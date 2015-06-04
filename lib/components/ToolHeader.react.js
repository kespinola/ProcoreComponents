var React = require('react'); 
var BetaFeedbackPopup = require('./BetaFeedbackPopup.react'); 
var Reflux = require("reflux");
var BreadcrumbStore = require('../stores/BreadcrumbStore');

var ToolHeader = React.createClass({
  mixins: [
  Reflux.connect(BreadcrumbStore, 'breadcrumbs'), 
  ], 

  render() {
    return(
      <div className="tool-header">
        <h1 className="beta-align">{this.state.breadcrumbs}</h1>
        <BetaFeedbackPopup/>
      </div>
    );
  }
});

module.exports = ToolHeader; 
