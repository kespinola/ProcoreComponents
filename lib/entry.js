var React = require("react");
var ActionButton = require("./components/sidebar/ActionButton.react");
var FilterPane = require("./components/sidebar/FilterPane.react");
require('./shims')();

var ProcoreComponents = {
  Mixins: {
    UtilityMixin: require('./mixins/UtilityMixin')
  },
  Components: {
    MainPanelButtons: require("./components/MainPanelButtons.react"),
    ObjectTest: require("./components/Object.react"),
    List: require("./components/List.react"),
    Paginate: require("./components/Paginate.react"),
    Paginator: require("./components/Paginator.react"),
    Transformer: require("./components/Transformer.react"),
    Collection: require("./components/Collection.react"),
    CollectionTable: require("./components/CollectionTable.react"),
    Debug: require("./components/Debug.react"),
    If: require("./components/If.react"),
    Input: require("./components/Input.react"),
    Breadcrumbs: require('./components/Breadcrumbs.react'),
    BreadcrumbActions: require('./actions/BreadcrumbActions'),
    Page: require('./components/Page.react'),
    Select: require('./components/Select.react'),
    Ajaxer: require('./components/Ajaxer.react'),
    FlexTableManager: require('./components/table/FlexTableManager.react'),
    AttachmentList: require('./components/AttachmentList.react'),
    BetaFeedbackPopup: require('./components/BetaFeedbackPopup.react'),
    ToolHeader: require('./components/ToolHeader.react'),
    TextArea: require("./components/TextArea.react"),
  },
  Pickers: {
    SingleSelect2: require('./components/pickers/SingleSelect2.react'),
    TradePicker: require('./components/pickers/TradePicker.react'),
    ResponsibilityPicker: require('./components/pickers/ResponsibilityPicker.react'),
    LocationPicker: require('./components/pickers/LocationPicker.react'),
    StatusPicker: require('./components/pickers/StatusPicker.react')
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
