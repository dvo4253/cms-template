import React from "react"
import Layout from "./src/components/layout";

export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>
}
// Wraps every page in a component
export default {
    wrapPageElement
}