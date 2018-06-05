/* eslint-disable react/sort-comp */

import React, { PureComponent } from 'react';

import SubscribeFrom from 'react-mailchimp-subscribe';

export class SubscribeBanner extends PureComponent {
  renderForm = () => {
    const formProps = {
      action: 'https://rendahmag.us17.list-manage.com/subscribe/post?u=df0d549f92845c8dfc4d99dde&amp;id=2904b740be',
      messages: {
        inputPlaceholder: 'SUBSCRIBE TO RENDAH WEEKLY',
        btnLabel: 'SUBSCRIBE',
        sending: 'SUBSCRIBING',
        success: 'SUBSCRIBED',
        error: 'NOT A VALID EMAIL',
      },
      styles: {
        sending: {
          fontSize: 16,
          color: 'black',
        },
        success: {
          fontSize: 16,
          color: 'black',
        },
        error: {
          fontSize: 16,
          color: 'black',
        },
      },
    };

    return <SubscribeFrom {...formProps} />;
  };

  render() {
    return (
      <div className="subscribeBanner">
        {this.renderForm()}
      </div>
    );
  }
}

export default SubscribeBanner;
