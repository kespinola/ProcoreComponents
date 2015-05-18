var StoreUtils = require("../utils/StoreUtils");
var Reflux = require("reflux");
var RefluxPromises = require("./RefluxPromises");
var _ = require('underscore');


Reflux.StoreMethods.init = function() {
  this._filteredCollections = {};
  this._collections = {};
  this.customInit && this.customInit();
};

Reflux.StoreMethods.setLiveEdit = function(liveEdit) {
  if (liveEdit === undefined) return;
  this.liveEdit = liveEdit;
};

Reflux.StoreMethods.getStore = function(resourceType) {
  return Procore.Stores[resourceType] || {};
},

/***************************************
 * OBJECT CRUD
 ***************************************/
Reflux.StoreMethods.getObject = function(collectionId, objectId) {
  var collection = this.getRawCollection(collectionId);
  var object = _.find(collection, function(object){
    return (object.id == objectId);
  }, this);
  return object || null;
};
Reflux.StoreMethods.getRawObject = function(collectionId, objectId) {
  var collection = this.getRawCollection(collectionId);
  var object = _.find(collection, function(object){
    return (object.id == objectId);
  }, this);
  return object || null;
};
Reflux.StoreMethods.setObject = function(collectionId, object) {
  var collection = this._collections[collectionId] || [];
  object.id = object.id || StoreUtils.generateTempId();
  var oldObject = this.getObject(collectionId, object.id);
  collection = _.reject(collection, function(checking){
    return checking.id == object.id;
  });
  collection.push(object);
  this._collections[collectionId] = collection;
  this.filterAndSortCollections();
  if((!oldObject || ((oldObject && !oldObject.child_urls)) && object.child_urls)){
    this.trigger("setCollection", {id: collectionId}, object);
  }
};
Reflux.StoreMethods.addObject = function(parent, object, trigger) {
  object = object || this.defaultObject(parent);
  object.dbAction = "create";
  object.id = object.id || StoreUtils.generateTempId();
  object.parent_id = parent.id;
  this.setObject(parent.id, object);
  if(trigger !== false) this.autoSave(parent, object, trigger);
  return object;
};
Reflux.StoreMethods.updateObject = function(parent, object, trigger) {
  object.dbAction = object.dbAction || "update";
  this.setObject(parent.id, object);
  if(trigger !== false) this.autoSave(parent, object, trigger);
};
Reflux.StoreMethods.updateObjectAttribute = function(parent, params, trigger) {
  var object = this.getObject(parent.id, params.id);
  object.dbAction = object.dbAction || "update";
  object = _.merge(object, params);
  this.setObject(parent.id, object);
  if(trigger !== false) this.autoSave(parent, object, trigger);
};
Reflux.StoreMethods.deleteObject = function(parent, object, remove, trigger) {
  object = this.getRawObject(parent.id, object.id);
  if (!remove && object.dbAction !== "create") {
    object.dbAction = "delete";
  } else if(object !== null) {
    this.removeObject(parent, object);
  }
  this.filterAndSortCollections();
  if(trigger !== false) this.autoSave(parent, object, trigger);
};

Reflux.StoreMethods.removeObject = function(parent, object) {
  var collection = this.getRawCollection(parent.id);
  this._collections[parent.id] = _.reject(collection, function(collectionObject){
    return collectionObject.id == object.id;
  });
};

Reflux.StoreMethods.autoSave = function(parent, object, trigger) {
  if(( this.liveEdit || trigger === "save" ) && trigger !== "local") this.StoreActions.saveObject(parent, object);
  else this.trigger("change", parent, object);
};

/***************************************
 * COLLECTION CRUD
 ***************************************/

Reflux.StoreMethods.addCollection = function(id, collection) {
  // collection.dbAction = "create";
  this._collections[id] = collection;
  this.emitSyncRequest("create_collection", {object: object});
};
Reflux.StoreMethods.deleteCollection = function(id, remove) {
  // this._collections[id].dbAction = "delete";
  remove && delete this._collections[id];
};
Reflux.StoreMethods.setCollection = function(id, collection) {
  this._collections[id] = collection;
  this.filterAndSortCollections();
  var parent = {id: id};
  this.StoreActions.setUrls(collection);
  return this.trigger("setCollection", parent, collection);
};
Reflux.StoreMethods.setUrl = function(parent) {
  var url = parent.child_urls && parent.child_urls[this.resourceType] || parent.child_url;
  this._urls[parent.id] = url;
};
Reflux.StoreMethods.getUrl = function(parent) {
  var url = this._urls && this._urls[parent.id];
  url = url ? url : parent.child_urls && parent.child_urls[this.resourceType];
  url = url ? url : parent.child_url;
  return url;
};
Reflux.StoreMethods.setUrls = function(collection) {
  _.each(collection, function(object) {
    this.StoreActions.setUrl(object);
  }, this);
};
Reflux.StoreMethods.getCollection = function(id) {
  this._filteredCollections[id] = this._filteredCollections[id] || [];
  return this._filteredCollections[id];
};
Reflux.StoreMethods.getRawCollection = function(id) {
  this._collections[id] = this._collections[id] || [];
  return this._collections[id];
};
Reflux.StoreMethods.getCollectionArray = function(collections) {
  var allSubCollections=[];
  for(var key in collections) {
    allSubCollections.push(getCollection(collections[key].id));
  }
  return allSubCollections;
};
Reflux.StoreMethods.getCollections = function() {
  return this._filteredCollections;
};
Reflux.StoreMethods.getRawCollections = function() {
  return this._collections;
};

/***************************************
 * SORT/FILTER/SEARCH METHODS
 ***************************************/
Reflux.StoreMethods.sortCollection = function(parent, objectIds, previousParent) {
  var collection = this.getCollection(parent.id);
  var position = 1;
  _.each(objectIds, function(objectId) {
    var object = this.getRawObject(parent.id, objectId);
    object = object || (previousParent && this.changeCollection(previousParent, parent, objectId)) || {};
    if(object.position === position) {
      position++;
      return;
    }
    object.position = position;
    if (object.dbAction !== "create" && object.dbAction !== "delete")
      object.dbAction = "update";
    position++;
  }.bind(this));
  this.trigger("change", parent, null);
};
Reflux.StoreMethods.setSortConfig = function(config){
  this.sortConfig = config;
  this.filterAndSortCollections();
  this.trigger("setSortConfig");
};
Reflux.StoreMethods.sortCollections = function(){
  var collections = this._filteredCollections;
  for(var key in collections){
    this._filteredCollections[key] = StoreUtils.sort(this.sortConfig, collections[key]);
    this.refreshCollectionPositions(key);
  }
};

Reflux.StoreMethods.refreshCollectionPositions = function(collectionId){
  if(!this.sortable) return;
  var sortedItems = this._filteredCollections[collectionId];
  var sortedIds = _.map( sortedItems, function(item) { return item.id; });
  this.sortCollection({id: collectionId}, sortedIds);
};

Reflux.StoreMethods.setFilterConfig = function(configs){
  if(!Array.isArray(configs)) configs = [ configs ];
  this.filterConfig = configs;
  this.filterAndSortCollections();
  this.trigger("setFilterConfig");
};
Reflux.StoreMethods.setSearchFilter = function(query){
  this.search = query;
  this.filterAndSortCollections();
  this.trigger("setSearchFilter");
};
Reflux.StoreMethods.searchCollections = function(){
  var collections = this._collections;
  for(var key in collections){
    this._filteredCollections[key] = StoreUtils.search(this.search, this._collections[key]);
  }
};
Reflux.StoreMethods.filterCollections = function(){
  var collections = this._filteredCollections;
  for(var key in collections){
    var filtered = StoreUtils.filter(this.filterConfig, collections[key]);
    // also filter dbAction delete - maybe move that out somewhere.
    this._filteredCollections[key] = _.reject(filtered, function(object) {
      return object.dbAction === "delete";
    });
  }
};
Reflux.StoreMethods.queryCollection = function(collectionId, query){
  var collection = this.getCollection(collectionId);
  return _.where(collection, query);

};
Reflux.StoreMethods.filterAndSortCollections = function() {
  this.searchCollections();
  this.filterCollections();
  this.sortCollections();
};

/***************************************
 * QUERY METHODS
 ***************************************/

function appendUniqueValuesToArray(array, object){
  _.each(Object.keys(object), function(key){
    var values = [];
    if(!array[key]) array[key] = [];

    switch( Object.prototype.toString.call(object[key]) ){
      case "[object Array]":
        values = _.map(object[key], function(obj){
          return obj.name || null;
        });
        break;
      case "[object Object]":
        values = [ object[key].name || null ];
        break;
      default:
        values = [ object[key] ];
        break;
    }

    _.each(values, function(value){
      if(!_.contains(array[key], value)){
        array[key].push(value);
      }
    });

    array[key] = _.compact(array[key]);
  });
  return array;
}

function uniqueKeyValues(array, objects){
  _.each(objects, function(object){
    array = appendUniqueValuesToArray(array, object);
  });
  return array;
}

Reflux.StoreMethods.uniqueKeysAndValues = function() {
  var collections = this._collections;
  var values = {};

  for(var key in collections){
    var objects = collections[key];
    values = uniqueKeyValues(values, objects)
  }
  return values;
};

/***************************************
 * UTILITY METHODS
 ***************************************/
Reflux.StoreMethods.changeCollection = function(fromCollection, toCollection, objectId) {
  var emitTrigger = false;
  var object = this.getRawObject(fromCollection.id, objectId);
  this.deleteObject(fromCollection, object, true, emitTrigger);
  var oldDbAction = object.dbAction;
  this.addObject(toCollection, object, emitTrigger);
  if ( oldDbAction !== "create" ) object.dbAction = "update";
  object.old_parent = object.old_parent || fromCollection;
  return object;
};
Reflux.StoreMethods.getResourceType = function() {
  return this.resourceType;
};
Reflux.StoreMethods.serialize = function(object) {
  if (!this.serializer) return object;
  return this.serializer(object);
};

Reflux.StoreMethods.deserialize = function(object) {
  if (!this.deserializer) return object;
  return this.deserializer(object);
};


module.exports = Reflux.StoreMethods;
