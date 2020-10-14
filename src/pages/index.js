import React from "react"
import { Button, DatePicker } from 'antd';


import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Button type="primary">PRESS ME</Button>
    <DatePicker placeholder="select date" />
  </Layout>
)

export default IndexPage
