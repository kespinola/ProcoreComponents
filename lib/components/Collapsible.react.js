var React = require('react');
var {OnResize} = require('react-window-mixins');

var Collapsible = React.createClass({

  mixins:[OnResize],

  getDefaultProps(){
    return {
      maxHeight:"none",
      height:"auto",
      component:"section",
      closed:false
    }
  },

  getInitialState(){
    const  {closed, maxHeight, height} = this.props;
    return {
      height:height,
      closed:closed,
      maxHeight:maxHeight
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

  _updateClosed(change){
    return this.setState({closed:change}, ()=>{
      this.onResize();
    });
  },

  onResize(){
    const {maxHeight} = this.props;
    const {closed} = this.state;
    const contentEl = React.findDOMNode(this.refs.content);
    const contentHeight = contentEl.offsetHeight;
    this.setState({maxHeight:closed ? 0 : (!maxHeight || contentHeight < maxHeight || maxHeight == "none"  ? contentHeight : maxHeight)});
  },

  componentDidMount(){
    this.onResize();
  },

  componentWillReceiveProps(newProps){
    const {closed} = newProps;
    closed && this._updateClosed(closed)
  },

  toggle(){
    this._updateClosed(!this.state.closed)
  },

  close(){
    this._updateClosed(true);
  },

  open(){
    this._updateClosed(false);
  }


});

module.exports = Collapsible;