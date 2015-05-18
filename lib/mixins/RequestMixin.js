var RequestStore = require("ProcoreComponents/stores/RequestStore");

var RequestMixin = {
  getInitialState: function () {
    return { completed: 0, total: 0, percentage: 1 };
  },

  componentDidMount: function() {
    if (!this.props.monitoredResources) return;
    this.listenTo(RequestStore, this.updateRequests);
  },

  updateRequests: function() {
    var requests = RequestStore.completionForResources(this.props.monitoredResources);
    this.setState(requests)
  }
}

module.exports = RequestMixin;
