import React from "react"
import { Button, DatePicker } from 'antd';

import SEO from "../components/seo"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Button type="primary">PRESS ME</Button>
    <DatePicker placeholder="select date" />
  </>
)

export default IndexPage
