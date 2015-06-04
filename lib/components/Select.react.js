/** @jsx React.DOM */
var React = require("react");
var ReactPropTypes = React.PropTypes;
var _              = require("underscore");
var cx = require("react/lib/cx");
var sa             = require("superagent");

var Select = React.createClass({
  propTypes: {
    data:        React.PropTypes.array,
    key:         React.PropTypes.string,
    onChange:    React.PropTypes.func,
    placeHolder: React.PropTypes.string.isRequired,
    removable:   React.PropTypes.bool.isRequired,
  },
  getInitialState: function() {
    return({
      active: this.props.active,
      chosen: ''
    })
  },
  getDefaultProps: function() {
    return {data: []}
  },
  componentDidUpdate: function() {
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
    return (this.props.removable && this.state.chosen != '') ?  this.props.placeHolder + ": " + this.state.chosen : this.props.placeHolder
  },
  removeHandler: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onRemove(this.props.qi);
  },
  styleHandler: function() {
    var pickerClasses = cx({
      'deaddrop': true,
      'active':   this.state.active,
    });
    var caretClasses = cx({
      'right':         true,
      'fa':            true,
      'fa-caret-down': !this.state.active,
      'fa-caret-up':   this.state.active,
    });
    var removeClasses = cx({
      'fa':       this.props.removable,
      'fa-times': this.props.removable,
    });
    return { pickerClasses, caretClasses, removeClasses }
  },
  render: function() {
    var listener    = this.clickHandler;
    var styles      = this.styleHandler();
    var placeHolder = this.placeHolderHandler();
    return(
      <div onClick={this.expandHandler} className={styles.pickerClasses} onBlur={this.blurHandler} tabIndex="0">
        <i className={styles.removeClasses} onClick={this.removeHandler}></i>
        {placeHolder}
        <ul>
          {
            this.props.data.map(function(option) {
              return <li data-value={option.key} onClick={listener.bind(null, option)} key={option.key}>{option.value}</li>
              })
          }
        </ul>
        <i className={styles.caretClasses} onClick={this.removeHandler}></i>
      </div>
    )
  }
});

module.exports = Select;
