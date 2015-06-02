
var React = require("react");
var ActionButton = require("./components/sidebar/ActionButton.react");
var FilterPane = require("./components/sidebar/FilterPane.react");
require('./shims')();

var ProcoreComponents = {
  Mixins: {
    UtilityMixin: require('./mixins/UtilityMixin')
  },
  Components: {
    ObjectTest: require("./components/Object.react"),
    List: require("./components/List.react"),
    Collection: require("./components/Collection.react"),
    CollectionTable: require("./components/CollectionTable.react"),
    Debug: require("./components/Debug.react"),
    If: require("./components/If.react"),
    Input: require("./components/Input.react"),
    Breadcrumbs: require('./components/Breadcrumbs.react'),
    BreadcrumbActions: require('./actions/BreadcrumbActions'),
    Page: require('./components/Page.react'),
    SingleSelect2: require('./components/pickers/SingleSelect2.react'),
    FlexTableManager: require('./components/table/FlexTableManager.react'),
    AttachmentList: require('./components/AttachmentList.react'),
    BetaFeedbackPopup: require('./components/BetaFeedbackPopup.react'),
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
