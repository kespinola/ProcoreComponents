var Reflux = require('reflux');
var arrayToHash = require("../lib/arrayToHash");
var Q = require("q");
var _ = require("underscore");
var ChecklistClient = require("Checklists/clients/ChecklistClient");
var UML = require("../docs/UML.js");
var PageActions = require("../actions/PageActions");


var StoreSynchronizer = function(store, parentStore) {
  var synchronizer = _.extend(
    SynchronizerMethods(store, parentStore),
    Reflux.ListenerMethods,
    Reflux.PublisherMethods
  );
  synchronizer.init();
  return synchronizer;
};

var SynchronizerMethods = function(store, parentStore) {
  var synchronizerMethods = {
    init: function() {
      this.listenTo(store.StoreActions.reload, this.reload);
      this.listenTo(store.StoreActions.loadObject, this.loadObject);
      this.listenTo(store.StoreActions.loadObjectSuccess, this.loadObjectSuccess);
      this.listenTo(store.StoreActions.saveObject, this.saveObject);
      this.listenTo(store.StoreActions.saveObjectSuccess, this.saveObjectSuccess);
      this.listenTo(store.StoreActions.saveCollectionSuccess, this.saveCollectionSuccess);
      this.listenTo(store.StoreActions.loadCollection, this.loadCollection);
      this.listenTo(store.StoreActions.loadCollectionSuccess, this.loadCollectionSuccess);
      this.listenTo(store.StoreActions.loadResources, this.loadResources);

      this.listenTo(store.StoreActions.replaceObjectId, this.replaceObjectId);
      if(parentStore){
        var parentStoreActions = parentStore.StoreActions;
        this.listenTo(parentStoreActions.saveCollection, this.saveCollection);
        this.listenTo(parentStoreActions.replaceCollectionId, this.replaceCollectionId);
//        this.listenTo(parentStoreActions.setUrls, this.setUrls);
//        this.listenTo(parentStoreActions.setUrl, this.setUrl);
        this.listenTo(parentStoreActions.reloadSuccess, this.reloadCollection);
      }
    },
    umlResourceName: function (resource) {
      if (resource === "Synchronizer" )
        return store.getResourceType() + "_synchronizer";
      else
        return resource.getResourceType() + "_store";
    },
    sequenceLog: function(caller, callee, line, description) {
      caller = this.umlResourceName(caller);
      callee = this.umlResourceName(callee);
      UML.log(caller, callee, line, description);
    },

    saveCollection: function(parent, manual) {
      parent.nestedDbActions = parent.nestedDbActions || {};
      parent.nestedDbActions[store.resourceType] = "pending";

      if(parent && (parent.child_url || parent.child_urls) ) store.setUrl(parent);

      var collectionRequests = _.map(store.getRawCollection(parent.id), function(object) {
        if (parentStore.syncDisabled && parentStore.syncDisabled(store.resourceType)) object.dbAction = null;
        return this.saveObject(parent, object, manual);
      }.bind(this));
      return Q.all(collectionRequests).then( function() {
        parentStore.StoreActions.saveCollectionSuccess(parent, store.resourceType, manual);
      });
    },
    saveCollectionSuccess: function(object, resourceType, manual) {
      object.dbAction = null;
      if(object.nestedDbActions) object.nestedDbActions[resourceType] = null;
      var stillSaving = _.filter(object.nestedDbActions,
        function(nestedAction) { return nestedAction != null }
      );
      stillSaving.length < 1 && store.StoreActions.saveAllCollectionsSuccess(object, manual);
      this.trigger("change", null, object);
    },
    isCollectionSaveSuccess: function(parent) {
      var stillSaving = _.filter(store.getCollection(parent.id), function(object) {
        return object.dbAction != null || object.nestedDbActions != null;
      });
      return stillSaving.length < 1;
    },
    replaceObjectId: function(parent, object, tempObject ) {
      store.deleteObject(parent, tempObject, true, false);
      store.setObject(parent.id, object);
      store.trigger("change", parent, object);
    },
    replaceCollectionId: function(collectionId, tempCollectionId) {
      var objects = store.getRawCollection(tempCollectionId);

      _.each(objects, function(object){
        object.parent_id = collectionId;
        object.dbAction = "create";
      });

      store.setCollection(collectionId, objects);
      store.deleteCollection(tempCollectionId, true);
      store.trigger("change", {id:collectionId}, null);
    },
    reloadCollection: function(parent, object) {
      this.loadCollection(object, true);
    },

    reload: function(parent, objectId) {
      this.loadObject(parent, objectId, true);
    },
    loadObject: function(parent, objectId, reload) {
      var url = store.getUrl(parent);
      ChecklistClient.getObject(url, objectId, store.resourceType).then(function(object){
        store.StoreActions.loadObjectSuccess(parent, object, reload);
        reload && store.StoreActions.reloadSuccess( parent, object);

        var nestedResources = object.load_urls;
        if (!nestedResources) return;
        _.each(nestedResources, function(resourceUrl, resourceType) {
          var nestedStore = store.getStore(resourceType);
          if(nestedStore && nestedStore.StoreActions) {
            nestedStore.StoreActions.loadResources(resourceUrl, resourceType);
          }
        });

      });
    },
    loadResources: function(url, resourceType) {
      ChecklistClient.getCollection(url, resourceType).done(this.loadResourceSuccess.bind(this));
    },
    loadResourceSuccess: function(collection) {
      var collection = _.groupBy(collection, function(object){
        return object.parent_id;
      });

      _.each(Object.keys(collection), function(key) {
        this.loadCollectionSuccess({id: key}, collection[key]);
      }.bind(this));
      store.StoreActions.loadResourcesComplete();
    },
    loadObjectSuccess: function(parent, object) {
      object = store.deserialize(object);
      store.setObject(parent.id, object);
      store.trigger("change", parent, object);
    },
    saveObject: function(parent, object, manual) {
      var dbParent = (object.old_parent) ? object.old_parent : parent;
      var url = store.getUrl(dbParent);
      var syncMethod = ResourceMethods[object.dbAction];
      var syncRequest = syncMethod && syncMethod.call(this, url, parent, object);
      return Q.when(syncRequest).then( function(response) {
        if (object.dbAction ==="create") object = response;
        else if (object.dbAction === "update") {
          object = store.getObject(parent.id, object.id);
          object = _.extend(object, response);
        }
        store.StoreActions.saveObjectSuccess(parent, object, manual);
        store.StoreActions.setUrl(object);
      });
    },
    saveObjectSuccess: function(parent, object, manual) {
      if( object.dbAction !== "delete") {
        store.StoreActions.saveCollection(object, manual);
      }else{
        store.StoreActions.saveCollectionSuccess(object, store.resourceType, manual);
      }
      object.dbAction = null;
      if(parentStore && this.isCollectionSaveSuccess(parent))
        parentStore.StoreActions.saveCollectionSuccess(parent, store.resourceType, manual);
      store.trigger("change", parent, object);
    },
    loadCollection: function(parent, reload) {
      var url = store.getUrl(parent);
      if(!url) {
        console.warn("Collection needs a valid parent url. (ressourceType: ", store.resourceType, ")");
      }else{
        ChecklistClient.getCollection(url, store.getResourceType()).then(function(collection) {
          store.StoreActions.loadCollectionSuccess(parent, collection, reload);
        });
      }
    },
    loadCollectionSuccess: function(parent, collection, reload) {
      collection = _.map(collection, function(object){
        reload && store.StoreActions.reloadSuccess(parent, object);
        return store.deserialize(object);
      }.bind(this));
      store.setCollection(parent.id, collection);
      store.StoreActions.setUrls(collection);
      store.trigger("change", parent, collection);
    }
  };

  var ResourceMethods = {
    create: function(url, parent, object) {
      object = store.serialize(object);
      var syncRequest = ChecklistClient.addObject(url, object, store.getResourceType())
      .then(function(newObject){
        store.StoreActions.replaceObjectId(parent, newObject, object);
        store.StoreActions.replaceCollectionId(newObject.id, object.id);
        return newObject;
      }.bind(this));
      return syncRequest;
    },
    update: function(url, parent, object) {
      object = store.serialize(object);
      var syncRequest = ChecklistClient.updateObject(url, object, store.getResourceType());
      return syncRequest;
    },
    "delete": function(url, parent, object) {
      var syncRequest = ChecklistClient.deleteObject(url, object, store.getResourceType())
      .then(function(data){
        if (data) return store.setObject(parent.id, data);
        store.deleteObject(parent, object, true, false);
      });
      return syncRequest;
    }
  };

  return synchronizerMethods;
};
module.exports = StoreSynchronizer;
