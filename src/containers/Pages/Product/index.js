/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Collections from '../../../containers/Fragments/Store/Collections';
import Categories from '../../../containers/Fragments/Store/Categories';
import ProductInfo from '../../../containers/Fragments/Store/ProductInfo';

export class Article extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <div className="container-medium  center  pv4">
          <div className="flex  flex-wrap">
            <div className="col-24  col-6-md">
              <span className="t-title  black  f6  bold  db">Collections</span>
              <Collections range={[1, 24]} type="grid" padding="pv2  pl2  pr3" />
              <span className="t-title  black  f6  bold  db">Categories</span>
              <Categories range={[1, 24]} type="grid" padding="pv2  pl2  pr3" />
            </div>
            <div className="col-24  col-18-md">
              <ProductInfo match={this.props.match} {...this.props} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

Article.propTypes = {
  match: PropTypes.shape(),
  search: PropTypes.string,
};

Article.defaultProps = {
  match: [],
  search: '',
};

export default Article;
