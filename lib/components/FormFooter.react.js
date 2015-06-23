'use strict';

var React = require('react');

var FormFooter = React.createClass({
  getDefaultProps: function() {
    return {
      requiredIndicator: false
    };
  },

  render: function() {
    return(
      <div className='form-footer'>
        {this.renderFootnotes()}
        <aside className='padded-children'>
          {this.props.children}
        </aside>
      </div>
    );
  },


  renderFootnotes: function() {
    var {requiredIndicator, footnote} = this.props;

    return(
      <span>
        {requiredIndicator ? <div className="required">* required field</div> : null}
        {footnote ? <div>{this.props.footnote}</div> : null}
      </span>
    );
  }

});

module.exports = FormFooter;
