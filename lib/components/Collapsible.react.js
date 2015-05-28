var React = require('react');
var classNames = require('classnames');

var Debug = React.createClass({
  propTypes: {
    children: React.PropTypes.array
  },
  getInitialState() {
    return {
      collapsed: false
    };
  },
  render() {
    var classes = classNames({'collapsed': collapsed, 'debug': true});
    return (
      <div onClick={this.toggle} className={classes}>
        {this.props.children}
      </div>
    );
  },
  toggle() {
    var {collapsed} = this.state;
    this.setState({collapsed: !collapsed});
  }

});

module.exports = Debug;
