'use strict';

var moment = require('moment');
var _ = require('underscore');
var Utils = require('../mixins/Utils');

function sortFactory(key){
  var sortFunctions = {
    number: function(a, b) {
      return a[key] - b[key];
    },
    string: function(a, b) {
      return a[key].toString().toLowerCase() > b[key].toString().toLowerCase();
    },
    date: function(a, b) {
      return moment(a[key]).isBefore(b[key]);
    }
  };
  return sortFunctions;
}

/*
 * Parses condition string
 * @params { string } condition string to parse
 * @return { object } hash with operator and values to sort by
 */
function parseConditions(condition){
  if(!condition) return;
  var params = {
    operator: condition.replace(/[^\<|\>|\!\=]+/g, '').trim(),
    value: condition.replace(/(\<|\>|\!\=)+/g, '').trim()
  };
  return params;
}

/*
 * Creates filter predicates for array.filter()
 * @params { string } key to filter by
 * @params { string } filter condition string
 * @return { function } returns filter predicate
 */
function filterFactory(key, conditionString, config) {
  var parsed = parseConditions(conditionString);

  var filterFunctions = {
    boolean: function(object) {
      if(!parsed) return true;
      switch(parsed.value){
        case "false":
          return (!object[key] || object[key] === false) ? true : false;
        default:
          return (object[key] && object[key] === true) ? true : false;
      }
    },
    number: function(object) {
      if(!parsed) return true;
      switch(parsed.operator){
        case ">":
          return object[key] > parsed.value;
        case "<":
          return object[key] < parsed.value;
        case "!=":
          return object[key] !== parsed.value;
        case "=":
          return object[key] === parsed.value;
        default:
          return true;
          break;
      }
    },
    string: function(object) {
      var match;
      var string;

      if (!parsed) return true;
      else if (!object[key]) return false;
      else if(_.indexOf(Object.keys(object), key) === -1) return false;

      switch( Object.prototype.toString.call(object[key]) ){
        case "[object Array]":
          string = Utils.arrayToString('name', ' ', object[key]);
          break;
        case "[object Object]":
          string = object[key].name || '';
          break;
        default:
          string = object[key];
          break;
      }
      match = string.toLowerCase()
                .indexOf(parsed.value.toLowerCase()) > -1;
      return (parsed.operator === "!=") ? !match: match;
    },
    date: function(object) {
      if(!parsed) return true;
      var isBefore = moment(object[key]).isBefore(parsed.value);
      switch(parsed.operator){
        case ">":
          return !isBefore;
        case "<":
          return isBefore;
        default:
          return moment(object[key]).isSame(parsed.value, "day");
      }
    }
  };
  return filterFunctions[config.type];
}

function filterCollection(config, collection) {
  var key = config.key;
  var condition = config.condition;

  var predicat = filterFactory(key, condition, config);
  return _.filter(collection, predicat);
}

function searchCollection(query, collection) {
  var keys = _.keys(collection[0]);
  var searched = _.map(collection, function(object){
    var match = false;
    _.each(keys, function(key){
      if(match) return;
      else if(typeof object[key] === 'string'){
        match = (object[key].toLowerCase()
                  .indexOf(query.toLowerCase()) > -1) ? true : false;
      }
    });
    return (match) ? object : null;
  });
  return _.compact(searched);
}

var StoreUtils = {
  generateTempId: function(){
    var timestamp = Date.now();
    var tempId = "tmp_" + timestamp;
    return tempId;
  },
  sort: function(config, objects){
    if(!config) return objects;
    var key = config.key;
    var ascending = config.ascending;
    var sortFunction = sortFactory(key)[config.type];
    var sorted = objects.sort(sortFunction);

    return (ascending) ? sorted : sorted.reverse();
  },
  filter: function(configs, objects){
    if(!configs) return objects;
    var filtered = objects;
    _.each(configs, function(config){
      filtered = filterCollection(config, filtered);
    });
    return filtered;
  },
  search: function(query, objects){
    if(!query) return objects;
    return searchCollection(query, objects);
  }
};

module.exports = StoreUtils;
