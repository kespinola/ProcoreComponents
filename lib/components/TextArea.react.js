/** @jsx React.DOM */
var React = require("react");
var Utils = require('ProcoreComponents/mixins/Utils');

var TextArea= React.createClass({
  /*
   * React Methods
   */
  propTypes: {
    "update": React.PropTypes.func.isRequired
  },
   mixins: [Utils],
  buildState: function(props) {
    var isEditing = (props.parentIsEditing || (props.value === null));
    return({
      value: props.value,
      prevValue: props.value,
      isEditing: isEditing
    });
  },
  getInitialState: function(){
    return this.buildState(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState(this.buildState(nextProps));
  },
  componentDidMount: function() {
    if (this.state.isEditing && this.props.autofocus) this.focus();
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.isEditing && !prevState.isEditing) this.focus();
  },
  render: function() {
    return this.state.isEditing ? this.renderEditBox() : this.renderShowBox();
  },
  /*
   * Render Methods
   */
  renderEditBox: function() {
    return(
      <textarea ref="input" className="textbox"
        value={this.state.value}
        placeholder={this.state.placeholder}
        onChange={this._handleChange}
        onKeyDown={this._handleKeys}
        onBlur={this._handleSubmit} />
    );
  },
  renderShowBox: function() {
    return( <label onClick={this.toggleEditing}>{ this.state.value }</label> );
  },
  submit: function(value, submit) {
    this.setState({prevValue: value});
    console.log("Value" + value);
    this.props.update(this.props.attribute, value, submit);
  },
  restoreValue: function() {
    this.setState({value: this.state.prevValue});
  },
  /*
   * Editing & Focus
   */
  stopEdit: function() {
    !this.props.parentIsEditing && this.setState({isEditing: false});
  },
  toggleEditing: function(e) {
    if(this.props.editable) this.setState({isEditing: true});
  },
  focus: function() {
    var input = this.refs.input.getDOMNode();
    input.focus();
    input.select();
  },
  /*
   * Handler Methods
   */
  _handleKeys: function(e, ui) {
    if(e.keyCode == 13) {
      this.submit(e.target.value, true);
      this.stopEdit();
    } else if (e.keyCode == 27) {
      this.restoreValue();
      this.stopEdit();
    }
  },
  _handleChange: function(e) {
    this.setState({ value: e.target.value });
  },
  _handleSubmit: function(e, ui) {
    e.preventDefault();
    this.submit(e.target.value);
    this.stopEdit();
  }
});

module.exports = TextArea;
