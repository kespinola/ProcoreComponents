
var React = require("react");
var Reflux = require("reflux");
var cx = require("react/lib/cx");
var Router = require("react-router");
var ButtonPane = require("./sidebar/ButtonPane.react");
var _ = require("underscore");
var FilterPane = require("./sidebar/FilterPane.react");
var ViewList = require("./sidebar/ViewList.react");
var Utils = require('../mixins/Utils');
var PageStore = require('../stores/PageStore');

var cache = {};

var SidebarFactory = function(store){
  if (cache[store.resourceType]) return cache[store.resourceType];
  var Sidebar = React.createClass({
    mixins: [
      Router.Navigation,
      Reflux.ListenerMixin,
      Utils
    ],
    componentDidMount: function() {
      this.listenTo(store, this.onStoreChange);
      this.listenTo(PageStore, this.pageUpdated);
    },
    onStoreChange: function(eventType, eventData) {
      if (eventType !== "syncRequest"){
        this.setState({
          values: store.uniqueKeysAndValues()
        });
      }
    },
    pageUpdated: function() {
      this.setState({
        object: PageStore.getCurrentObject()
      });
    },
    getInitialState: function() {
      return {
        values: store.uniqueKeysAndValues(),
        params: {},
        currentFilters: []
      };
    },
    render: function() {
      return(
        <div className="sidebar-wrapper" id="main_sidebar">
          <div className="sidebar">
            <a className="toggle-sidebar-hotzone" onClick={this._handleCollapse}></a>
            <div className="button_container">
              {this.renderButtons()}
            </div>
            { this.renderPanes() }
            { this.renderConfigTab() }
          </div>
        </div>
      );
    },
    _handleCollapse: function(){
      this.props.toggleSidebar();
    },
    renderConfigTab: function() {
      var currentPath = this.getPath();
      var configureLink = (this.providerIsCompany()) ? "list_templates/configure_tab" : "lists/configure_tab";
      var content = (
        <div className="flat_panel sidebar_actions">
          <div className="sidebar_panel_content">
            <div className="link_container">
              <a href={configureLink}>
                <i className="fa fa-wrench"></i>
                Configure inspection settings...
              </a>
            </div>
          </div>
        </div>
      );
      _.each(['/new','/edit','/show'], function(path) {
        if ( currentPath.indexOf(path) > -1 ) {
          content = "";
        }
      });
      
      if(this.getPolicy("can_configure")){
        return content;
      }
      return null; 
    },
    populateFilters: function(){
      var filters = _.map(this.getSidebarConfig('showFilters'), function(config){
        return {
          picker:"Default",
          label: config.label,
          attribute: config.attribute,
          type: config.type,
          options: this.state.values[config.attribute],
          handler: this._handleFilter
        };
      }.bind(this));

      return _.compact(filters);
    },
    renderPanes: function() {
      var panes = [];

      if(this.getSidebarConfig('showViews')){
        panes.push(
          <ViewList title="Views"
            options={this.getSidebarConfig('showViews')}
            handler={this._handleFilter} />
          );
      }

      if(this.getSidebarConfig('showSearch')){
        panes.push(<FilterPane title="Search" filters={[
          {picker:"Input", label: "", handler: this._handleSearch},
        ]}/>);
      }

      var filters = this.populateFilters();
      if(filters.length !==0 && this.getSidebarConfig('showFilters')){
        panes.push(<FilterPane title="Filter inspections by" filters={ filters }/>);
      }

      return  _.map(panes, function(pane){
        return <div className="sidebar_panel">{pane}</div>;
      });
    },

    renderButtons: function() {
      return (
        <ButtonPane 
          object={this.state.object}
          configs={this.getSidebarConfig('buttons')}/>
        );
    },
    
    /*
     * UI Methods
     */
    _handleSearch: function(query) {
      store.setSearchFilter(query);
    },
    _handleFilter: function(config) {
      var filters = _.reject(this.state.currentFilters, function(object){
        return object.key === config.key;
      });
      filters.push(config);
      store.setFilterConfig(filters);
      this.setState({currentFilters: filters});
    }
  });
  cache[store.resourceType] = Sidebar;
  return Sidebar;
};

module.exports = SidebarFactory;
