var React = require("react");
var Reflux = require("reflux");
var _ = require('underscore');

var MainPanelButtons = React.createClass({
  /*
   * Render Methods
   */
  render: function() {
    return(
      <div className="main_panel_actions no_print">
        <span>Export data as:</span>
        <ul className="inline-horizontal-list padded-children-small">
          <li>
            <a className="btn-secondary btn-large" href={this.props.pdfUrl} target="_blank">PDF</a>
          </li>
        </ul>
      </div>
      );
  }
});

module.exports = MainPanelButtons;
