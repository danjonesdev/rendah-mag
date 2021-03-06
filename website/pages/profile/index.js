import { useState, useEffect } from 'react';
import Router from 'next/router';
import zenscroll from 'zenscroll';

import { Tabs } from 'next-pattern-library';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProfileEdit from '~/components/profile/edit';
import ProfileMessages from '~/components/profile/messages';
import ProfilePipeline from '~/components/profile/pipeline';
import ProfileCreations from '~/components/profile/creations';
import ProfileOfferings from '~/components/profile/offerings';
import ProfileBilling from '~/components/profile/billing';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';


import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import { getSiteConfig } from '~/lib/sanity/requests';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_live_2hnHQMXZhwDZQTESKurI7Sle');

export default function Profile({ siteConfig }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const [refreshDominion, setRefreshDominion] = useState(false);
  const [refreshOffering, setRefreshOffering] = useState(false);

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  const handleToggle = (visibleTab, current) => {
    // Handles tab scroll on mobile
    if (app.deviceSize === 'md') {
      zenscroll.setup(300, 15);
      if (visibleTab) {
        zenscroll.to(current, 400);
      } else {
        zenscroll.toY(0);
      }
    }

    // Handles dominion carousel refresh
    if (visibleTab === '2') {
      setRefreshDominion(true);
    }

    if (visibleTab === '3') {
      setRefreshOffering(true);
    }
  };

  console.log('app.deviceSize', app.deviceSize);

  if (user) {
    return (
      <Elements stripe={stripePromise}>
        <div className="bg-white  bg-almost-white-md">
          <Layout
            navOffset="top"
            navOnWhite
            hasNav
            hasFooter
            meta={{
              siteConfig,
              title: 'Profile',
              description: null,
              image: null,
            }}
            preview={null}
          >
            <div className="pt4  pt0-md  pb4">
              <Container>
                {user && app.deviceSize && (
                  <div className="tabs-wrapper--side-bar">
                    <Tabs
                      /* Options */
                      content={[
                        {
                          id: '1',
                          tabTitle: 'Profile',
                          tabContent: <ProfileEdit />,
                        },
                        {
                          id: '2',
                          tabTitle: 'Messages',
                          tabContent: (
                            <ProfileMessages
                              refreshDominion={refreshDominion}
                            />
                          ),
                        },
                        {
                          id: '3',
                          tabTitle: 'Offerings',
                          tabContent: (
                            <ProfileOfferings
                              refreshDominion={refreshOffering}
                            />
                          ),
                        },
                        {
                          id: '4',
                          tabTitle: 'Creations',
                          tabContent: <ProfileCreations />,
                        },
                        {
                          id: '5',
                          tabTitle: 'Pipeline',
                          tabContent: <ProfilePipeline />,
                        },
                        {
                          id: '6',
                          tabTitle: 'Billing',
                          tabContent: <ProfileBilling />,
                        },
                      ]}
                      defaultSelected={app.deviceSize === 'md' ? null : '1'}
                      onToggle={handleToggle}
                    />
                  </div>
                )}
              </Container>
            </div>
          </Layout>
        </div>
      </Elements>
    );
  }
}

export async function getServerSideProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
