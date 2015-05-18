/** @jsx React.DOM */
var React = require("react");
var ActionButton = require("./components/sidebar/ActionButton.react");
var FilterPane = require("./components/sidebar/FilterPane.react");

require('./shims')();

var ProcoreComponents = {
  Mixins: {
    Initialize: require('./mixins/Initialize'),
    CreatePickerMixin: require('./mixins/createPickerMixin')
  },
  Components: {
    Collection: require("./components/Collection.react"),
    Input: require("./components/Input.react"),
    PersonPicker: require('./components/pickers/PersonPicker.react'),
    DatePicker: require('./components/pickers/DatePicker.react'),
    LocationPicker: require('./components/pickers/LocationPicker.react'),
    TradePicker: require('./components/pickers/TradePicker.react'),
    SpecSectionPicker: require('./components/pickers/TradePicker.react'),
    ResponsibleContractorPicker: require('./components/pickers/ResponsibleContractorPicker.react'),
    ResponsiblePartyPicker: require('./components/pickers/ResponsiblePartyPicker.react'),
    Breadcrumbs: require('./components/Breadcrumbs.react'),
    Page: require('./components/Page.react'),
    SingleSelect2: require('./components/pickers/SingleSelect2.react'),
    FlexTableManager: require('./components/table/FlexTableManager.react')
  },
  Sidebar: {
    Buttons: {
      action: ActionButton
    },
    Filters: {
      picker: FilterPane
    }
  },
  Stores: {
    DefaultStore: require('./stores/DefaultStore'),
    LocationStore: require('./stores/LocationStore'),
    SpecSectionStore: require('./stores/SpecSectionStore'),
    TradeStore: require('./stores/TradeStore'),
    VendorStore: require('./stores/VendorStore')
  },
  Actions: {
    DefaultActions: require('./actions/DefaultActions')
  }
};
window.ProcoreComponents = ProcoreComponents;
module.exports = ProcoreComponents;
