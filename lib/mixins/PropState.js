var PropState = {};
PropState.collection = function(store) {
  return {
    componentWillReceiveProps: function(nextProps) {
      if (this.props.liveEdit !== nextProps.liveEdit) store.setLiveEdit(nextProps.liveEdit);
      
      var parentChanged = this.props.parent && this.props.parent.id !== nextProps.parent.id;
      if (parentChanged) {
        var objects = store.getCollection(nextProps.parent.id);
        this.setState({parent: nextProps.parent, objects: objects });
      }
    }
  }
}

PropState.self = function(store) {
  return {
    componentWillReceiveProps: function(nextProps) {
      var liveEditChanged = this.props.liveEdit !== nextProps.liveEdit;
      if (liveEditChanged) store.setLiveEdit(nextProps.liveEdit);
      if (!nextProps.self.child_urls) return;
      this.setState({self: nextProps.self });
    }
  }
};

module.exports = PropState;
