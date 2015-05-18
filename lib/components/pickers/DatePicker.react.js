/** @jsx React.DOM */
var React = require("react");
var _ = require("underscore");
var moment = require("moment");

var DatePicker = React.createClass({
  getDefaultProps: function() {
    return {
      // defaultDate: moment(Procore.Environment.date).format("MM/DD/YY")
    };
  },
  render: function() {
    var input = (
      <input placeholder="Select a date"
        className="datepicker"
        onChange={this._onChange}
        value={this.props.date}/>
      );
    return input;
  },
  componentDidMount: function() {
    this.renderDatePicker();

    $(node).focus(function(){
      $(node).datepicker("show");
    });
    this.props.onChange && this.props.onChange(this.props.date);
  },
  renderDatePicker: function() {
    var datePick = this;
    $(this.getDOMNode()).datepicker({
      onSelect: function(dateText){
        datePick._onChange(dateText);
      },
      showOn: "button",
      buttonImage: "/assets/calendar_date_select/calendar_icon.png",
      buttonImageOnly: true,
      disabled: !this.props.editable
    });
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.editable !== this.props.editable) {
      this.setDisabled(!nextProps.editable);
    } else if (!nextProps.date) {
      this.props.onChange && this.props.onChange(this.props.defaultDate);
    }
  },
  componentWillUnmount: function() {
    $(this.getDOMNode()).datepicker("destroy");
  },
  setDisabled: function(disabled) {
    $(this.getDOMNode()).datepicker(disabled ? "disable" : "enable");
    $(this.getDOMNode()).datepicker("option", "disabled", disabled);
  },
  _onChange: function(date) {
    this.props.onChange(date);
  }
});

module.exports = DatePicker;
