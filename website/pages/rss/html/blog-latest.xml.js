import React from 'react';

import { getAllPosts, imageBuilder } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (posts) => {
  if (posts.length) {
    let postsXML = '';

    posts.map((post) => {
      const title = post?.title;

      const titleBlock = post?.title
        ? `<h2 style="font-weight: bold; text-align: left; font-size: 16px; line-height: 22px;">${title}</h2>`
        : '';

      const tagLineBlock = post?.socialTagline
        ? `<p style="color: #000000; text-align: left; font-size: 16px; line-height: 22px;">${post.socialTagline}</p>`
        : '';

      const url = post?.slug
        ? `${process.env.SITE_URL}/article/${post.slug}`
        : process.env.SITE_URL;

      const readMoreLink = `<p><a style="color: #000000; text-decoration: underline; text-align: left; font-size: 16px; line-height: 22px;" href="${url}" rel="noopener noreferrer" target="_blank">Read full article</a></p>`;

      const html = `
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td width="300" valign="top">
            <img style="width: 100%;" src="${imageBuilder
              .image(post.image)
              .height(400)
              .width(400)
              .auto('format')
              .url()}" alt="${post?.title}">
          </td>
        </tr>
        <tr>
          <td><br /></td>
        </tr>
        <tr>
          <td width="300" valign="top">
            ${titleBlock}
            ${tagLineBlock}
            ${readMoreLink}
          </td>
        </tr>
        <tr>
          <td><br /></td>
        </tr>
      </table>
      `;

      postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link>${escapeXml(encodeSpecialChar(url))}</link>
        <description>
          ${escapeXml(encodeSpecialChar(html))}
        </description>
      </item>
      `;

      return true;
    });

    return `
      <rss version="2.0">
        <channel>
          <title>RSS Feed</title>
          <link>${process.env.SITE_URL}</link>
          <description>This is a RSS feed</description>
          ${postsXML}
        </channel>
      </rss>
      `;
  }
};

export default class BlogLatest extends React.Component {
  static async getInitialProps({ res }) {
    const posts = await getAllPosts();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(posts));
    res.end();
  }
}
