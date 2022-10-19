import {CLIENT} from "../../constants"
import { ApolloProvider } from "@apollo/client"
import Layout from "../../components/global/layout"
import SEO from "../../components/global/seo"
import { navigate } from "gatsby"
import React from "react"
import { useQueryParamString } from 'react-use-query-param-string';
// import { StringParam,NumberParam, useQueryParam } from "use-query-params"
import TestRunDetail from "../../components/testrun/testrun-detail"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../../services/services"

export default function Detail() {
  if (typeof window == 'undefined') {
    return null
  }

  const [id] = useQueryParamString("id", '')
  const [index='0'] = useQueryParamString("index",'0' )
  const [tdId=""]=useQueryParamString("tdId",'')

  if (id == null) {
    typeof window !== `undefined` && navigate("/testruns")
  }
  return (
    <ApolloProvider client={CLIENT}>
      <ThemeProvider theme={theme}>
        <Layout>
          <SEO title="Testrun Details" />
          <TestRunDetail testRunID={id!} index={index.toString()} tdId={tdId} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}
