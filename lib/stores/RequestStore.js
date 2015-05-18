var Reflux = require('reflux');
var _ = require('underscore');
var q = require('q');
var superagent = require('superagent');
var RequestActions = require('../actions/RequestActions');

function createRequest(resourceType, params, object) {
  var deferred = q.defer();

  superagent[params.type](params.url)
    .send(params.data)
    .end(function(error, res){
      if (error) return deferred.reject(error);
      else if (300 < res.status && res.status < 500){
        console.warn("Request error thrown", res.status);
        var errors;
        if (res.body && res.body.errors) errors = res.body.errors;
        else errors = res.error;
        RequestActions.throwError(resourceType, object, errors);
      }
      RequestActions.complete(resourceType, object && object.id || resourceType);
      return deferred.resolve(res.body);
    });

  return deferred.promise;
};

var RequestStore = Reflux.createStore({
  /**************
  *   PRIVATE   *
  ***************/
  listenables: RequestActions,
  _collections: {},
  _completions: {},
  _generateCompletion: function(zeroPercentage) {
    return {
      complete: 0,
      total: 0,
      percentage: (zeroPercentage) ? 0 : 1
    };
  },
  _resetCompletion: function(resourceType) {
    resourceType = resourceType || "aggregate";
    this._completions[resourceType] = { total: 0, complete: 0, percentage: 1 }
    this.trigger("done", resourceType);
  },
  _incrementTotal: function(resourceType) {
    resourceType = resourceType || "aggregate";
    this._completions[resourceType] = this._completions[resourceType] || this._generateCompletion();
    var completion = this._completions[resourceType];
    completion.total += 1;
    completion.percentage = completion.complete/completion.total;
    this._completions[resourceType] = completion;
  },
  _incrementComplete: function(resourceType) {
    resourceType = resourceType || "aggregate";
    var completion = this._completions[resourceType];
    completion.complete += 1;
    completion.percentage = completion.complete/completion.total;
    this._completions[resourceType] = completion;
    setTimeout(function() {
      if (completion.percentage === 1){
        this._resetCompletion(resourceType);
      }
    }.bind(this), 500);
  },
  _updateCompletions: function(operation, resourceType) {
    switch(operation) {
      case "push":
        this._incrementTotal(resourceType);
        this._incrementTotal();
        break;
      case "pop":
        this._incrementComplete(resourceType);
        this._incrementComplete();
        break;
      default:
        break;
    }
  },
  _pushRequest: function(resourceType, request, object) {
    if(!this._collections[resourceType]) this._collections[resourceType] = [];
    var collection = this._collections[resourceType];
    collection.push({object: object, request: request});
    this._updateCompletions("push", resourceType);
  },
  _popRequest: function(resourceType, objectId) {
    var collection = this._collections[resourceType];

    this._collections[resourceType] = _.reject(collection, function(requestObject){
      return requestObject.object.id === objectId;
    });
    this._updateCompletions("pop", resourceType)
  },
  /**************
  *   Public    *
  ***************/
  create: function(resourceType, params, object) {
    var request = createRequest(resourceType, params, object);
    this._pushRequest(resourceType, request, object);
    this.trigger("requestCreated", resourceType, object);
    return request;
  },
  complete: function(resourceType, id) {
    this._popRequest(resourceType, id);
    this.trigger("requestCompleted", resourceType, {id: id});    
  },
  getRequests: function() {
    var array = [];
    for(var key in this._collections) {
      array = array.concat(this._collections[key]);
    }
    return array;
  },
  getRequestsForResource: function(resourceType) {
    return this._collections[resourceType] || [];
  },
  getRequest: function(resourceType, id) {
    var collection = this._collections[resouceType];
    return _.findWhere(collection, {id: id});
  },
  getPercentComplete: function() {
    return this._completions["aggregate"];
  },
  completionForResource: function(resourceType) {
    return this._completions[resourceType] || this._generateCompletion();
  },
  completionForResources: function(resourceTypes) {
    var totalCompletion = this._generateCompletion(true);
    _.each(resourceTypes, function(resourceType){
      totalCompletion.total += this.completionForResource(resourceType).total;
      totalCompletion.complete += this.completionForResource(resourceType).complete;
      totalCompletion.percentage += this.completionForResource(resourceType).percentage / resourceTypes.length;
    }.bind(this));
    return totalCompletion;
  }
})

module.exports = RequestStore;
