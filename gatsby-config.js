const environment =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
const he = require("he")
const striptags = require("striptags")
require("dotenv").config({ path: `.env.${environment}` })

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

const contentUrlRegex = new RegExp(process.env.URL_REPLACEMENT_FROM, "g")

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
    content.replace(contentUrlRegex, process.env.URL_REPLACEMENT_TO),
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
    title: `Dimitri's tutorials`,
    description: `Dimitri's tutorials about software development with Java and JavaScript`,
    author: `@g00glen00b`,
    bio: `Dimitri "g00glen00b" Mestdagh is a consultant at Cronos and tech lead at Aquafin. Usually you can find him trying out new libraries and technologies. Loves both Java and JavaScript.`,
    siteUrl: process.env.SITE_URL,
    siteOrigin: new Date("2012-07-01"),
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
        baseUrl: process.env.WORDPRESS_API_HOST,
        protocol: process.env.WORDPRESS_API_PROTOCOL,
        hostingWPCOM: false,
        plugins: [
          {
            resolve: `gatsby-wordpress-inline-images`,
            options: {
              baseUrl: `codifica.me`,
              protocol: `https`,
            },
          },
        ],
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
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
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
            title: `Dimitri's tutorial RSS feed`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dimitri's tutorials`,
        short_name: `Dimitri\'s tutorials`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#55BABF`,
        display: `standalone`,
        icon: `src/images/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_TRACKING_ID,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-robots-txt`,
  ],
}
