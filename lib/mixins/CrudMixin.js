var _ = require('underscore');

var CrudMixin = {
  handleChange(attribute, value) {
    var sync = false;
    var object = this.props.data;
    object[attribute] = value;
    this.props.actions.update(object, sync);
  },

  handleUpdate() {
    var object = this.state;
    this.props.actions.update(object).then(() => {
      this.context.router.transitionTo('view', {id: this.props.objectId});
    });;
  },

  handleCreate() {
    var object = this.state;
    this.props.actions.add(object);
    this.context.router.transitionTo('index', '/');
  },
};

module.exports = CrudMixin;
