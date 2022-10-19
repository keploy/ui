module.exports = {
  pathPrefix: process.env.KEPLOY_PATH_PREFIX || "/", 
  siteMetadata: {
    title: `Keploy.`,
    description: `API testing without writing test cases or setting up test environments`,
    author: `@nehagup`,
  },
  plugins: [
    {
      // Add paths to pages that set query params here.
      // This is a workaround: https://github.com/alexluong/gatsby-packages/issues/41
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/testlist/tc/*`, '/testruns/details/*'] },
    },
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
    // `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ff904d`,
        theme_color: `#ff904d`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the project.
      },
    },
    `gatsby-plugin-material-ui`,
  ],
}
