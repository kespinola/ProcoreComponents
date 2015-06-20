var React = require('react');
var {OnResize} = require('react-window-mixins');

var Collapsible = React.createClass({

  mixins:[OnResize],

  getDefaultProps(){
    return {
      maxHeight:"none",
      component:"section",
      closed:false
    }
  },

  getInitialState(){
    return {
      height:'auto',
      closed:this.props.closed,
    }
  },

  getStyles(){
    return{
      height:this.state.height,
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
    let height = closed ? 0 : (contentHeight < maxHeight || maxHeight == "none" || !maxHeight ? "auto" : maxHeight);
    this.setState({height});
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