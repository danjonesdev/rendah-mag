/* eslint-disable import/no-named-as-default, max-len, react/prefer-stateless-function,
jsx-a11y/no-static-element-interactions, arrow-body-style */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import SearchInput from '../../../components/SearchInput';
import { Menu } from '../../../components/Elements/Svg';

export class Header extends PureComponent {
  constructor() {
    super();
    this.state = {
      navIsActive: false,
    };
  }

  mobileNavToggle = () => {
    if (!this.state.navIsActive) {
      this.setState({ navIsActive: true });
    } else {
      this.setState({ navIsActive: false });
    }
  }

  render() {
    const links = [
      {
        to: '/',
        text: 'Home',
      },
      {
        to: '/authors',
        text: 'Authors',
      },
      {
        to: '/get-involved',
        text: 'Get Involved',
      },
      {
        to: '/watch-tower',
        text: 'Watch Tower',
      },
      {
        to: '/category/news',
        text: 'News',
      },
      {
        to: '/category/interviews',
        text: 'Interviews',
      },
      {
        to: '/category/news',
        text: 'News',
      },
      {
        to: '/category/insights',
        text: 'Insights',
      },
    ];

    const navMobile = classNames({
      'header__mobile__nav  fix  bg-white  z9': true,
      'header__mobile__nav--active': this.state.navIsActive,
    });

    return (
      <React.Fragment>
        <header className="fix  w-100  shadow1  z9  bg-white  dn  db-lg  header__desktop">
          <nav className="container-large  center  rel" role="banner">
            <Link className="link  abs  w3  header__desktop__logo" to={'/'}>
              <img className="pt1  mt1" width="38" src="http://res.cloudinary.com/dzz8ji5lj/image/upload/v1535320221/brand/rendah-medium-reversed.jpg" alt="Logo" role="presentation" />
            </Link>

            <ul className="tac  abs  header__desktop__nav__list">
              {links.map((link) => {
                return (
                  <li className="dib">
                    <Link className="t-title  ttu  bold  dark-grey  ph2  f5  link" to={link.to}>{link.text}</Link>
                  </li>
                );
              })}
            </ul>

            <div className="abs  header__desktop__search">
              <SearchInput textAlign="inherit" />
            </div>
          </nav>
        </header>

        <header className="fix  w-100  shadow1  z9  bg-white  db  dn-lg  header__mobile">
          <span onClick={this.mobileNavToggle} className=""><Menu /></span>

          <Link className="link  abs  w3  center  center  header__mobile__logo" to={'/'}>
            <img className="pt1  mt1  center" width="38" src="http://res.cloudinary.com/dzz8ji5lj/image/upload/v1535320221/brand/rendah-medium-reversed.jpg" alt="Logo" role="presentation" />
          </Link>

          <nav className={navMobile} role="banner">
            <ul className="tac  fix  center  header__mobile__nav__list">
              {links.map((link) => {
                return (
                  <li className="db">
                    <Link onClick={this.mobileNavToggle} className="t-title  ttu  bold  db  dark-grey  pv3  f4  link" to={link.to}>{link.text}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
