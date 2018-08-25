/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { convertDate } from '../../../functions';
import AnimatedImage from '../../Elements/AnimatedImage';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    return (
      <div className="container-medium  center">
        <div className="flex  flex-wrap">
          {this.props.list.map(article => (
            <div key={article.title} className="col-24  col-12-sm  col-24-lg  mt2  mb3  shadow2">
              <article className="flex  flex-wrap">
                <figure className="col-7">
                  <Link className="db" to={`/article/${article.url}`}>
                    <AnimatedImage
                      lazy
                      src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${article.img}`}
                      alt={article.title}
                      styles="fade-in-zoom-in  h2  w-100"
                    />
                  </Link>
                </figure>

                <div className="col-17  ph3">
                  <Link to={`/article/${article.url}`} className="t-body  db  link  pt2">
                    <p className="t-title  black  f6  cp  over-hidden  link  list-card__title">{article.title}</p>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ArticleListGrid.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

ArticleListGrid.defaultProps = {
  list: [],
};

export default ArticleListGrid;
