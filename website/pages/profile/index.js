import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';
import zenscroll from 'zenscroll';

import { Tabs } from 'next-pattern-library';

import ProfileEdit from './profile-edit';
import ProfileCypher from './profile-cypher';
import ProfileOrders from './profile-orders';
import ProfileDominion from './profile-dominion';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import { getSiteConfig } from '~/lib/sanity/requests';

export default function Profile({ siteConfig }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const { addToast } = useToasts();

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
  }, [user, loading, error]);

  const handleToggle = (visibleTab, current) => {
    if (app.deviceType !== 'mobile') return;
    zenscroll.setup(300, 15);
    if (visibleTab) return zenscroll.to(current, 400);
    return zenscroll.toY(0);
  };

  return (
    <div className="bg-white  bg-almost-white-md">
      <Layout
        navOffset="top"
        navOnWhite
        meta={{
          siteConfig,
          title: 'Profile',
          description: 'This is the Profile page.',
          image: null,
        }}
        preview={null}
      >
        <div className="pt4  pt0-md  pb4">
          <Container>
            {user && (
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
                      tabTitle: 'Cyphers',
                      tabContent: <ProfileCypher />,
                    },
                    {
                      id: '3',
                      tabTitle: 'Dominion',
                      tabContent: <ProfileDominion />,
                    },
                    {
                      id: '4',
                      tabTitle: 'Orders',
                      tabContent: <ProfileOrders />,
                    },
                  ]}
                  defaultSelected="1"
                  onToggle={handleToggle}
                />
              </div>
            )}
          </Container>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
