import {CLIENT} from "../../constants"
import { ApolloProvider } from "@apollo/client"
import Layout from "../../components/global/layout"
import SEO from "../../components/global/seo"
import { navigate } from "gatsby"
import React from "react"
import { getQueryParams } from "react-use-query-param-string";
import TestRunDetail from "../../components/testrun/testrun-detail"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../../services/services"

export default function Detail() {
  if (typeof window == 'undefined') {
    return null
  }

  const params = getQueryParams();
  const id = params['id']? params['id'].toString(): ""
  const index = params['index']? params['index']: '0'
  const tdId=  params['tdId']? params['tdId'].toString(): ""

  if (id == null) {
    typeof window !== `undefined` && navigate("/testruns")
  }
  return (
    <ApolloProvider client={CLIENT}>
      <ThemeProvider theme={theme}>
        <Layout>
          <SEO title="Testrun Details" />
          <TestRunDetail testRunID={id!} index={Number(index)} tdId={tdId} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}
