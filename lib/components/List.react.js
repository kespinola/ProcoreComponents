var React = require('react');

var List = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    data: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      type: "ul",
      data: []
    };
  },
  render() {
    var Component = React.Children.only(this.props.children);
    var children = null;
    if (this.props.data && this.props.data.length) {
      children = this.props.data.map((object) => {
        if ( !object.key ) object.key = object.id;
        return( React.cloneElement(Component, object || {}) );
      });
    }

    if (this.props.type === "ol") { 
      return (<ol className={this.props.className}> { children } </ol>);
    } else {
      return (<ul className={this.props.className}> { children } </ul>);
    }
  }
});

module.exports = List;
