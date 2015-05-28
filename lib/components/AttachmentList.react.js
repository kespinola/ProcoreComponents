'use strict';

var React = require('react');

var AttachmentList = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render: function() {
    var attachments = !this.props.data.attachments ? [] : this.props.data.attachments
    if (attachments.length === 0) return(<div>None</div>);
    var attachment_links = attachments.map(function(attachment){
      return (<li><a href={attachment.url} >{attachment.filename}</a></li>);
    });
    return(
      <div>
        { this.renderDownloadAll() }
        <ul className="react_attachment-list">{attachment_links}</ul>
      </div>
      );
  },
  renderDownloadAll: function() {
    var attachments = !this.props.data.attachments ? [] : this.props.data.attachments
    if(attachments.length > 1) return(<a className="download-all">Download All</a>);
  }
});

module.exports = AttachmentList;
