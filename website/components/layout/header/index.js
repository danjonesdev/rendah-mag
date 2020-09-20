import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import NProgress from 'nprogress';

import { Icon } from 'next-pattern-library';

const HeaderDesktop = dynamic(() => import('./desktop'));
const HeaderMobile = dynamic(() => import('./mobile'));

import { useApp } from '../../../context-provider/app';
import { useUser } from '~/lib/hooks';

export default function Header({ navOnWhite, meta }) {
  const app = useApp();
  const [user, { mutate }] = useUser();
  const [navColour, setNavColour] = useState('black');

  const signIn = <Icon icon={['fas', 'sign-in-alt']} />;
  const signOut = <Icon icon={['fas', 'sign-out-alt']} />;
  const store = <Icon icon={['fas', 'store-alt']} />;
  const shoppingCart = (
    <Icon color={navColour} icon={['fas', 'shopping-cart']} />
  );

  const buttonIcons = {
    signIn,
    signOut,
    store,
    shoppingCart,
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
    mutate({ user: null });
  };

  const showBasket = !!(
    meta.title === 'Store' ||
    meta.title === 'Product' ||
    meta.title === 'Dominion'
  );

  useEffect(() => {
    if (app.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [app.isLoading]);

  useEffect(() => {
    if (navOnWhite) {
      setNavColour('black');
    } else {
      setNavColour('white');
    }
  }, [navOnWhite]);

  if (app?.deviceType) {
    return (
      <>
        {app.deviceType !== 'mobile' && (
          <HeaderDesktop
            meta={meta}
            navColour={navColour}
            navOnWhite={navOnWhite}
            handleLogout={handleLogout}
            showBasket={showBasket}
            buttonIcons={buttonIcons}
          />
        )}
        {app.deviceType === 'mobile' && (
          <HeaderMobile
            meta={meta}
            navColour={navColour}
            navOnWhite={navOnWhite}
            handleLogout={handleLogout}
            showBasket={showBasket}
            buttonIcons={buttonIcons}
          />
        )}
      </>
    );
  }
  return false;
}
