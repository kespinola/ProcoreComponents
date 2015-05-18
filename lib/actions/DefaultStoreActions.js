'use strict';
var Reflux = require("reflux");

var DefaultStoreActions = function() {
  return Reflux.createActions([
    "loadObject",
    "loadObjectSuccess",
    "loadCollection",
    "loadCollectionSuccess",
    "saveCollection",
    "saveCollectionSuccess",
    "saveAllCollectionsSuccess",
    "saveObject",
    "saveObjectSuccess",
    "replaceCollectionId",
    "replaceObjectId",
    "reload",
    "reloadCollection",
    "reloadSuccess",
    "loadResources",
    "loadResourcesComplete",
    "setUrls",
    "setUrl"
  ]);
};

module.exports = DefaultStoreActions;
