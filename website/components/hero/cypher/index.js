import Link from 'next/link';
import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

import {
  Modal,
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function HeroCypher({ cypher }) {
  const app = useApp();
  if (!app.deviceSize) return null;

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;
  const [modalActive, setModalActive] = useState(false);

  let scale = 1;
  if (app.isRetina) scale = 2;
  let imageUrlWidth;
  let imageUrlHeight;
  let imageHeight;

  if (app.deviceSize === 'md') {
    imageUrlWidth = 680;
    imageUrlHeight = 1000;
    imageHeight = 500;
  }

  if (app.deviceSize === 'lg') {
    imageUrlWidth = 1550;
    imageUrlHeight = 500;
    imageHeight = 500;
  }

  if (app.deviceSize === 'xl') {
    imageUrlWidth = 1800;
    imageUrlHeight = 500;
    imageHeight = 500;
  }

  const heroImage = (
    <Image
      /* Options */
      src="/images/cypher-youtube.jpg"
      placeholder={null}
      alt="This is the alt text."
      figcaption={null}
      height={500}
      width={null}
      customClass={null}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroHeading = (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="Rendah Mag Cyphers"
      color="white"
      size="x-large"
      truncate={null}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heroButton = (
    <Button
      /* Options */
      type="secondary"
      size="medium"
      text="Enter this month's Cypher"
      color="white"
      fluid={false}
      icon={buttonIcon}
      iconFloat={null}
      inverted={false}
      loading={false}
      disabled={false}
      onClick={() => setModalActive(!modalActive)}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <>
      <Modal
        /* Options */
        size="small"
        active={modalActive}
      >
        <div className="pb2">
          <Heading
            /* Options */
            htmlEntity="h3"
            text="Login or Sign up to enter this month's Cypher!"
            color="black"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="flex  flex-wrap  pb2">
          <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center">
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Login"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={null}
              /* Children */
              withLinkProps={{
                type: 'next',
                href: '/login',
                target: null,
                routerLink: Link,
                routerLinkProps: null,
              }}
            />
          </div>
          <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center">
            <Button
              /* Options */
              type="primary"
              size="medium"
              text="Sign Up"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={null}
              /* Children */
              withLinkProps={{
                type: 'next',
                href: '/signup',
                target: null,
                routerLink: Link,
                routerLinkProps: null,
              }}
            />
          </div>
          <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center  pl2">
            <Button
              /* Options */
              type="secondary"
              size="medium"
              text="Cancel"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={() => {
                setModalActive(!modalActive);
              }}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>
      </Modal>

      <Parallax className="z1  nt3" y={['-50px', '50px']} tagOuter="figure">
        <div className="hero--cypher  hero--darken-all">
          <Hero
            /* Options */
            height={500}
            /* Children */
            image={heroImage}
            title={heroHeading}
            description={null}
            button={cypher ? heroButton : null}
          />
        </div>
      </Parallax>
    </>
  );
}
