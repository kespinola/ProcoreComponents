var TradeActions = require('../actions/TradeActions');
var StoreSynchronizer = require('../stores/StoreSynchronizer');
var DefaultStoreActions = require('../actions/DefaultStoreActions');
var Reflux = require("reflux");
Reflux.StoreMethods = require('../stores/DefaultStore');

var TradeStore = Reflux.createStore({
  listenables: TradeActions,
  _collections: {},
  StoreActions: DefaultStoreActions(),
  resourceType: "trades"
});

var TradeStoreSynchronizer = StoreSynchronizer(TradeStore, null);

module.exports = TradeStore;
