/** @jsx React.DOM */
var React = require("react");
var _ = require('underscore');
var Uploader = require('html5-uploader');

/*************************
 * Attachment Component
 *************************
 * @prop { string } url
    endpoint to upload to

 * @prop { boolean } dropzone
    true if drag & drop enabled

 * @prop { function } updateProgress
    callback on upload progress

 * @prop { function } uploadComplete
    callback on upload completion
 */
var AttachmentPicker = React.createClass({
  _uploader: {},
  defaultMessage: "Drop files here to upload",

/*
 * React Methods
 */
  getInitialState: function() {
    return({
      files: []
    });
  },


  componentDidMount: function() {
    this.initializeUploaders();
    this.configureUploaders();
  },

/*
 * Uploader Methods
 */
  initializeUploaders: function() {
    this._uploader = new Uploader({
        el: this.refs.uploader.getDOMNode(),
        url: Procore.Environment.attachmentsPath,
        name: 'files'
      });
  },

  configureUploaders: function() {
    this._uploader.on('files:added', function(files){
      console.log('Uploader::filesAdded');
      var nameArray = [];
      _.each(files, function(file){
        nameArray.push(file.name);
      });
      this.props.filesAdded();
      this.setState({files: nameArray});
    }.bind(this));

    this._uploader.on('upload:progress', function(progress){
      console.log('Uploader::progress ' + progress);
      this.props.updateProgress(progress);
    }.bind(this));

    this._uploader.on('upload:done', function(res){
      console.log('Uploader::done');
      this.clearFiles();
      this.props.updateProgress(null);
      var objects = JSON.parse(res).files.map(function(file){
        return { prostore_file: { id: file.prostore_file_id, name: file.filename } };
      });
      _.each(objects, this.props.uploadComplete);
    }.bind(this));
  },

  sendItUp: function() {
    if(this._uploader.getFiles().length !== 0){
      this._uploader.upload();
    }
  },

  clearFiles: function() {
    this._uploader.clearFiles();
    var node = this.getDOMNode(this.refs.uploader);
    node.value = null;
  },

/*
 * Render Methods
 */
  render: function() {
    return (this.props.dropzone) ? this._renderDropzone() : this._renderPicker();
  },

  _renderPicker: function() {
    return(
      <input type="file" ref="uploader" />
      );
  },

  _renderDropzone: function() {
    var message;
    if(this.state.files.length > 0){
      message = this.state.files.length + " file ready for upload.";
    }
    message = message || this.defaultMessage;
    return(
      <div className="drop_area column ten" ref="uploader">{ message }</div>
      )
  }
/*
 * Handler Methods
 */

});

module.exports = AttachmentPicker;
