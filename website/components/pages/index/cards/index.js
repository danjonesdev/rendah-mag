import Link from 'next/link';

import { Hero, Heading, Copy, Image, Button, Icon } from 'next-pattern-library';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import HeroHome from '~/components/hero/home';
import CardBlog from '~/components/card/blog';
import CardProduct from '~/components/card/product';

export default function Home({
  siteConfig,
  latestFeaturedPost,
  latestInterviews,
  latestNews,
  latestInsights,
}) {
  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <>
      <HeroHome post={latestFeaturedPost} />

      <div className="pt5  pt6-md">
        <Container>
          {latestInterviews.length > 0 && (
            <section className="pb5">
              <div className="pb4">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text="Latest interviews."
                  color="black"
                  size="medium"
                  truncate={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <div className="flex  flex-wrap">
                {latestInterviews.map((post, i) => (
                  <div key={post.slug} className="col-24  col-12-md">
                    <div className="ph3  pv2">
                      <CardBlog i={i} post={post} columnCount={2} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  justify-end  pr2">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="More Interviews"
                  color="black"
                  fluid={false}
                  icon={buttonIcon}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/category/[slug]',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      as: `/category/interviews`,
                      scroll: false,
                    },
                  }}
                />
              </div>
            </section>
          )}

          <div className="flex  flex-wrap">
            {latestNews.length > 0 && (
              <div className="col-24  col-12-md  pr0  pr3-md">
                <section className="pb5">
                  <div className="pb4">
                    <Heading
                      /* Options */
                      htmlEntity="h2"
                      text="Latest news."
                      color="black"
                      size="medium"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {latestNews.map((post, i) => (
                      <div key={post.slug} className="col-24  col-12-md">
                        <div className="ph3  pv2">
                          <CardBlog i={i} post={post} columnCount={4} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex  justify-end  pr2">
                    <Button
                      /* Options */
                      type="secondary"
                      size="medium"
                      text="More News"
                      color="black"
                      fluid={false}
                      icon={buttonIcon}
                      iconFloat={null}
                      inverted={false}
                      loading={false}
                      disabled={false}
                      skeleton={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/category/[slug]',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          as: `/category/news`,
                          scroll: false,
                        },
                      }}
                    />
                  </div>
                </section>
              </div>
            )}
            {latestInsights.length > 0 && (
              <div className="col-24  col-12-md  pl0  pl3-md">
                <section className="pb5">
                  <div className="pb4">
                    <Heading
                      /* Options */
                      htmlEntity="h2"
                      text="Latest Insights."
                      color="black"
                      size="medium"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {latestInsights.map((post, i) => (
                      <div key={post.slug} className="col-24  col-12-md">
                        <div className="ph3  pv2">
                          <CardBlog i={i} post={post} columnCount={4} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex  justify-end  pr2">
                    <Button
                      /* Options */
                      type="secondary"
                      size="medium"
                      text="More Insights"
                      color="black"
                      fluid={false}
                      icon={buttonIcon}
                      iconFloat={null}
                      inverted={false}
                      loading={false}
                      disabled={false}
                      skeleton={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/category/[slug]',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          as: `/category/insights`,
                          scroll: false,
                        },
                      }}
                    />
                  </div>
                </section>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
