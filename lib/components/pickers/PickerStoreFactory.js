var TradeActions = require('../actions/TradeActions');
var StoreSynchronizer = require('../stores/StoreSynchronizer');
var DefaultStoreActions = require('../actions/DefaultStoreActions');
var Reflux = require("reflux");

var stores = {};

function PickerStoreFactory(resourceType, actions) {
  if (stores[resourceType]) return stores[resourceType];
  var store = Reflux.createStore({
    listenables: actions,
    _collections: {},
    resourceType: resourceType,
    StoreActions: DefaultStoreActions()
  });

  var PickerStoreSynchronizer = StoreSynchronizer(store, null);
  stores[resourceType] = store;
  return store;
}

module.exports = PickerStoreFactory;
