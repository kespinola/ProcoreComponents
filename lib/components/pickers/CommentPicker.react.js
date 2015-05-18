/** @jsx React.DOM */
var React = require("react");
var _ = require('underscore');
var Input = require('../Input.react');
var cx = require('react/lib/cx');

var CommentPicker = React.createClass({

/*
 * React Methods
 */

/*
 * Render Methods
 */
  render: function() {
    return(
      <div>
        <Input ref="input"
               value={""}
               parentIsEditing={true}
               update={this._handleSubmit}
               validate={true}
               className="react_expandable-textarea"/>
        <div className="margin-top text-align-right">
          <a onClick={this.props.cancel}>Cancel</a>
          <button className="no-style-btn mock-bttn" onClick={this._handleClick}>Add</button>
        </div>
      </div>
      );
  },

/*
 * Handler Methods
 */

  _handleSubmit: function(attribute, value, submit) {
    if (!submit) return;
    else if (value === "" || value === null) return;

    this.props.submit(value);
  },
  _handleClick: function(e) {
    this.refs.input.remoteSubmit();
  }
});

module.exports = CommentPicker;
