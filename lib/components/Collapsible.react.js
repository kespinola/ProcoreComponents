var React = require('react');
var {OnResize} = require('react-window-mixins');
var _ = require('underscore');

var Collapsible = React.createClass({

  mixins:[OnResize],

  getDefaultProps(){
    return {
      maxHeight:"none",
      height:"auto",
      component:"section",
      closed:true
    }
  },

  getInitialState(){
    const  {
        maxHeight,
        height,
        closed} = this.props;
    return {
      height:height,
      maxHeight:closed ? 0 : maxHeight
    }
  },

  getStyles(){
    const {height, maxHeight} = this.state;
    return{
      height:height,
      maxHeight:maxHeight
    }
  },

  render(){
    const Component = this.props.component;
    return(
        <Component style={this.getStyles()} className="collapsible">
          <div ref="content" className="collapsible-inner">{this.props.children}</div>
        </Component>
    )
  },

  onResize(){
    const {
        closed,
        maxHeight
        } = this.props;
    const contentEl = React.findDOMNode(this.refs.content);
    const contentHeight = contentEl.offsetHeight;

    this.setState({maxHeight:closed ? 0 : (!maxHeight || contentHeight < maxHeight || maxHeight == "none"  ? contentHeight : maxHeight), resize:false}, ()=>{
    });
  },

  componentDidMount(){
    this.onResize();
  },

  componentWillReceiveProps(props){
    this.setState({resize:true})
  },

  shouldComponentUpdate(nextProps, nextState){
    return (
      !_.isEqual(nextState, this.state) ||
      !_.isEqual(nextProps, this.props));
  },
  componentDidUpdate(){
    this.state.resize && this.onResize();
  },


});

module.exports = Collapsible;