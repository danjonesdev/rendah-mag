import Link from 'next/link';
import { useState } from 'react';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function HeroDominion() {
  const app = useApp();
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  if (!app.deviceSize) return null;
  let scale = app.isRetina ? 2 : 1;
  let imageUrlWidth;
  let imageHeight = 500;

  if (app.deviceSize === 'md') imageUrlWidth = 700;
  if (app.deviceSize === 'lg') imageUrlWidth = 1600;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;

  const heroImage = (
    <Image
      /* Options */
      src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607718915/dominion/dominion-hero.png"
      // src={imageBuilder
      //   .image(post?.coverImage)
      //   .width(imageUrlWidth * scale)
      //   .height(imageHeight * scale)
      //   .auto('format')
      //   .fit('clip')
      //   .url()}
      // placeholder={imageBuilder
      //   .image(post?.coverImage)
      //   .height(imageHeight / 10)
      //   .width(imageUrlWidth / 10)
      //   .auto('format')
      //   .fit('clip')
      //   .blur('50')
      //   .url()}
      alt="Dominion"
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={false}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <>
      <div className="hero--darken-top">
        <Hero
          /* Options */
          height={imageHeight}
          /* Children */
          image={heroImage}
          title={null}
          description={null}
          button={null}
        />
      </div>
    </>
  );
}
