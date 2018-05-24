/* @flow */
/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export class Link extends PureComponent {
  render() {
    return (
      <div>
        <p className="pb1  fornt-normal-a  dark-grey">
          {this.props.text}&nbsp;
          <a className="link  rendah-red  normal-font" href={this.props.url} target="_blank">{this.props.url}</a>
        </p>
      </div>
    );
  }
}

Link.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
};

Link.defaultProps = {
  text: '',
  url: '',
};

export default Link;
