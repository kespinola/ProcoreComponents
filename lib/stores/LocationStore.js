var LocationActions = require('../actions/LocationActions');
var StoreSynchronizer = require('../stores/StoreSynchronizer');
var Reflux = require("reflux");
var DefaultStoreActions = require('../actions/DefaultStoreActions');

var LocationStore = Reflux.createStore({
  listenables: LocationActions,
  _collections: {},
  resourceType: "locations",
  StoreActions: DefaultStoreActions()
});

var LocationStoreSynchronizer = StoreSynchronizer(LocationStore, null);

module.exports = LocationStore;
