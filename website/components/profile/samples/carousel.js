import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import { useKeenSlider } from 'keen-slider/react';
import {
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
  Label,
  Modal,
} from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const buttonIconDownload = <Icon icon={['fas', 'arrow-alt-circle-down']} />;
const iconInfo = <Icon icon={['fas', 'info-circle']} size="lg" />;

export default function Carousel({ packs, refreshDominion }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const disableArrows = packs.length <= (app.deviceSize === 'md' ? 1 : 3);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const sliderNavOptions = {
    slidesPerView: app.deviceSize === 'md' ? 1 : 3,
    mode: 'snap',
    centered: app.deviceSize === 'md',
    spacing: 0,
    controls: app.deviceSize === 'md' ? true : false,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  };

  const [sliderNavRef, sliderNav] = useKeenSlider(sliderNavOptions);

  const ArrowLeft = (props) => {
    const { onClick, disabled } = props;

    return (
      <button
        onClick={onClick}
        type="button"
        className={`carousel-arrow--left  pa2 ${
          disabled ? 'light-grey' : 'black  cp'
        }`}
      >
        <Icon
          icon={['fas', 'chevron-left']}
          size={app.deviceSize === 'md' ? '3x' : '2x'}
        />
      </button>
    );
  };

  const ArrowRight = (props) => {
    const { onClick, disabled } = props;

    return (
      <button
        onClick={onClick}
        type="button"
        className={`carousel-arrow--right  pa2 ${
          disabled ? 'light-grey' : 'black  cp'
        }`}
      >
        <Icon
          icon={['fas', 'chevron-right']}
          size={app.deviceSize === 'md' ? '3x' : '2x'}
        />
      </button>
    );
  };

  const renderGhostCards = () => {
    let loop;
    const arr = [];

    if (packs.length === 0) loop = 3;
    if (packs.length === 1) loop = 2;
    if (packs.length === 2) loop = 1;
    if (!loop || app.deviceSize === 'md') return false;

    for (let i = 0; i < loop; i++) {
      arr.push(
        <article
          className="www  keen-slider__slide  relative  pt3  ph3  pb4"
          key={i}
        >
          <div className="relative  profile__dominion__carousel-item__wrapper">
            <div
              className={`profile__dominion__carousel-item  mla  mra  flex  align-center  justify-center  pa4  br4  bg-light-grey`}
            >
              <div className="flex  flex-wrap">
                <p className="col-24  t-primary  grey  f5  f6-md  tac  lh-copy  pb2">
                  ???
                </p>
                <p className="col-24  t-secondary  grey  f7  tac  lh-copy">
                  ???
                </p>
              </div>
            </div>
          </div>

          <div className="absolute  flex  justify-center  bottom  left  right">
            <Button
              /* Options */
              type="secondary"
              size="medium"
              text="Download"
              color="grey"
              fluid={false}
              icon={buttonIconDownload}
              iconFloat={null}
              inverted
              loading={false}
              disabled={true}
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </article>
      );
    }

    return arr;
  };

  if (refreshDominion) {
    return (
      <div className="min">
        <section
          className={`
          dominion-carousel-wrapper
          dominion__packs__carousel
          `}
        >
          <div className="pb2">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Sample Packs"
              color="black"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb4  mb2">
            <p className="black  f6  lh-copy">
              As part of our service, we'll occasionally roll out Sample packs
              with exclusive sounds from the labels & artists that we work with.
            </p>
          </div>

          <div className="dominion__carousel  navigation-wrapper  mb3-md">
            <div
              ref={sliderNavRef}
              className="keen-slider  flex  align-center  pb4"
            >
              {packs.map((item, i) => (
                <>
                  <Modal
                    /* Options */
                    size="small"
                    active={modalActive}
                  >
                    <div className="pb2  mb2">
                      <Heading
                        /* Options */
                        htmlEntity="h3"
                        text={item.title}
                        color="black"
                        size="medium"
                        truncate={0}
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                    <div className="pb3">
                      <Copy
                        /* Options */
                        text="Lorem ipsum dolor sit amet."
                        color="black"
                        size="medium"
                        truncate={null}
                      />
                    </div>
                    <div className="flex  flex-wrap  pb2">
                      <div className="col-24  flex  align-center">
                        <Button
                          /* Options */
                          type="primary"
                          size="small"
                          text="Close"
                          color="black"
                          fluid={false}
                          icon={null}
                          iconFloat={null}
                          inverted={false}
                          loading={false}
                          disabled={false}
                          skeleton={false}
                          onClick={() => {
                            setModalActive(false);
                          }}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    </div>
                  </Modal>

                  <article
                    className="www  keen-slider__slide  relative  pt3  ph3  pb4"
                    key={item._id}
                  >
                    <div className="relative  profile__dominion__carousel-item__wrapper">
                      <div
                        style={{
                          backgroundImage: `url(
                          ${imageBuilder
                            .image(item.image)
                            .auto('format')
                            .height(75)
                            .width(75)
                            .fit('clip')
                            .blur('20')
                            .url()}
                          )`,
                        }}
                        className={`profile__dominion__carousel-item  mla  mra  flex  align-center  justify-center  pa4  br4  shadow2`}
                      >
                        <div
                          onClick={() => {
                            setModalActive(true);
                          }}
                          className="cp  absolute top  right  nt2  mr3  info-color  bg-white  br-100  shadow2"
                        >
                          {iconInfo}
                        </div>

                        <div className="flex  flex-wrap">
                          <p className="col-24  t-primary  white  f5  f6-md  tac  lh-copy  text-shadow">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute  flex  justify-center  bottom  left  right">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Download"
                        color="black"
                        fluid={false}
                        icon={buttonIconDownload}
                        iconFloat={null}
                        inverted
                        loading={false}
                        disabled={false}
                        skeleton={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={{
                          type: 'external',
                          href: `${item.folder}?dl=`,
                          target: '_self',
                          routerLink: null,
                        }}
                      />
                    </div>
                  </article>
                </>
              ))}

              {renderGhostCards()}
            </div>

            {sliderNav && app.deviceSize !== 'md' ? (
              <>
                <ArrowLeft
                  onClick={(e) => {
                    // If not first slide
                    if (currentSlide !== 0) {
                      setCurrentSlide(
                        currentSlide - sliderNavOptions.slidesPerView
                      );
                    }

                    sliderNav.prev();
                  }}
                  disabled={currentSlide === 0 || disableArrows}
                />

                <ArrowRight
                  onClick={(e) => {
                    // If not last slide
                    if (currentSlide !== sliderNav.details().size - 1) {
                      setCurrentSlide(
                        currentSlide + sliderNavOptions.slidesPerView
                      );
                    }

                    sliderNav.next();
                  }}
                  disabled={
                    currentSlide >=
                      sliderNav.details().size -
                        sliderNavOptions.slidesPerView || disableArrows
                  }
                />
              </>
            ) : null}
          </div>

          {app.deviceSize === 'md' ? (
            <div className="dots">
              {packs.map((item, i) => {
                return (
                  <button
                    key={i}
                    className={'dot' + (currentSlide === i ? ' active' : '')}
                  />
                );
              })}
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}
