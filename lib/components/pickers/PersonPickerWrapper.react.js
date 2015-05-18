/** @jsx React.DOM */
var React = require("react");
var PersonPicker = require("./PersonPicker.react");

var VendorStore = require("ProcoreComponents/stores/VendorStore");
var VendorActions = require("ProcoreComponents/actions/VendorActions");
var Initialize = require("ProcoreComponents/mixins/Initialize");

var PersonPickerWrapper = React.createClass({
  mixins: [
    Initialize.collection(VendorStore, VendorActions)
  ],
  initOverride: function(){
    return { 
      parent: this.props.parent,
      selectedVendor: {name: "", description: ""},
      objects: []
    };
  },
  loadDataOverride: function(){
    var parent = {
      id: "procore",
      child_url: Procore.Environment.personPickersPath
    };
    setTimeout(function(){
        VendorActions.loadCollection(parent);
      }.bind(this), 0);
  },
  render: function() {
    return( 
      <div>
        { this.renderPersonPicker() }
      </div>
    )
  },
  renderPersonPicker: function(){
    if(!this.state.objects) return null;
    return(
      <div>
        <PersonPicker options={this.state.objects} 
                onChange={this.pickerDidChange}/>
      </div>
    )
  },
  pickerDidChange: function(item) {
    item.login_information_id = item.id;
    this.setState({selectedVendor: item});
  }
});

module.exports = PersonPickerWrapper;
