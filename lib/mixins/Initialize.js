/** @jsx React.DOM */


var Initialize = {
  collection: function(store, actions) {
    return{
      debug: function(eventType) {
        console.log(this.constructor.displayName.toUpperCase(), "||", "COLLECTION", eventType, this.props.parent.id);
      },
      getInitialState: function() {
        if (this.initOverride) return this.initOverride();
        return {
          parent: this.props.parent,
          objects: store.getCollection(this.props.parent.id)
        };
      },
      componentDidMount: function() {
        if (this.customComponentDidMount) this.customComponentDidMount();
        actions.setLiveEdit(this.props.liveEdit);
        this.listenTo(store, this.onStoreChange);
        this.loadData();
      },
      loadData: function(){
        // Need method to figure out when to load
        if (this.loadDataOverride) return this.loadDataOverride();

        setTimeout(function() {
          console.log("initialize::Collection " + this.constructor.displayName + ' ' + store.getUrl(this.state.parent));
          store.StoreActions.loadCollection(this.state.parent);
        }.bind(this), 0);
      },
      onStoreChange: function(eventType, eventData) {
        if (this.isMounted()){
          this.setState({
            objects: store.getCollection(this.state.parent.id),
            editable: this.props.editable
          });
          this.customOnChange && this.customOnChange();
        }
      }
    };
  },
  self: function(store, actions){
    return{
      debug: function(eventType){
        console.log(this.constructor.displayName.toUpperCase(), "||", "SELF", eventType, this.props.self.id);
      },
      getInitialState: function(){
        if(this.initOverride) return this.initOverride();
        return {
        };
      },
      componentDidMount: function(){
        this.debug("componentDidMount");
        actions.setLiveEdit(this.props.liveEdit);
        this.listenTo(store, this.onStoreChange);
        this.loadData();
        if (this.customComponentDidMount) this.customComponentDidMount();
      },
      loadData: function(){
        setTimeout(function() {
          store.StoreActions.loadObject(this.props.parent, this.props.self.id);
        }.bind(this), 0);
      },
      _update: function(attribute, value, submit, key){
        if(this._updateOverride) return this._updateOverride(attribute, value, submit, key);
        var object = this.state.self;
        object[attribute] = value;
        actions.updateObject(this.props.parent, object);
      },
      onStoreChange: function(eventType, eventData){
        var isSyncRequest = eventType === "syncRequest";
        var isEmptySync = (eventType==="sync" && !eventData.action );
        var canAcceptChange = !isSyncRequest && !isEmptySync && this.isMounted();
        if ( canAcceptChange && this.getResourceState ) {
          this.setState(this.getResourceState());
        }
      }
    };
  }
};

module.exports = Initialize;
