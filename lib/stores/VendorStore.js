var VendorActions = require('../actions/VendorActions');
var DefaultStoreActions = require('../actions/DefaultStoreActions');
var StoreSynchronizer = require('../stores/StoreSynchronizer');
var Reflux = require("reflux");

var VendorStore = Reflux.createStore({
  listenables: VendorActions,
  resourceParentType: "lists",
  resourceType: "vendors",
  foreignKey: "list_id",
  _collections: {},
  StoreActions: DefaultStoreActions()
});
var VendorStoreSynchronizer = StoreSynchronizer(VendorStore, null);

module.exports = VendorStore;
