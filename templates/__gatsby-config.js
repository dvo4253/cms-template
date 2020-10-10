/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    plugins: [
      {
        resolve: "gatsby-source-sanity",
        options: {
          projectId: "@@_ProjectID_@@",
          dataset: "@@_DatasetName_@@",
          token: "@@_Token_@@"
        },
      },
    ],
  }
  