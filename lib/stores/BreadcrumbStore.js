var Reflux = require("reflux");
var BreadcrumbActions = require('../actions/BreadcrumbActions');
var _ = require("underscore");


function flatten(collection) {
  var flattened = {};
  for(var key in collection) {
    var array = collection[key];
    _.forEach(array, function(entry){
      flattened[entry.id] = entry.name;
    });
  }
  return flattened;
}

function BreadcrumbFactory(topStore) {

  var BreadcrumbStoreMethods = {
    _items: {},
    resourceType: "breadcrumbs",
    listenables: BreadcrumbActions,
    init: function() {
      this.listenTo(topStore.StoreActions.loadCollectionSuccess, this.onTopStoreSync);
      this.listenTo(topStore.StoreActions.loadObjectSuccess, this.onTopStoreSync);
      this.listenTo(topStore.StoreActions.saveObjectSuccess, this.onTopStoreSync);
      this.listenTo(topStore.StoreActions.replaceObjectId, this.onTopStoreSync);
    },

    onTopStoreSync: function(eventType, parent, object) {
      this.loadObjects();
    },

    getObject: function(id) {
      return this._items[id];
    },

    setObjects: function(objects) {
      this._items = objects;
      this.trigger("change");
    },

    loadObjects: function() {
      this.setObjects(flatten(topStore.getRawCollections()));
    }
  }

  return Reflux.createStore( BreadcrumbStoreMethods );
}

module.exports = BreadcrumbFactory;
