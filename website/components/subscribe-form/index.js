import React, { useRef } from 'react';
import fetch from 'isomorphic-unfetch';
import { useToasts } from 'react-toast-notifications';

import { Heading, Button, Icon } from 'next-pattern-library';

import { useApp, useDispatchApp } from '../../context-provider/app';

export default function SubscribeForm() {
  const app = useApp();
  const dispatch = useDispatchApp();
  const { addToast } = useToasts();

  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_LOADING' });

    const res = await fetch('/api/common/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
      dispatch({ type: 'TOGGLE_LOADING' });
      return;
    }

    inputEl.current.value = '';
    addToast('Success! 🎉 You are now subscribed to the newsletter.', {
      appearance: 'success',
      autoDismiss: true,
    });
    dispatch({ type: 'TOGGLE_LOADING' });
  };

  const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <form
      className="w-100  pv5  ph0  ph3-md  flex  flex-wrap  justify-center  align-center  bg-almost-white"
      onSubmit={subscribe}
    >
      <div className="col-24  flex  flex-wrap  justify-center  tac  pb3  mb0  mb2-md">
        <Heading
          /* Options */
          htmlEntity="h1"
          text="Join our newsletter!"
          color="black"
          size="medium"
          truncate={null}
          reveal={null}
          /* Children */
          withLinkProps={null}
        />
      </div>

      <div className="flex  flex-wrap  mt2  ph4  ph0-md">
        <input
          className="subscribe-banner__input  col-24  col-16-md  flex  justify-center  mb3  mb0-md"
          id="email-input"
          name="email"
          placeholder="Your email"
          ref={inputEl}
          type="email"
        />

        <div className="col-24  col-8-md  flex  justify-center  justify-start-md">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Subscribe"
            color="black"
            fluid={false}
            icon={buttonIconArrowRight}
            iconFloat={null}
            inverted={false}
            loading={null}
            disabled={app.isLoading}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'form',
              url: null,
              target: null,
              routerLink: null,
            }}
          />
        </div>
      </div>

      <p className="t-secondary  f6  almost-black  lh-copy  col-24  tac  pt4  ph5  ph0-md">
        We&apos;ll only send emails when new content is posted. No spam.
      </p>
    </form>
  );
}
