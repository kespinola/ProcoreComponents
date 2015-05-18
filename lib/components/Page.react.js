/** @jsx React.DOM */
var React = require("react");
var Reflux = require("reflux");
var cx = require("react/lib/cx");
var Router = require("react-router");
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var PageActions = require("../actions/PageActions");
var Breadcrumbs = require("./Breadcrumbs.react");
var HashLocation = require('react-router/modules/locations/HashLocation');

var PageHeader = require('./PageHeader.react');
var SidebarFactory = require('./Sidebar.react');
var BreadcrumbFactory = require('../stores/BreadcrumbStore');
var BreadcrumbActions = require('../actions/BreadcrumbActions');
var BreadcrumbStore;

function generatePage(store){
  var Bar = SidebarFactory(store);
  var Page = React.createClass({
  /*
   * Lifecycle Methods
   */
    mixins: [
      Router.Navigation,
      Router.State,
      Reflux.ListenerMixin
    ],
    componentDidMount: function() {
      BreadcrumbStore = BreadcrumbFactory(store);
      // Listeners
      this.listenTo(BreadcrumbStore, this.routeChanged);
      this.listenTo(store.StoreActions.saveObjectSuccess, this.storeUpdated);
      this.listenTo(store.StoreActions.saveCollectionSuccess, this.storeUpdated);
      this.listenTo(store.StoreActions.saveAllCollectionsSuccess, this.storeUpdated);
      HashLocation.addChangeListener(this.routeChanged);

      // Load Actions
      BreadcrumbActions.loadObjects();
      PageActions.loadPolicies();

      // Set initial state
      var params = this.getParams();
      if(params.listId){
        PageActions.setCurrentObject(store.getObject(this.props.parent.id, params.listId));
      }
    },
    storeUpdated: function(eventType, parent, object) {
      if (object) PageActions.loadPolicies();
    },
    routeChanged: function() {
      console.log("Refreshing Title");
      var current;
      var number;
      var params = this.getParams();
      switch(this.getPathname()){
        case "/":
          PageActions.setCurrentObject({});        
          current = Procore.Page.BreadcrumbsRoot;
          break;
        case "/new":
          PageActions.setCurrentObject({});        
          current = Procore.Page.BreadcrumbsCreate;
          break;
        default:
          PageActions.setCurrentObject(store.getObject(this.props.parent.id, params.listId));
          current = BreadcrumbStore.getObject(params.listId) || "loading...";
          number = store.getObject(this.props.parent.id, params.listId).number;
          break;
      }
      var newState = {
        current: current || this.state.current, 
        params: params,
        number: number
      };

      this.setState(newState);
    },
    getInitialState: function() {
      return{
        collapse: false,
        current: Procore.Page.BreadcrumbsRoot,
        params: {}
      };
    },
  /*
   * Render Methods
   */

    render: function() {
      var wrapClasses=cx({
        'wrap': true,
        'hide-sidebar': this.state.collapse
      });
      var inspectionNumber;
      if(this.state.number) {
        inspectionNumber = "#" + this.state.number;
      }
      return(
        <div className={wrapClasses} id="main_content">
          <div className="tool-content" id="main_panel">
            <div className="tool-body">
              <Breadcrumbs ref="breadcrumbs" current={this.state.current}/>
              <div className="tool-header">
                <h1>{this.state.current} {inspectionNumber}</h1>
              </div>
              <div className="inner-content">
                <RouteHandler parent={this.props.parent}/>
              </div>
            </div>
          </div>

          <div className="sidebar-collapse-bar">
            <div className="sidebar-collapse-bar-icon top"></div>
            <div className="bar"></div>
            <div className="sidebar-collapse-bar-icon bottom"></div>
          </div>

          <Bar ref="sidebar" 
            params={this.state.params} 
            toggleSidebar={this.toggleSidebar}
            parent={this.props.parent}/>
        </div>
      );
    },
  /*
   * UI Methods
   */
    toggleSidebar: function() {
      this.setState({
        collapse: !this.state.collapse
      });
    }
  });
  return Page;
}

module.exports = generatePage;
