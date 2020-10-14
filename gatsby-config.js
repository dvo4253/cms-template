/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
    siteMetadata: {
        title: `Gatsby Default Starter`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
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
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: "gatsby-source-sanity",
            options: {
                projectId: process.env.SANITY_PROJECT_ID,
                dataset: process.env.SANITY_DATA_SET,
                token: process.env.NODE_ENV === "development" ? process.env.SANITY_DEVELOPMENT_TOKEN : process.env.SANITY_TOKEN
            },
        },
        {
            resolve: 'gatsby-plugin-tinacms',
            options: {
              enabled: process.env.NODE_ENV !== 'production',
              sidebar: {
                position: 'displace',
              },
              plugins: [
                //...
              ],
            },
          },
    ],
}

