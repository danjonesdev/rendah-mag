import React from 'react';

import { getAllPosts, imageBuilder } from '~/lib/sanity/requests';

import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (posts) => {
  let postsXML = '';

  posts.map((post) => {
    const title = post?.title;

    const titleBlock = post?.title
      ? `<h2 style="font-weight: bold; text-align: left; font-size: 20px; line-height: 26px;">${title}</h2>`
      : '';

    const url = post?.slug
      ? `${process.env.SITE_URL}/article/${post.slug}`
      : process.env.SITE_URL;

    const readMoreLink = `<p><a style="color: #000000; text-decoration: underline; text-align: left; font-size: 20px; line-height: 26px;" href="${url}" target="_blank">Read full article</a></p>`;

    const spacer = `
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td>
              <br />
            </td>
          </tr>
        </table>
      `;

    const iteration = `
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td width="120" valign="top">
            <img width="120" style="width: 120px;" src="${imageBuilder
              .image(post.image)
              .height(240)
              .width(240)
              .auto('format')
              .url()}" alt="${post?.title}">
          </td>
          <td width="20" valign="middle">
          </td>
          <td width="210" valign="middle">
            ${titleBlock}
            ${readMoreLink}
          </td>
        </tr>
      </table>
      `;

    postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link>${escapeXml(encodeSpecialChar(url))}</link>
        <description>
          ${escapeXml(encodeSpecialChar(iteration))}
          ${escapeXml(encodeSpecialChar(spacer))}
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
};

export default class BlogLatest extends React.Component {
  static async getInitialProps({ res }) {
    const posts = await getAllPosts();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(posts));
    res.end();
  }
}
