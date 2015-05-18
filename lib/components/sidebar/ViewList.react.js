/** @jsx React.DOM */
var React = require("react");
var cx = require("react/lib/cx");
var _ = require("underscore");

var ViewList = React.createClass({
  getInitialState: function(){
    return {
      selected: Object.keys(this.props.options)[0]
    };
  },
  componentDidMount: function(){
    var config = this.props.options[this.state.selected];
    this.props.handler(config);
  },
  render: function() {
    var options = _.map(Object.keys(this.props.options), function(key){
      if (this.props.options[key].hidden && !this.props.options[key].hidden()) return null;
      if(key === this.state.selected) return(<li>{ key }</li>);
      var contained = 
        ( key === this.state.selected ) ? 
          key : <a name={key} onClick={this._handleUpdate}>{ key }</a>;
          
      return(
        <li>
          { contained }
        </li>
      );
    }.bind(this));
    _.compact(options);
    return(
      <div>
        <div className="sidebar_panel_title">{this.props.title}</div>
        <div className="sidebar_panel_content">
          <ul className="view_list">
            { options }
          </ul>
        </div>
      </div>
    );
  },
  _handleUpdate: function(e) {
    var config = this.props.options[e.target.name];
    this.props.handler(config);
    this.setState({selected: e.target.name});
  }
});

module.exports = ViewList;
