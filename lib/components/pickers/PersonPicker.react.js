/** @jsx React.DOM */
'use strict';

var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");

var PickList = require("./PickList.react");

var VendorStore = require("ProcoreComponents/stores/VendorStore");
var VendorActions = require("ProcoreComponents/actions/VendorActions");

var createPickerMixin = require("ProcoreComponents/mixins/createPickerMixin");
var PickerMixin = createPickerMixin(VendorStore, VendorActions);


var PersonPicker = React.createClass({
  mixins: [
    PickerMixin,
    Reflux.ListenerMixin
  ],
  render: function() {
    var showPicker = this.props.multiSelect || (this.state.selectedTokens.length || 0) < 1;
    return (
      <div className={"tokenPicker " + this.props.className}>
      { showPicker && this.renderPicker(this.state.objects) }
      <PickList
        items={this.state.selectedTokens}
        editable={this.props.editable}
        onRemove={this._deSelect} />
      </div>
    );
  }
});

module.exports = PersonPicker;
