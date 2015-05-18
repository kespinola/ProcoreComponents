/** @jsx React.DOM */
var PageStore = require("ProcoreComponents/stores/PageStore");
var moment = require("moment-timezone");
var Router = require('react-router');

var Utils = {
  mixins: [ Router.State ],
  providerIsCompany: function(){
    return (Procore.Environment.provider.type === 'company') ? true : false;
  },
  userIsAdmin: function() {
    return (Procore.Environment.user.isAdmin);
  },
  userName: function() {
    return (Procore.Environment.user.name);
  }, 
/** CONFIG RELATED */
  getParent: function() {
    return {
      id: Procore.Environment.toolId,
      child_url: Procore.Environment.checklistPath
    }
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
    var action = this.currentAction();
    var config = PageStore.getConfig("page", action, key);
    if(!config) {
      return false;
    } else if(typeof config == 'function') {
      return config();
    } else {
      return config;
    }
  },
  getPolicy: function(key, optionalId) {
    return PageStore.getPolicy(key, optionalId) || false;
  },
  getSidebarConfig: function(key) {
    var action = this.currentAction();
    if(!PageStore.getConfig("sidebar", action, key)) return false;
    return PageStore.getConfig("sidebar", action, key);
  },
/** THIS HAS TO BE MOVED */
  arrayToString: function(key, separator, array){
    var stringArray = array.map(function(element){
      return element[key];
    });

    var string = '';

    for(i=0 ; i < stringArray.length; i++){
      if(i === stringArray.length -1){
        string += ' ' + stringArray[i];
      }
      else{
        string += stringArray[i] + separator + ' ';
      }
    }
    return string;
  },
  formatPercentage: function(number){
    if(!number) return;
    return number + "%";
  },
  formatTimestamp: function(timestamp) {
    return moment.tz(timestamp, Procore.Environment.time_zone).format('MMMM Do, YYYY, [at] h:mm:ss a z');
  },

  pullString: function(object){
    var string;
    switch( Object.prototype.toString.call(object) ){
      case "[object Array]":
        string = this.arrayToString('name', ',', object);
        break;
      case "[object Object]":
        string = object.name;
        break;
      default:
        string = object;
        break;      
    }

    return string || '';
  }
};

module.exports = Utils;
