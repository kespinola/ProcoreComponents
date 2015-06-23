var React = require("react");
var Reflux = require("reflux");
var _ = require('underscore');

var MainPanelButtons = React.createClass({
  /*
   * Render Methods
   */
  render: function() {
    return(
      <aside className="no_print">
        <span>Export data as:</span>
        <ul className="inline-horizontal-list padded-children-small">
          <li>
            <a className="bttn bttn-primary-outline" href={this.props.pdfUrl} target="_blank">PDF</a>
          </li>
        </ul>
      </aside>
      );
  }
});

module.exports = MainPanelButtons;
