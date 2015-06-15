var React = require("react");
var ActionButton = require("./components/sidebar/ActionButton.react");
var FilterPane = require("./components/sidebar/FilterPane.react");
require('./shims')();

var ProcoreComponents = {
  Mixins: {
    UtilityMixin: require('./mixins/UtilityMixin')
  },
  Components: {
    Ajaxer: require('./components/Ajaxer.react'),
    AttachmentList: require('./components/AttachmentList.react'),
    BetaFeedbackPopup: require('./components/BetaFeedbackPopup.react'),
    BreadcrumbActions: require('./actions/BreadcrumbActions'),
    Breadcrumbs: require('./components/Breadcrumbs.react'),
    Collection: require("./components/Collection.react"),
    CollectionTable: require("./components/CollectionTable.react"),
    Container: require("./components/Container.react"),
    Debug: require("./components/Debug.react"),
    FlexTableManager: require('./components/table/FlexTableManager.react'),
    If: require("./components/If.react"),
    Input: require("./components/Input.react"),
    List: require("./components/List.react"),
    MainPanelButtons: require("./components/MainPanelButtons.react"),
    Modal: require('./components/Modal.react'),
    ObjectTest: require("./components/Object.react"),
    Page: require('./components/Page.react'),
    Paginate: require("./components/Paginate.react"),
    Paginator: require("./components/Paginator.react"),
    Select: require('./components/Select.react'),
    TextArea: require("./components/TextArea.react"),
    ToolHeader: require('./components/ToolHeader.react'),
    Transformer: require("./components/Transformer.react"),
    Icon: require("./components/Icon.react"),
  },
  Pickers: {
    DatePicker: require('./components/pickers/DatePicker.react'),
    InspecteePicker: require('./components/pickers/InspecteePicker.react'),
    LocationPicker: require('./components/pickers/LocationPicker.react'),
    ResponsibilityPicker: require('./components/pickers/ResponsibilityPicker.react'),
    SingleSelect2: require('./components/pickers/SingleSelect2.react'),
    SpecSectionPicker: require('./components/pickers/SpecSectionPicker.react'),
    StatusPicker: require('./components/pickers/StatusPicker.react'),
    TradePicker: require('./components/pickers/TradePicker.react'),
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
