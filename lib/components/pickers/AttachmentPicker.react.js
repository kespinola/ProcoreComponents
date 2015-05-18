/** @jsx React.DOM */
var React = require("react");
var _ = require('underscore');
var Attachment = require("./Attachment.react");
var cx = require('react/lib/cx');

var AttachmentPicker = React.createClass({
/*
 * React Methods
 */
  getInitialState: function() {
    return({
      progress: null,
      ready: false
    });
  },

/*
 * Render Methods
 */
  render: function() {
    if (typeof FileReader == 'undefined') return null;
    var buttonClasses = cx({
      "no-style-btn": true,
      "mock-bttn": true,
      "alert-error": !this.state.ready
    });
    return(
      <div>
        <Attachment ref="oldschool"
          url={this.props.url}
          parent={this.props.parent}
          dropzone={false}
          filesAdded={this._handleFilesAdded}
          updateProgress={this._handleProgressUpdate}
          uploadComplete={this._handleUploadComplete}
          url={this.props.url} />
          { this.renderProgress() }
      </div>
      );
  },

  renderProgress: function(progress) {
    if(this.state.progress !== null){
      return(
        <span ref="progress"> { this.state.progress }%</span>
      );
    }
  },
/*
 * Handler Methods
 */

 _handleCancel: function() {
  this.refs.oldschool.clearFiles();
  this.setState({ready: false});
 },

 _handleSubmit: function(){
  console.log("Submitting file");

  for(var key in this.refs){
    this.refs[key].sendItUp && this.refs[key].sendItUp();
  }
 },
/*
 * Attachment Handler Methods
 */
  _handleUploadComplete: function(attachment) {
    this.props.update(attachment);
  },

  _handleProgressUpdate: function(progress) {
    this.setState({progress: progress});
  },

  _handleFilesAdded: function() {
    this.setState({ready: true});
    this._handleSubmit();
  }
});

module.exports = AttachmentPicker;
