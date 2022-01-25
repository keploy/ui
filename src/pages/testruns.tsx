import Layout from "../components/global/layout"
import SEO from "../components/global/seo"
import React from "react"
import { CLIENT } from "../constants"
import { ApolloProvider } from "@apollo/client"
import RecentTestRuns from "../components/testrun/recent-testruns"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../services/services"

export default function TestRuns() {
  return (
    <ApolloProvider client={CLIENT}>
      <ThemeProvider theme={theme}>
        <Layout>
          <SEO title="Deployment History" />
          <RecentTestRuns />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}
