/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import 'antd/dist/antd.css';
import React from "react"
import { Layout as AntLayout } from 'antd';
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { useCMS } from 'tinacms';
import useStyleForm from '../hooks/useStyleForm';
import Header from "./header"
import "./layout.css"
import AntColorSelector from '../fields/custom/antColorPicker';

const { Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  const cms = useCMS();
  cms.fields.add(AntColorSelector);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useStyleForm();

  return (
    <AntLayout>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <Content>

          <main>{children}</main>
        </Content>
        <Footer>
          <footer style={{
            marginTop: `2rem`
          }}>
            © {new Date().getFullYear()}, Built with
          {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </Footer>
      </div>
    </AntLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
