import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import isEmpty from 'lodash/isEmpty';

import {
  Tabs,
  Heading,
  Copy,
  Label,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getSiteConfig, getProduct, imageBuilder } from '~/lib/sanity/requests';

export default function Dominion({ siteConfig }) {
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;
  const [currentTab, setCurrentTab] = useState();
  const [snipcartData, setSnipcartData] = useState();

  useEffect(() => {
    if (process.browser) {
      if (window.Snipcart) {
        Snipcart.subscribe('order.completed', function (data) {
          if (data.items.length) {
            for (let i = 0; i < data.items.length; i += 1) {
              const item = data.items[i];

              if (item.id === 'dominion-subscription') {
                setTimeout(() => {
                  Snipcart.api.modal.close();
                  Router.push('/dominion-thank-you');
                }, 3000);
              }
            }
          }
        });

        Snipcart.subscribe('page.changed', function (page) {
          setCurrentTab(page);
        });

        Snipcart.subscribe('billingaddress.changed', function (address) {
          setSnipcartData(address);
        });
      }
    }
  });

  // Check if email already has a subscription
  useEffect(() => {
    const fetchCustomerLatestSubscription = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/snipcart/get-customer-latest-subscription`,
        {
          body: JSON.stringify({ email: snipcartData.email }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      const json = await response.json();

      if (response.ok) {
        // Success
        if (!isEmpty(json)) {
          const emailQuery = snipcartData?.email
            ? `?prefillEmail=${snipcartData.email}`
            : '';
          Snipcart.api.modal.close();
          Router.push(`/dominion-already-member${emailQuery}`);
        }
      }
    };

    if (
      currentTab === 'shipping-method' ||
      currentTab === 'payment-method' ||
      currentTab === 'order-confirm'
    ) {
      if (snipcartData) fetchCustomerLatestSubscription();
    }
  }, [currentTab, snipcartData]);

  return (
    <Layout
      navOffset="top"
      navOnWhite={true}
      hasNav
      hasFooter
      meta={{
        siteConfig,
        title: 'Dominion',
        description: 'Something new & exciting.',
        image:
          'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610196181/dominion/dominion-social-facebook-meta.png',
      }}
      preview={null}
    >
      <div className="pt4  pt0-md">
        <Container>
          <div className="measure-wide  mla  mra  mb4">
            <Image
              /* Options */
              src={
                'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1610317978/dominion/dominion-logo.png'
              }
              placeholder={null}
              alt={'Dominion'}
              figcaption={null}
              height={null}
              width={null}
              customClass={null}
              skeleton={false}
              onClick={null}
            />
          </div>

          <div className="flex  flex-wrap  pb5">
            <div className="col-24  flex  justify-center">
              <div className="measure-wide  mb3  ph4  ph0-md">
                <p className="f-secondary  taj  f5  pb4  lh-copy">
                  This year, the Rendah Mag team embarks upon a new journey.
                  With so much happening right now, we want to push our platform
                  into new territory, offering a new way for you to explore the
                  landscape of underground music culture. With an absolute
                  pleasure, we bring you the DOMINION.
                </p>
                <p className="f-secondary  taj  f5  pb3  lh-copy">
                  <strong>We offer the following to you:</strong>
                </p>
                <ul className="pl4  pb3">
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    A Welcome package (+ membership card & stickers).
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    A quarter-yearly printed issue of Rendah Mag.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Frequent exclusive music, samples, tutorials, and more from
                    featured artists & collectives.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Your own Dominion Profile login.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Discounts from all coming Rendah Mag products.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy  fw7  green">
                    If you're joining us in January, you also get a FREE
                    Dominion Cassette Tape Cypher!
                  </li>
                </ul>

                <p className="f-secondary  taj  f5  pb3  lh-copy">
                  Our mission with this project is to present something new and
                  exciting for the community in the hope that we can truly bring
                  something of value to artists and listeners alike. We want to
                  work not only with people of the industry, but also yourself
                  on a personal level to create something unique. I hope you can
                  join us.
                </p>
              </div>
            </div>

            <div className="col-24  flex  justify-center">
              <div className="db  ph2  pb3">
                <div
                  className="snipcart-add-item"
                  data-item-id="dominion-subscription"
                  data-item-price="7.99"
                  data-item-url="/dominion"
                  data-item-description=""
                  data-item-image=""
                  data-item-name="Dominion Subscription"
                  data-item-max-quantity="1"
                  data-item-weight="1"
                  data-item-payment-interval="Month"
                  data-item-payment-interval-count="1"
                  data-item-recurring-shipping="false"
                >
                  <Button
                    /* Options */
                    type="primary"
                    size="medium"
                    text="Click here to join"
                    color="black"
                    fluid={false}
                    icon={buttonIconPlus}
                    iconFloat="left"
                    inverted={false}
                    loading={false}
                    disabled={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>
              {
                // <div className="db  ph2  pb3">
                //   <div className="snipcart-checkout">
                //     <Button
                //       /* Options */
                //       type="primary"
                //       size="medium"
                //       text="View Basket"
                //       color="black"
                //       fluid={false}
                //       icon={buttonIconCart}
                //       iconFloat={null}
                //       inverted
                //       loading={false}
                //       disabled={false}
                //       onClick={null}
                //       /* Children */
                //       withLinkProps={null}
                //     />
                //   </div>
                // </div>
              }
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params, preview = false }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
    },
  };
}
