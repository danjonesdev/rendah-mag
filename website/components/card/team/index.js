import { useState } from 'react';
import Link from 'next/link';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';
import LazyLoad from 'react-lazyload';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardBlog({ teamMember, columnCount }) {
  const app = useApp();
  const [inView, setInView] = useState(false);

  if (!app.deviceSize) return null;
  const scale = app.isRetina ? 2 : 1;
  let imageUrlWidth = app.deviceSize === 'md' ? 260 : 230;
  let imageHeight = app.deviceSize === 'md' ? 260 : 180;
  const headingSize = app.deviceSize === 'md' ? 'medium' : 'small';

  if (columnCount === 2) {
    imageUrlWidth = app.deviceSize === 'md' ? 260 : 500;
    imageHeight = app.deviceSize === 'md' ? 260 : 300;
  }

  const handleIntersect = (event) => setInView(event.isIntersecting);
  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  const cardImage = (
    <Image
      /* Options */
      src={
        teamMember &&
        imageBuilder
          .image(teamMember.image)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={
        teamMember &&
        imageBuilder
          .image(teamMember.image)
          .height(imageHeight / 10)
          .width(imageUrlWidth / 10)
          .auto('format')
          .fit('clip')
          .blur('20')
          .url()
      }
      alt={teamMember?.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={false}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/team/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/team/${teamMember?.slug}`,
          scroll: false,
        },
      }}
    />
  );

  const cardLabel = teamMember?.alias ? (
    <Label
      /* Options */
      customClass="ph2"
      text={teamMember?.alias}
      color="white"
      backgroundColor="black"
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  ) : null;

  const cardHeading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={teamMember?.name}
      color="black"
      size={headingSize}
      truncate={4}
      /* Children */
      withLinkProps={null}
    />
  );

  return (
    <Observer {...observer}>
      <div className={`card--team  card--scroll  ${inView && 'in-view'}`}>
        <LazyLoad once offset={150} height={imageHeight}>
          <Card
            /* Options */
            type="block"
            onClick={null}
            /* Children */
            image={teamMember?.image?.asset && cardImage}
            labelBlock={[cardLabel]}
            title={cardHeading}
            description={null}
            button={null}
          />
        </LazyLoad>
      </div>
    </Observer>
  );
}
