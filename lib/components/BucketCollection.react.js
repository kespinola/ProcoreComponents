'use strict';

var React = require('react');
/**
 * Generic Collection
 */
var BucketCollection = React.createClass({
  propTypes: {
    /**
     * Array of objects to display
     */
    data: React.PropTypes.array.isRequired,
    split: React.PropTypes.string.isRequired
  },
  render() {
    var buckets = this.splitCollection(); 
    return Object.keys(buckets).map(function(key) {
      var collection = buckets[key];
      return (
        <Collection data={collection}>
          {this.props.children}
        </Collection>
      );
    });
  },
  splitCollection() {
    var split = this.props.split;
    var entries = this.props.data;
    var splitCollection = {};
    entries.map(function(entry) {
      var splitValue = entry[split];
      splitCollection[splitValue] = splitCollection[splitValue] || [];
      splitCollection[splitValue].push(entry);
    });

    return splitCollection;
  }
});


module.exports = BucketCollection;

