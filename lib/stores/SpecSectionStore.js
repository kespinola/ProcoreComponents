var SpecSectionActions = require('../actions/SpecSectionActions');
var StoreSynchronizer = require('../stores/StoreSynchronizer');
var DefaultStoreActions = require('../actions/DefaultStoreActions');
var Reflux = require("reflux");

var SpecSectionStore = Reflux.createStore({
  listenables: SpecSectionActions,
  _collections: {},
  resourceType: "specification_sections",
  StoreActions: DefaultStoreActions()
});

var SpecSectionStoreSynchronizer = StoreSynchronizer(SpecSectionStore, null);

module.exports = SpecSectionStore;
