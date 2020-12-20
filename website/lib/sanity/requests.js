import sanityImage from '@sanity/image-url';

import client, { previewClient } from './config';
import dateTodayISO from '~/functions/dateTodayISO';

const getUniquePosts = (posts) => {
  const slugs = new Set();
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false;
    }
    slugs.add(post.slug);
    return true;
  });
};

const postFields = `
  name,
  title,
  publishedAt,
  description,
  'slug': slug.current,
  'coverImage': image.asset->url,
  'author': author->{
    ...,
  },
  ...,
`;

const productFields = `
  ...,
  'category': category->title,
  'collection': collection->title,
  'slug': slug.current,
  'image1': image1.asset->url,
  'image2': image2.asset->url,
`;

const teamFields = `
  ...,
  'slug': slug.current,
`;

const getClient = (preview) => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export async function getSiteConfig() {
  const data = await client.fetch('*[_type == "siteSettings"] [0] { ..., }');
  return data;
}

// Posts
export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(date desc){
      ${postFields}
      content
    }`,
    { slug }
  );
  return data[0];
}

export async function getPostWithSearch(slug) {
  const data = await client.fetch(
    `*[_type == "post" && title match $slug || _type == "post" && excerpt match $slug]{
      ${postFields}
     }`,
    { slug }
  );
  return data;
}

export async function getFeaturedPost(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post" && featured] | order(publishedAt desc) [0] {
      ${postFields}
    }`);
  return results;
}

export async function getAllPosts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(date desc, _updatedAt desc) [0..31] {
      ${postFields}
    }`);
  return getUniquePosts(results);
}

export async function getAllPostsTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(date desc, _updatedAt desc) {
      ${postFields}
    }`);
  return getUniquePosts(results);
}

export async function getCategory(category, range) {
  const rangeFrom = range[0];
  const rangeTo = range[1];

  const results = await getClient(null).fetch(
    `*[_type == "category" && slug.current == $category] [0] {
      ...,
          "articles": *[_type == "post" && references(^._id)] | order(date desc, _updatedAt desc) [$rangeFrom..$rangeTo] {
            ${postFields}
            }
          }`,
    { category, rangeFrom, rangeTo }
  );

  return results;
}

export async function getCurrentAndPreviousCyphers(preview) {
  const curClient = getClient(preview);

  const [current, previous] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "cypher" && announcementFields.isAnnounced] | order(announcementFields.announcedAt desc) {
              ...,
            } `
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "cypher" && publishedFields.isPublished] {
            ...,
            }  | order(publishedFields.publishedAt desc)`
    ),
  ]);

  return { current: current || null, previous: getUniquePosts(previous) };
}

export async function getLatestAnouncedCypher(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "cypher" && announcementFields.isAnnounced && !publishedFields.isPublished] | order(announcementFields.announcedAt desc) [0] {
      ...,
    }`);

  return results;
}

export async function getLatestPublishedCypher(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "cypher" && publishedFields.isPublished] | order(publishedFields.publishedAt desc) [0] {
      ...,
    }`);

  return results;
}

export async function getTeamMembers(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "author" && active] | order(order asc){
      ${teamFields}
    }`);
  return getUniquePosts(results);
}

export async function getTeamMemberAndPosts(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "author" && active && slug.current == $slug] [0] {
      ${teamFields}
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) [0..23] {
      ${postFields}
    }
    }`,
    { slug }
  );
  return results;
}

export async function getAllProducts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "storeItem"] | order(date desc, _updatedAt desc) {
      ${productFields}
    }`);
  return getUniquePosts(results);
}

export async function getAllProductsTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "storeItem"] | order(date desc, _updatedAt desc) {
      ${productFields}
    }`);
  return getUniquePosts(results);
}

export async function getProduct(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "storeItem" && slug.current == $slug] | order(date desc, _updatedAt desc) [0] {
      ${productFields}
    }`,
    { slug }
  );
  return results;
}

export async function getPostAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc){
        ${postFields}
        content,
      }[0...4]`,
      { slug }
    ),
  ]);
  return { post, morePosts: getUniquePosts(morePosts) };
}

export async function getPreviewProductBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "product" && slug.current == $slug] | order(date desc){
      ${productFields}
      content,
    }`,
    { slug }
  );
  return data[0];
}

export async function getProductAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [product, moreProducts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "product" && slug.current == $slug] | order(_updatedAt desc) {
        ${productFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "product" && slug.current != $slug] | order(date desc, _updatedAt desc){
        ${productFields}
        content,
      }[0...4]`,
      { slug }
    ),
  ]);

  return { product, moreProducts: getUniquePosts(moreProducts) };
}

export async function getLatestMix(preview) {
  const results = await getClient(preview).fetch(`*[_type == "mix"] [0] {
      ...,
    }`);

  return results;
}

export async function getMixes(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "mix"] | order(date desc, _updatedAt desc) [0..15] {
      ...,
    }`);
  return getUniquePosts(results);
}

export async function getLatestDominionItem(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "dominionItem"] | order(activeFrom desc) [0] {
      ...,
    }`);
  return results;
}

export async function getDominionItemsSinceDate(sinceStartOfMonth, preview) {
  const curClient = getClient(preview);

  const [results, welcome] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "dominionItem" && activeFrom >= $sinceStartOfMonth] | order(activeFrom desc) {
        ...,
        "slug": slug.current,
      }`,
        { sinceStartOfMonth }
      )
      .then((res) => res),
    curClient.fetch(
      `*[_type == "dominionItem" && slug.current == "welcome-to-the-dominion"] [0] {
        ...,
        "slug": slug.current,
      }`
    ),
  ]);

  results.push(welcome);
  return getUniquePosts(results);
}

export async function getSmartLink(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "smartLink" && slug.current == $slug] | order(activeFrom desc) [0] {
      ...,
    }`,
    { slug }
  );
  return results;
}

export async function getSmartLinksTotal(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "smartLink" && slug.current] | order(activeFrom desc) {
      ...,
    }`
  );
  return results;
}

export async function getLinkInBio(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "linkInBio"] [0] {
      ...,
    }`
  );
  return results;
}
