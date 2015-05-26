"use strict";

var React = require('react');
/**
 * Generic CollectionTable
 */
var CollectionTable = React.createClass({
  propTypes: {
    /**
     * Array of objects to display
     */
    data: React.PropTypes.array
  },
  render() {
    if (!this.props.data) return null;
    var firstObject = Object.keys(this.props.data[0] || {});
    return(
      <section>
        <table className="item-list">
          <TableHeader keys={firstObject}/>
          <tbody>
            { this.props.data.map((object) => {
              return(<TableRow
                        object={object}
                        key={object.id}
                        onClick={this.props.handleSelect}/>);
            }) }
          </tbody>
        </table>
      </section>
    );
  }
});

var TableRow = React.createClass({
  propTypes: {
    object: React.PropTypes.object
  },
  render() {
    var onClick = this.props.onClick && this.props.onClick.bind(null, this.props.object.id) || function() {};
    return(
      <tr onClick={onClick}>
        { Object.keys(this.props.object).map(key => {
          return(<td key={key}>{JSON.stringify(this.props.object[key])}</td>);
        })}
      </tr>
    );
  }
});

var TableHeader = React.createClass({
  propTypes: {
    keys: React.PropTypes.array
  },
  render() {
    return(
      <thead>
        { this.props.keys.map((key, i) => {
          return(<th key={i}>{key}</th>);})}
      </thead>
    );
  }
});

module.exports = CollectionTable;
