import { CLIENT } from "../constants"
import { ApolloProvider } from "@apollo/client"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../services/services"
import Layout from "../components/global/layout"
import SEO from "../components/global/seo"
import React from "react"
import TestList from "../components/testlist/test-list"

export default function TestsList() {
  return (
    <ApolloProvider client={CLIENT}>
      <ThemeProvider theme={theme}>
        <Layout>
          <SEO title="App Test Cases" />
          <TestList />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}
