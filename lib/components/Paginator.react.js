var React = require('react');
var _ = require('underscore');

var Paginator = React.createClass({
  PropTypes: {
    /**
     * Max number of pages
     */
    maxPage: React.PropTypes.number.isRequired,
    /**
     * Current page
     */
    page: React.PropTypes.number.isRequired,
    /**
     * Pages to preview
     */
    pagesToShow: React.PropTypes.number,
    /**
     * Page change callback
     */
    onPageChange: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      pagesToShow: 3,
      page: 0
    };
  },
  render() {
    var { 
      page, 
      pagesToShow, 
      maxPage, 
      onPageChange 
    } = this.props;

    page = parseInt(page);
    pagesToShow = parseInt(pagesToShow);
    maxPage = parseInt(maxPage);

    var lowerMid = Math.floor(pagesToShow/2);
    var upperMid = Math.ceil(pagesToShow/2);

    var minRange = page - lowerMid;
    var maxRange = page + upperMid;

    // Gotta make this elegant later
    if (pagesToShow > maxPage) {
      minRange = 0;
      maxRange = pagesToShow;
    } else if (maxRange > maxPage) {
      minRange -= maxRange - maxPage;
      maxRange = maxPage;
    } else if (minRange < 0) {
      maxRange += Math.abs(minRange);
      minRange = 0;
    }

    return (
      <div className="new_paginator">
        <span 
          onClick={onPageChange.bind(null, Math.max(page-1, 0))} 
          className="previous_page">
            prev
          </span>
            { _.range(minRange, maxRange).map(num => {
              if (page === num) { return(<em className="current">{num}</em>); }
              return(<a onClick={onPageChange.bind(null, num)}>{num}</a>);
            })}
        <span 
          onClick={onPageChange.bind(null, Math.min(maxRange, page+1))} 
          className="next_page">
            next
          </span>
      </div>
    );
  }
});

module.exports = Paginator;
