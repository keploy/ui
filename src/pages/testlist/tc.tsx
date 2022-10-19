import { CLIENT } from "../../constants"
import { getQueryParams } from 'react-use-query-param-string';
import { navigate } from "gatsby"
import { ApolloProvider } from "@apollo/client"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../../services/services"
import React from "react"
import Layout from "../../components/global/layout"
import SEO from "../../components/global/seo"
import TcsDetail from "../../components/testlist/tcs-detail"

export default function TestCase() {
  if (typeof window == 'undefined') {
    return null
  }

  const params = getQueryParams()
  const id = params["id"]? params["id"].toString(): ""
  if (id == null) {
    typeof window !== `undefined` && navigate("/testlist")
  }

  return (
    <ApolloProvider client={CLIENT}>
      <ThemeProvider theme={theme}>
        <Layout>
          <SEO title="Test Case Details" />
          <TcsDetail tc={id!} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}
