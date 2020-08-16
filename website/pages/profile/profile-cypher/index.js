import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';
import BlockContent from '@sanity/block-content-to-react';

import { Heading, Button, Copy, Image } from 'next-pattern-library';

import { imageBuilder } from '../../../lib/sanity/requests';

export default function ProfileCypher({ cyphers }) {
  if (cyphers) {
    return (
      <>
        <div className="pb3">
          <Heading
            /* Options */
            htmlEntity="h3"
            text={"Enter this month's Cypher."}
            color="black"
            size="medium"
            truncate={null}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="flex  flex-wrap">
          <div className="col-24  col-12-md  pb3  pb0-md">
            <div className="shadow2">
              <Image
                /* Options */
                src={imageBuilder
                  .image(cyphers.current.imageSquare)
                  .height(1000)
                  .width(1000)
                  .url()}
                placeholder={imageBuilder
                  .image(cyphers.current.imageSquare)
                  .height(50)
                  .width(108)
                  .url()}
                alt="This is the alt text."
                figcaption={null}
                height={500}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
          <div className="col-24  col-12-md  ph0  ph4-md">
            <div className="pb0">
              <Heading
                /* Options */
                htmlEntity="h3"
                text={"This month's rules."}
                color="black"
                size="small"
                truncate={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="post__body  measure-wide  pb3">
              <BlockContent
                blocks={
                  cyphers.current.announcementFields.announcementDescription
                }
              />
            </div>
            <div className="flex  flex-wrap">
              <div className="pb3  pr3">
                <Button
                  /* Options */
                  type="primary"
                  size="small"
                  text="Download Pack"
                  color="black"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'external',
                    href: cyphers.current.packLink,
                    target: '_blank',
                    routerLink: null,
                    routerLinkProps: null,
                  }}
                />
              </div>
              <div className="pb3  pr3">
                <Button
                  /* Options */
                  type="primary"
                  size="small"
                  text="Submission Form"
                  color="black"
                  fluid={false}
                  icon={null}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'external',
                    href: cyphers.current.submissionFormLink,
                    target: '_blank',
                    routerLink: null,
                    routerLinkProps: null,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
