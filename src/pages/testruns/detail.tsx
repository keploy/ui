import { CLIENT } from "../../constants"
import { ApolloProvider } from "@apollo/client"
import Layout from "../../components/global/layout"
import SEO from "../../components/global/seo"
import { navigate } from "gatsby"
import React from "react"
import { StringParam,NumberParam, useQueryParam } from "use-query-params"
import TestRunDetail from "../../components/testrun/testrun-detail"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../../services/services"

export default function Detail() {
  const [id] = useQueryParam("id", StringParam)
  const [index] = useQueryParam("index",NumberParam )
  if (id == null) {
    typeof window !== `undefined` && navigate("/testlist")
  }

  return (
    <ApolloProvider client={CLIENT}>
      <ThemeProvider theme={theme}>
        <Layout>
          <SEO title="Testrun Details" />
          <TestRunDetail testRunID={id!} index={index}/>
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}
