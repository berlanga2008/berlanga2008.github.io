const environment =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
const he = require("he")
const striptags = require("striptags")
/*/home/alexwin/.cache/typescript/3.8/node_modules/@types/he/index*/
require("dotenv").config({ path: `.env.${environment}` })
{
}

const siteMetadataQuery = `{
  site {
    siteMetadata {
      title
      description
      siteUrl
      site_url: siteUrl
    }
  }
}`

const feedItemQuery = `{
  allWordpressPost(sort: {fields: [date], order:DESC}, limit: 10) {
    edges {
      node {
        simpleExcerpt
        slug
        title
        date
      }
    }
  }
}`

const contentUrlRegex = new RegExp(
  "https?://miguel.codifica.me/(?!wp-content)",
  "g"
)

const getFeedItem = (site, node) => ({
  description: node.excerpt,
  title: node.title,
  date: node.date,
  url: `${site.siteMetadata.siteUrl}/${node.slug}`,
  guid: `${site.siteMetadata.siteUrl}/${node.slug}`,
})

const normalizeContentUrls = ({ content, ...rest }) => ({
  content:
    content != null &&
    content.replace(contentUrlRegex, "https://malditawifi.web.app/"),
  ...rest,
})

const normalizeTitleEntities = ({ title, ...rest }) => ({
  title: title != null && he.decode(title),
  ...rest,
})

const normalizeExcerpt = ({ excerpt, ...rest }) => ({
  excerpt,
  simpleExcerpt: excerpt != null && he.decode(striptags(excerpt)),
  ...rest,
})

const normalizeSourceUrl = ({ source_url, ...rest }) => ({
  source_url:
    source_url != null &&
    source_url.replace(/^(https?:\/\/.*)-e\d+\.(.+?)$/g, "$1.$2"),
  ...rest,
})

const normalizers = [
  normalizeContentUrls,
  normalizeTitleEntities,
  normalizeExcerpt,
  normalizeSourceUrl,
]
const normalize = entity =>
  normalizers.reduce((entity, normalizer) => normalizer(entity), entity)

module.exports = {
  siteMetadata: {
    title: `Miguelo Web`,
    description: `Miguelo Web es mi web personal hecha en Gatsby y Wp como Backend`,
    author: `@codifica_me`,
    bio: `Miguel, consultor y desarrollador web, devOps and warrior code XD `,
    siteUrl: `https://malditawifi.web.app`,
    siteOrigin: new Date("2020-01-01"),
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `https://miguel.codifica.me`,
        protocol: `https`,
        hostingWPCOM: false,
        searchAndReplaceContentUrls: {
          sourceUrl: `https://miguel.codifica.me`,
          replacementUrl: `https://malditawifi.web.app`,
        },
        plugins: [
          {
            resolve: `gatsby-wordpress-inline-images`,
            options: {
              baseUrl: `malditawifi.web.app`,
              protocol: `https`,
            },
          },
        ],
        searchAndReplaceContentUrls: {
          sourceUrl: "https://miguel.codifica.me",
          replacementUrl: "https://malditawifi.web.app",
        },
        useACF: false,
        perPage: 100,
        concurrentRequests: 10,
        auth: {
          htaccess_user: process.env.WORDPRESS_API_USER,
          htaccess_pass: process.env.WORDPRESS_API_PASS,
        },
        includedRoutes: [
          `**/categories`,
          `**/posts`,
          `**/pages`,
          `**/media`,
          `**/tags`,
          `**/taxonomies`,
        ],
        excludedRoutes: [],
        normalizer: ({ entities }) => entities.map(normalize),
        plugins: [`gatsby-wordpress-reading-time`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    `react-cookie-consent`,
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`300`, `400`, `500`],
          },
          {
            family: `Roboto Mono`,
            variants: [`400`, `700`],
          },
          {
            family: "Teko",
            variants: ["200", "400", "500", "600", "700"],
          },
        ],
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: siteMetadataQuery,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) =>
              allWordpressPost.edges.map(({ node }) => getFeedItem(site, node)),
            query: feedItemQuery,
            output: `/rss.xml`,
            title: `Miguelo Web RSS feed`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Miguelo Web mini-tutoriales`,
        short_name: `Miguelo Web mini-tutoriales`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#55BABF`,
        display: `standalone`,
        icon: `src/images/codificame.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-10823856-59",
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://malditawifi.web.app',
        sitemap: 'https://malditawifi.web.app/sitemap.xml',
        configFile: 'robots-txt.config.js'
      },
    },
  ],
}
