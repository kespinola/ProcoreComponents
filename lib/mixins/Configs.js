var Router = require('react-router');
var PageStore = require("../stores/PageStore");

var Configs = {
  mixins: [ Router.State ],
  getParent: function() {
    return {
      id: Procore.Environment.toolId,
      child_url: Procore.Environment.checklistPath
    };
  },
  currentAction: function(){
    var action = this.getParams().action;
    action = action ? action : this.getPath().split("/")[1];
    return action;
  },
  _getEnvironmentVariables: function() {
    return {
      controller: Procore.Page.controller,
      providerType: Procore.Environment.provider.type,
      action: this.currentAction()
    };
  },
  getConfig: function(key) {
    if(!PageStore.getConfig("page")) return false;
    var action = this.currentAction();
    return PageStore.getConfig("page", action, key);
  },
  getSidebarConfig: function(key) {
    if(!PageStore.getConfig("sidebar")) return false;
    var action = this.currentAction();
    return PageStore.getConfig("sidebar", action, key);
  }
};

module.exports = Configs;
