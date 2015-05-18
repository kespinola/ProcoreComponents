var Reflux = require("reflux");
var _ = require("underscore");
var PageActions = require('../actions/PageActions');
var PageClient = require('../clients/PageClient');

function _getEnvironmentVariables() {
  return {
    controller: Procore.Page.controller,
    providerType: Procore.Environment.provider.type
  };
}

var PageStore = Reflux.createStore({
  listenables: PageActions,
  resourceType: "page",
  _collections: {"": {}},
  _activePage: "",
  _policyMap: {},
  _policies: {},
  setActivePage: function(page) {
    this._activePage = page;
  },

  setPolicyMap: function(page, map) {
    this._policyMap[page] = map;
  },

  setConfig: function(page, config){
    this._collections[page] = config;
    this.trigger("change");
  },

  getConfig: function(type, action, key) {
    var env = _getEnvironmentVariables();
    var page = this._activePage;
    if (!page) return false;

    // Pull config boolean value out of hash
    var pageConfig = this._collections[page][type][env.controller][env.providerType][action][key];
    var mappedKey = this._policyMap[page][action][key] || null;
    // If key is mapped to a policy, return policy boolean
    var result = (mappedKey) ? this.getPolicy(mappedKey) && pageConfig : pageConfig;
    return result;
  },

  setCurrentObject: function(object) {
    this._collections[this._activePage].currentObject = object;
    this.trigger("objectUpdated");
  },

  getCurrentObject: function() {
    return this._collections[this._activePage].currentObject || {};
  },

  getPolicy: function(policy, optionalId){
    var id =  optionalId || this.getCurrentObject().id || "";
    return this._policies[id] && this._policies[id][policy] || false;
  },

  loadPolicies: function() {
    var self = this;
    PageClient.getCollection(Procore.Page.policyPath)
    .done(function(policies){
      _.each(policies, function(policy){
        self._policies[policy.policy_holder_id] = policy;
      });
    self.trigger("policyUpdated");
    });
  }
});

module.exports = PageStore;
