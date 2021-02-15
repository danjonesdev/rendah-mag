import { useState, useEffect } from 'react';
import Router from 'next/router';
import zenscroll from 'zenscroll';

import { Tabs } from 'next-pattern-library';

import ProfileEdit from '~/components/profile/edit';
import ProfileDominion from '~/components/profile/dominion';
import ProfilePipeline from '~/components/profile/pipeline';
import ProfileCreations from '~/components/profile/creations';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import { getSiteConfig } from '~/lib/sanity/requests';

export default function Profile({ siteConfig }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const [refreshDominion, setRefreshDominion] = useState(false);

  useEffect(() => {
    // redirect user to login if not authenticated
    if ((!loading && !user) || error) Router.replace('/login');
    setRefreshDominion(true);
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
    // if (visibleTab === '2') {
    //   setRefreshDominion(true);
    // }
  };

  if (user) {
    return (
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
                        tabTitle: 'Dominion',
                        tabContent: (
                          <ProfileDominion refreshDominion={refreshDominion} />
                        ),
                      },
                      {
                        id: '3',
                        tabTitle: 'Creations',
                        tabContent: <ProfileCreations />,
                      },
                      {
                        id: '4',
                        tabTitle: 'Pipeline',
                        tabContent: <ProfilePipeline />,
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
    );
  }
}

export async function getServerSideProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: { siteConfig },
  };
}
