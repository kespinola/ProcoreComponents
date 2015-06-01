'use strict';

var React = require('react');


var BetaFeedbackPopup = React.createClass({
/*
 * Render Methods
 */
  render: function() {
    return(
        <div className="beta-btn">
          <a className="fancybox beta-btn" onClick={this._handleClick} href="#beta-msg">
            <div className="beta-btn-label">Beta</div>
            <div className="beta-mini-label">Send us your feedback </div>
            <div className="beta-arrow-background"></div>
            <div className="beta-arrow-label"> &rarr; </div>
          </a>
          <div id="beta-msg">
            <div className="fancybox-header">
              <h1 className="beta-h1"> Your feedback is valuable!</h1>
            </div>
            <section>
              <div>
                <div>During the beta phase we rely on your feedback to help improve your experience and our product.</div>
                <br/>
                <ul className="view_list">
                  <div><b>What we&#8217;re looking for:</b></div>
                   <br/>
                   <ul className="beta_msg">
                     <li type="disc">Unexpected or incorrect behavior</li>
                     <li type="disc">Incorrect or insufficient functionality</li>
                     <li type="disc">Have you encountered anything confusing?</li>
                     <li type="disc">What do you like about the feature?</li>
                   </ul>
                </ul>
                <br/>
                <div>Please email feedback to our product team: <a className="feedback-email"  href="mailto:inspectionsfeedback@procore.com">inspectionsfeedback@procore.com</a></div>
                <br/>
                <div> To learn more abut our beta program, <a className="learn-more" target="_blank" href="https://support.procore.com/faq/why-is-a-feature-called-beta-and-what-does-that-mean">click here</a>.</div>
              </div>
            </section>
          </div>
        </div>
    );
  },

  _handleClick: function(e) {
    $('.fancybox').fancybox();
    $('.feedback-email').click(function(e) {
     window.location = $(this).attr('href');
     $.fancybox.close();
   });
  }
});


module.exports = BetaFeedbackPopup;
