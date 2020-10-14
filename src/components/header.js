import React from "react"
import { Layout, Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import PropTypes from "prop-types"
const { Header: AntHeader } = Layout;

const Header = () => (
  <AntHeader>
    <Menu mode="horizontal">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        Navigation One
        </Menu.Item>
    </Menu>
  </AntHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;
