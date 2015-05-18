var React = require("react");
var Utils = require('ProcoreComponents/mixins/Utils');
var cx = require('react/lib/cx');

/**
 * The smartest input you know.
 */
var Input = React.createClass({
  
  mixins: [Utils],

  getInitialState: function() {
    var isEditing = (this.props.parentIsEditing || (this.props.value === null));
    return({
      value: this.props.value || "",
      prevValue: this.props.value,
      isEditing: isEditing
    });
  },
  componentWillReceiveProps: function(nextProps){
    var value;

    if(nextProps.value === ""){
      value = nextProps.value;
    } else {
      value = nextProps.value || this.state.value;
    }

    this.setState({
      value: value,
      prevValue: this.state.value
    });
  },
  componentDidMount: function() {
    // if (this.currentAction()=="create") this.focus();
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

    var inputClasses;
    var classes = {};

    if(this.props.validate){
      classes["alert-error"] = (this.state.value === "") ? true: false;
    }

    inputClasses = cx(classes);
    return(
      <input ref="input"
        className={inputClasses}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this._handleChange}
        onKeyDown={this._handleKeys}
        onBlur={this._handleBlur}
        autoFocus={this.props.autoFocus} />
    );
  },
  renderShowBox: function() {
    return( <label onClick={this.toggleEditing}>{ this.state.value }</label> );
  },
  submit: function(value, submit, key) {
    this.setState({prevValue: value});
    if((this.props.validate && this.state.value !== "") || !this.props.validate){
      this.props.update(this.props.attribute, value, submit, key);
    }
    // if (!this.props.continuousUpdate) this.clear();
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
  clear: function() {
    this.setState({value: ""});
  },
  /*
   * Handler Methods
   */
  _handleKeys: function(e, ui) {
    var codeHandlers = {
      "Enter": function() {
        this.submit(e.target.value, true, "Enter");
        this.stopEdit();
      },
      "Tab": function() {
        this.submit(e.target.value, true, "Tab");
        this.stopEdit();
      },
      "Escape": function() {
        this.restoreValue();
        this.stopEdit();
      }
    }
    var handler = codeHandlers[e.key];
    handler && handler.call(this);
  },
  _handleChange: function(e) {
    this.setState({ value: e.target.value });
    if(this.props.continuousUpdate) this.submit(e.target.value);
  },
  _handleBlur: function(e, ui) {
    e.preventDefault();
    this.submit(e.target.value);
    this.stopEdit();
  },
  remoteSubmit: function() {
    var value = this.state.prevValue;
    if((this.props.validate && value !== "") || !this.props.validate){
      this.props.update(this.props.attribute, value, true);
    }
  }
});

module.exports = Input;
