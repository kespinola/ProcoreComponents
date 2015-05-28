"use strict";

var React = require('react');
var _ = require('underscore');

/**
 * Takes an array and paginates it
 */
var Paginate = React.createClass({
  propTypes: {
    /**
     * Data to be paginated
     */
    data: React.PropTypes.array,
    /**
     * Max number of elements returned
     */
    limit: React.PropTypes.number,
    /**
     * Page number (starts at 0)
     */
    page: React.PropTypes.number
  },
  getDefaultProps() {
    return {
      data: [],
      limit: 10,
      page: 0
    };
  },
  _buildProps() {
    var { limit, page, data } = this.props;
    var formattedData = data.slice( limit * page, limit * (page+1) );
    
    return { data: formattedData };
  },
  render() {
    var children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, this._buildProps());
    });
    return (
      <div>
        {children}
      </div>
    );
  }
});

module.exports = Paginate;
