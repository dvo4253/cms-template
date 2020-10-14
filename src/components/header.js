import { Layout } from 'antd';
import PropTypes from "prop-types"
import React from "react"
const { Header: AntHeader} = Layout;
const Header = () => (
  <AntHeader>
    Header
  </AntHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;
