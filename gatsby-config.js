require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: process.env.PATH_PREFIX_PATH,
  siteMetadata: {
    title: `Keploy.`,
    description: `API testing without writing test cases or setting up test environments`,
    author: `@nehagup`,
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
      resolve: "gatsby-plugin-svgr",
      options: {
        prettier: true,          // use prettier to format JS code output (default)
        svgo: true,              // use svgo to optimize SVGs (default)
        svgoConfig: {
          plugins: [
            { removeViewBox: true }, // remove viewBox when possible (default)
            { cleanupIDs: true }    // remove unused IDs and minify remaining IDs (default)
          ]
        }
      }
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'G-6ZV5GMC445', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-analytics', // default
          anonymize: true, // default
          allowAdFeatures: false // default
        },
        googleTagManager: {
          trackingId: '',
          cookieName: 'gatsby-gdpr-google-analytics',
          dataLayerName: 'dataLayer',
        },
        facebookPixel: {
          pixelId: '',
          cookieName: 'gatsby-gdpr-google-analytics',
        },
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: process.env.PATH_PREFIX_PATH,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the project.
      },
    },
    `gatsby-plugin-material-ui`,
  ],
}
