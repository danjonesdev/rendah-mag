import {
  Tabs,
  Heading,
  Copy,
  Label,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';
import HeroDominion from '~/components/hero/dominion';

import { getSiteConfig, getProduct, imageBuilder } from '~/lib/sanity/requests';

export default function Dominion({ siteConfig }) {
  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;

  const descriptionTab = (
    <div className="db  pb3">Buy the dom subscription.</div>
  );

  const deliveryTab = (
    <div className="db  pb3">Delivers are blah blah blah...</div>
  );

  return (
    <Layout
      navOffset={null}
      navOnWhite={false}
      meta={{
        siteConfig,
        title: 'Dominion',
        description: 'Join the Dominion Subscription.',
        image: null,
      }}
      preview={null}
    >
      <HeroDominion />
      <div className="pt4  pt0-md">
        <Container>
          <div className="flex  flex-wrap  pb5">
            <div className="col-24  flex  justify-center">
              <div className="measure-wide  mt5  mb3">
                <p className="f-secondary  taj  f5  pb4  lh-copy">
                  This year, the Rendah Mag team embarks on a new journey,
                  launching a fully-pledged subscription service for the
                  community. With so much to explore within Bass music right
                  now, we want to push our platform into new territory, offering
                  a new way for you to stay on top of the underground, we
                  present the <strong>Dominion Subscription</strong>.
                </p>
                <p className="f-secondary  taj  f5  pb4  lh-copy">
                  With the addition to being a magazine subscription, we offer
                  the following to you:
                </p>
                <ul className="pl4  pb3">
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Welcome package (Includes membership card & stickers).
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    A quarterly-printed issue of Rendah Mag.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Your own Dominion Profile on our Website.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Exclusive monthly updates on releases & insights within bass
                    music.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    20% off all Rendah Mag Products.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Early access to Rendah Mag Cyphers.
                  </li>
                  <li className="f-secondary  tal  f5  pb2  lh-copy">
                    Exclusive tracks, sample packs, and discounts from artists
                    and labels.
                  </li>
                </ul>
                <p className="f-secondary  taj  f5  pb4  lh-copy">
                  We hope you can join us on this new journey ❤️
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
                  data-item-weight="0"
                  data-item-payment-interval="Month"
                  data-item-payment-interval-count="1"
                >
                  <Button
                    /* Options */
                    type="primary"
                    size="medium"
                    text="Subscribe"
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
