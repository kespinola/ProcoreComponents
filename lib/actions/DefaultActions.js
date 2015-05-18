// Flux Actions
var Reflux = require('reflux');

var DefaultActions = function() {
  return Reflux.createActions([
    "addObject",
    "createObject",
    "getCreatedObject",
    "getObject",
    "setObject",
    "updateObject",
    "deleteObject",
    // "clearDbActions",
    // "replaceObjectId",
    // "replaceCollectionId",
    "getCollection",
    "setCollection",
    "addCollection",
    "deleteCollection",
    // "syncResource",
    "setLiveEdit",
    "sortCollection"
  ]);
}

module.exports = DefaultActions;
