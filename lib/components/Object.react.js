"use strict";

var React = require('react');

var ObjectTest = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render() {
    return(
      <table className="edit">
        { Object.keys(this.props).map(key => {
          return(<tr><th>{key}</th><td>{this.props[key]}</td></tr>);
        }) }
      </table>
    );
  }
});

module.exports = ObjectTest;
