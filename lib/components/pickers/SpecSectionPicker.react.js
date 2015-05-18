/** @jsx React.DOM */
'use strict';

var React = require("react");
var Reflux = require("reflux");
var MultiPicker = require("ProcoreComponents/components/pickers/MultiPicker.react");
var _ = require("underscore");

var PickList = require("./PickList.react");

var SpecSectionStore = require("ProcoreComponents/stores/SpecSectionStore");
var SpecSectionActions = require("ProcoreComponents/actions/SpecSectionActions");

var createPickerMixin = require("ProcoreComponents/mixins/createPickerMixin");
var PickerMixin = createPickerMixin(SpecSectionStore, SpecSectionActions);

var SpecSectionPicker = React.createClass({
  mixins: [
    PickerMixin,
    Reflux.ListenerMixin
  ],
  render: function() {
    var showPicker = this.props.multiSelect || this.state.selectedTokens.length < 1;
    return (
      <div className={"tokenPicker " + this.props.className}>
        { showPicker && this.renderAlternatePicker(this.state.objects) }
        <PickList
          items={this.state.selectedTokens}
          editable={this.props.editable}
          onRemove={this._deSelect}
          getLabel={this.getLabel} />
      </div>
    );
  },
  renderAlternatePicker: function (options) {
    var pickers = { number: {}, description: {} };
    return (
      <MultiPicker
        options={this.state.objects}
        fieldPickers={pickers}
        filterSelected={true}
        selectedTokens={this.state.selectedTokens}
        editable={this.props.editable}
        onChange={this._onSelect}
        onCreate={this._onCreate}
        getLabel={this.getLabel}
        quickAdd={this.props.quickAdd}/>
      );
    },
    getLabel: function(object) {
      return [object.number, "-", object.description].join(" ");
    }
});

module.exports = SpecSectionPicker;
