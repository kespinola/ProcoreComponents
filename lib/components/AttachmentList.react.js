
var React = require("react");
var Reflux = require("reflux");
var Initialize = require('../mixins/Initialize');
var PropState = require('../mixins/PropState');
var _ = require('underscore');

var lists = {};

function ListGenerator(store, actions) {
  if (lists[store.resourceType]) return lists[store.resourceType];
  
  var AttachmentList = React.createClass({
    mixins: [ 
      Reflux.ListenerMixin,
      Initialize.collection(store, actions),
      PropState.collection
    ],
    render: function() {
      if (this.state.objects.length === 0) return(<div>None</div>);
      var attachment_links = _.map(this.state.objects, function(attachment){
        return (<li><a href={attachment.prostore_file.url} >{attachment.prostore_file.name}</a></li>);
      });
      return(
        <div>
          { this.renderDownloadAll() }
          <ul className="react_attachment-list">{attachment_links}</ul>
        </div>
        );
    },
    renderDownloadAll: function() {
      if(this.state.objects.length > 1) return(<a className="download-all">Download All</a>);
    }
  });

  return AttachmentList;
}

module.exports = ListGenerator;
