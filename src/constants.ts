import { createUploadLink } from "apollo-upload-client"
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client"
import { BodyType, Method, TestCase, TestQuery, TestStatus } from "./services/queries"

const fetch = require("node-fetch")
export const SERVER_URL = ((process.env.GATSBY_API_URL == "" || process.env.GATSBY_API_URL == undefined) && typeof window !== 'undefined')? `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/` : `${process.env.GATSBY_API_URL}/`
export const HTTP_LINK = createUploadLink({ uri: SERVER_URL + `query`, fetch: fetch })
export const AUTH_LINK = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: "BEARER "
    }
  })
  // Call the next link in the middleware chain.
  return forward(operation)
})
export const CLIENT = new ApolloClient({
  link: AUTH_LINK.concat(HTTP_LINK),
  cache: new InMemoryCache()
})

export const defaultTc: TestCase = {
  anchors: [],
  app: "",
  captured: "",
  cid: "",
  created: "",
  deps: [],
  httpReq: {
    protoMajor: 0,
    protoMinor: 0,
    urlParam: [],
    header: [],
    method: Method.DELETE,
    body: ""
  },
  httpResp: {
    statusCode: 0,
    header: [],
    body: "",
  },
  id: "",
  noise: [],
  updated: "",
  uri: ""
}

export const defaultTq: TestQuery = {
  noise: [], uri: "",
  completed: "",
  deps:[],
  id: "",
  req: {
    protoMajor: 0,
    protoMinor: 0,
    header: [],
    urlParam: [],
    method: Method.DELETE,
    body: ""
  },
  result: {
    statusCode: {
      normal: false,
      expected: 0,
      actual: 0
    },
    headersResult: [],
    bodyResult: {
      normal: false,
      type: BodyType.JSON,
      expected: "",
      actual: "",
      errors: []
    },
    depResult: []
  },
  started: "",
  status: TestStatus.FAILED,
  testCaseID: ""
}
