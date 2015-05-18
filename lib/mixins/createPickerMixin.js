/** @jsx React.DOM */
'use strict';
var React = require("react");
var Reflux = require("reflux");
var Picker = require("../components/pickers/Picker.react");
var _ = require("underscore");
var Initialize = require("ProcoreComponents/mixins/Initialize");

var createPickerMixin = function(store, actions) {
  var PickerMixin = {
    mixins: [
      Initialize.collection(store, actions),
    ],
    propTypes: {
      "selected": React.PropTypes.array.isRequired,
      "editable": React.PropTypes.bool,
      "parent": React.PropTypes.object.isRequired,
      "className": React.PropTypes.string
    },
    customComponentDidMount: function() {
      this.listenTo(store.StoreActions.saveObjectSuccess, this._onCreateSuccess);
    },
    initOverride: function() {
      var selected = this.props.selected ? this.props.selected : [];

      return {
        parent: this.props.parent,
        objects: store.getCollection(this.props.parent.id),
        selectedTokens: selected
      };
    },
    getDefaultProps : function() {
      return { filterSelected: true };
    },
    componentWillReceiveProps: function(nextProps) {
      var selected = (nextProps.selected) ? nextProps.selected : [] ;
      this.setState({
        selectedTokens: selected
      });
    },
    _deSelect: function(item) {
      var selectedTokens = this.state.selectedTokens || [];
      var updatedTokens = _.without(selectedTokens, item);
      this.setState({selectedTokens: updatedTokens});
      this.props.onDeselect(updatedTokens);
    },
    _onSelect: function(item) {
      var selectedTokens = this.state.selectedTokens || [];
      if ( this.props.multiSelect ) {
        selectedTokens.push(item);
      } else {
        selectedTokens = [item];
      }
      this.setState({ selectedTokens: selectedTokens });
      this.props.onSelect(selectedTokens);
    },
    _onChange: function() {
      this.setState( this.getStoreState()) ;
    },
    _onCreate: function(object) {
      store.addObject(this.props.parent, object);
      store.StoreActions.saveObject(this.props.parent, object);
    },
    _onCreateSuccess: function(parent, object) {
      this._onSelect(object);
    },
    renderPicker: function (options) {
      return (
        <Picker options={this.state.objects}
        filterSelected={true}
        selectedTokens={this.state.selectedTokens}
        editable={this.props.editable}
        onChange={this._onSelect}
        onCreate={this._onCreate}
        quickAdd={this.props.quickAdd}/>
      );
    },
    getStoreState :function() {
      return {
        objects: store.getCollection(this.props.parent.id)
      };
    }
  };
  return PickerMixin;
};

module.exports = createPickerMixin;
