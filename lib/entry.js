
var React = require("react");
var ActionButton = require("./components/sidebar/ActionButton.react");
var FilterPane = require("./components/sidebar/FilterPane.react");

require('./shims')();

var ProcoreComponents = {
  Components: {
    Collection: require("./components/Collection.react"),
    Input: require("./components/Input.react"),
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
    DefaultStore: require('./stores/DefaultStore')
  },
  Actions: {
    DefaultActions: require('./actions/DefaultActions')
  }
};
window.ProcoreComponents = ProcoreComponents;
module.exports = ProcoreComponents;