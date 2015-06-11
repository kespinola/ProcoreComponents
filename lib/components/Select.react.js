"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;
var _ = require("underscore");
var cx = require("react/lib/cx");
var sa = require("superagent");

var Select = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    key: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeHolder: React.PropTypes.string.isRequired,
    removable: React.PropTypes.bool.isRequired,
    active: React.PropTypes.bool,
    className: React.PropTypes.string
  },
  getInitialState() {
    return ({
      active: this.props.active,
      chosen: ''
    });
  },
  getDefaultProps() {
    return {data: []}
  },
  componentDidUpdate() {
    if (this.state.active) {
      this.getDOMNode().focus();
    }
  },
  blurHandler: function() {
    if (this.props.removable && this.state.chosen == '') {
      this.props.onRemove(this.props.qi);
    } else {
      this.setState({active: false});
    }
  },
  clickHandler: function(option) {
    var val = option.value;
    this.setState({chosen:  val}, this.props.onChange(option));
  },
  expandHandler: function() {
    this.setState({active: !this.state.active});
  },
  placeHolderHandler: function() {
    return (this.props.removable && this.state.chosen != '') ? 
      <span>{this.props.placeHolder}: <b>{this.state.chosen}</b></span> : <span>{this.props.placeHolder}</span>
  },
  removeHandler: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRemove(this.props.qi);
  },
  styleHandler: function() {
    var pickerClasses = cx({
      'pct-picker': true,
      'active': this.state.active,
    });
    var removeClasses = cx({
      'remove': this.props.removable
    });
    return { pickerClasses, removeClasses }
  },
  render: function() {
    var listener    = this.clickHandler;
    var styles      = this.styleHandler();
    var placeHolder = this.placeHolderHandler();
    return(
      <div onClick={this.expandHandler} className={`${styles.pickerClasses} ${this.props.className}`} onBlur={this.blurHandler} tabIndex="0">
        <span className="pct-picker-input">
          <span className={styles.removeClasses} onClick={this.removeHandler}></span>
          {placeHolder}
        </span>

        <ul className="pct-picker-option-list">
          {
            this.props.data.map(function(option) {
              return <li data-value={option.key} onClick={listener.bind(null, option)} key={option.value}>{option.value}</li>
              })
          }
        </ul>
      </div>
    )
  }
});

module.exports = Select;
