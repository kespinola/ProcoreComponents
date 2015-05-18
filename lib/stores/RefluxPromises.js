var Reflux = require("reflux");
//var ChainedEmitter = require('chained-emitter').EventEmitter;
//ChainedEmitter.prototype.parallel = true
//Reflux.setEventEmitter(ChainedEmitter);


// These methods override Emitter behavior so that we canexpect promises

Reflux.PublisherMethods.listen = function(callback, bindContext) {
  var eventHandler = function(args) {
    return callback.apply(bindContext, args);
  }, me = this;
  this.emitter.addListener(this.eventLabel, eventHandler);
  return function() {
    me.emitter.removeListener(me.eventLabel, eventHandler);
  };
};


Reflux.PublisherMethods.trigger = function() {
  var args = arguments,
  pre = this.preEmit.apply(this, args);
  args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
  if (this.shouldEmit.apply(this, args)) {
    return this.emitter.emit(this.eventLabel, args);
  }
};

module.exports = null;
