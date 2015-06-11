'use strict';

var React = require('react');
var cx = require('react/lib/cx');
var UtilityMixin = require('../mixins/UtilityMixin');

/*************************
 * Modal Component
 *************************
 * @prop { boolean } visible
    determines initial visibility
 * @prop { function } onHide
    this function is triggered before hiding the modal
 * @prop { function } onShow
    this function is triggered before showing the modal
 */
 
var Modal = React.createClass({
  mixins: [UtilityMixin],
  propTypes: {
    visible: React.PropTypes.bool,
    onHide: React.PropTypes.func,
    onShow: React.PropTypes.func
  },

  getInitialState: function() {
    return { visible: this.props.visible }
  },
  render: function() {
    var content = this._cloneWithProps({
      onSubmitSuccess: this.hide,
      ref: 'content'
    });

    var classes = cx({
      'display-offscreen': !this.state.visible,
      'modal-container': true,
      'padded-children': true
    });

    return(
      <div className={classes}>
        <div className='modal'>
          <header className='modal-header'>
            <div className='modal-title'>Attach Files</div>
            <i className='close-modal fa-fa-2x' onClick={this.hide}/>
          </header>
          <section className='modal-content'>
            {content}
          </section>
          <footer className='modal-footer'>
            <div className='to-the-right'>
              <a onClick={this.hide}>Cancel</a>
              <button className='no-style-btn mock-bttn' onClick={this._submit}>Attach</button>
            </div>
          </footer>
        </div>
        <div ref='overlay' className='modal-overlay' onClick={this.hide}/>
      </div>
      )
  },

  _submit: function() {
    this.refs.content._submit();
  },

  /* Public Functions */
  hide: function() {
    this.props.onHide && this.props.onHide();
    this.setState({visible: false});
  },
  show: function() {
    this.props.onShow && this.props.onShow();
    this.setState({visible: true});
  }
});

module.exports = Modal;