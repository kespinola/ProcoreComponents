/** @jsx React.DOM */
'use strict';

var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");

var SingleSelect2 = require("./SingleSelect2.react");
var MultiSelect2 = require("./MultiSelect2.react");
var PickerStoreFactory = require("ProcoreComponents/stores/PickerStoreFactory");
var PickerActionFactory = require("ProcoreComponents/actions/PickerActionFactory");
var createPickerMixin = require("ProcoreComponents/mixins/createPickerMixin");

var generatedPickers = {};

function PickerFactory(resourceType) {
  if (generatedPickers[resourceType]) return generatedPickers[resourceType];

  var PickerActions = PickerActionFactory(resourceType);
  var PickerStore = PickerStoreFactory(resourceType, PickerActions);
  var PickerMixin = createPickerMixin(PickerStore, PickerActions);

  var Picker = React.createClass({
    mixins: [
      PickerMixin,
      Reflux.ListenerMixin
    ],
    render: function() {
      if (this.props.multiSelect){
        return (
          <div className={this.props.className}>
            <MultiSelect2
              options={this.state.objects}
              multiSelect={this.props.multiSelect}
              createOption={this.props.createOption}
              placeholder={this.props.placeholder}
              filterSelected={this.props.filterSelected}
              selectedTokens={this.state.selectedTokens}
              editable={this.props.editable}
              onSelect={this._onSelect}
              onRemove={this._deSelect}
              onCreate={this._onCreate}
              quickAdd={this.props.quickAdd}/>
          </div>
        );
      }
      else {
        return (
          <div className={this.props.className}>
            <SingleSelect2
              options={this.state.objects}
              createOption={this.props.createOption}
              placeholder={this.props.placeholder}
              filterSelected={this.props.filterSelected}
              selectedTokens={this.state.selectedTokens}
              editable={this.props.editable}
              onSelect={this._onSelect}
              onCreate={this._onCreate}
              quickAdd={this.props.quickAdd}/>
          </div>
        );
      }
    }
  });
  generatedPickers[resourceType] = Picker;
  return Picker;
}

module.exports = PickerFactory;
