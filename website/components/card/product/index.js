import Link from 'next/link';

import { Card, Image, Label, Heading, Copy } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardDefault({ product }) {
  const app = useApp();

  const cardImage = (
    <Image
      /* Options */
      src={imageBuilder
        .image(product.image1)
        .height(app.deviceType === 'mobile' ? 800 : 500)
        .width(app.deviceType === 'mobile' ? 800 : 500)
        .url()}
      placeholder={imageBuilder
        .image(product.image1)
        .height(20)
        .width(25)
        .url()}
      alt={product.title}
      figcaption={null}
      height={app.deviceType === 'mobile' ? 300 : 220}
      width={null}
      customClass={null}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/product/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/product/${product.slug}`,
        },
      }}
    />
  );

  const cardLabel = (
    <Label
      /* Options */
      customClass="ph2"
      text={`£${product.price}`}
      color="white"
      backgroundColor="black"
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const cardHeading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={product.title}
      color="black"
      size="small"
      truncate={1}
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const cardCopy = (
    <Copy
      /* Options */
      text={product.excerpt}
      color="black"
      size="medium"
      truncate={1}
    />
  );

  return (
    <Card
      /* Options */
      type="block"
      onClick={null}
      /* Children */
      image={cardImage}
      labelBlock={[cardLabel]}
      title={cardHeading}
      description={cardCopy}
      button={null}
    />
  );
}
