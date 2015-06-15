var Reflux = require("reflux");
var BreadcrumbActions = require('../actions/BreadcrumbActions');
var _ = require("underscore");

var breadrumbs = [];

var BreadcrumbStore = Reflux.createStore({
    listenables: [BreadcrumbActions],
    breadcrumbs: null,
    // Initial setup
    init: function() {
    },
    // Callbacks
    resetBreadcrumbs: function() {
      this.breadcrumbs = null;
      this.trigger(this.breadcrumbs);
    },
    updateBreadcrumbs: function(breadcrumb) {
      //this.breadcrumbs.push(breadcrumb);
      if (breadcrumb){
        this.breadcrumbs = breadcrumb;
        this.trigger(this.breadcrumbs);
      }
    }
});

module.exports = BreadcrumbStore;
