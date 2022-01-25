import { gql } from "@apollo/client"

export const EDIT_TESTCASE = gql`
mutation updateTestCase( $tc: [TestInput])  {
    updateTestCase(tc: $tc) {
            id
            created
            updated
            captured
            cid
            app
            uri
            httpReq {
              protoMajor
              protoMinor
              urlParam {
                  key
                  value
                }
              header {
                  key
                  value
                }
              method
              body
            }
            deps {
                name
                type
                meta{
                    key
                    value
                  }
              }
            httpResp {
                    statusCode
                    protoMajor
                    protoMinor
                    header {
                          key
                          value
                      }
                    body
                }
            anchors
            noise
   }
  }`

export const GET_RECENT_TEST_RUNS = gql`
query getRecentTestRuns {
  testRun {
    id
    created
    updated
    status
    app
    user
    success
    failure
    total
  }
}
`

export const GET_TEST_RUN_DETAIL = gql`
query getRecentTestRuns($id : String) {
  testRun(id : $id) {
    id
    created
    updated
    status
    app
    user
    success
    failure
    total
     tests{
        id
        status
        started
        completed
        testCaseID
        deps {
                name
                type
                meta {
                    key
                    value
                }
         }
        uri
        noise
        req {
            protoMajor
            protoMinor
            urlParam {
                key
                value
              } 
            header{
                key
                value
              }
            method
            body
           }
        result {
            statusCode {
                   normal
                   expected
                   actual
                 }
            headersResult{
                normal
                expected {
                      key
                      value
                    }
                actual {
                    key
                    value
                   } 
                }
            bodyResult {
                    normal
                    type
                    expected
                    actual
                    errors {
                          key
                          missingInExpected
                          missingInActual
                    } 
                 }
            depResult {
                    name
                    type
                    meta {
                        normal
                        key
                        expected
                        actual
                    }
                }
        }
    } 
  }
}
`

export const GET_APPS = gql`
query getApps {
  apps {
    id
  }
}`

export const DELETE_TC = gql`
mutation deleteTestCase( $id: String!) {
    deleteTestCase(id: $id) 
  }
`

export const GET_TC = gql`
query getTc ($id : String!) {
  testCase(id: $id) {
          id
          created
          updated
          captured
          cid
          app
          uri
          httpReq {
              protoMajor
              protoMinor
              urlParam {
                  key
                  value
                }
              header {
                  key
                  value
                }
              method
              body
            }
            httpResp {
                    statusCode
                    header {
                          key
                          value
                      }
                    body
                }
          deps {
                name
                type
                meta {
                    key
                    value
                }
            }
          anchors
          noise
  }
}
`

export const GET_APP_TC = gql`
query getTc ($app : String!) {
  testCase(app: $app) {
          id
          created
          updated
          captured
          cid
          app
          uri
          httpReq {
              protoMajor
              protoMinor
              urlParam {
                  key
                  value
                }
              header {
                  key
                  value
                }
              method
              body
            }
            httpResp {
                    statusCode
                    header {
                          key
                          value
                      }
                    body
                }
          deps {
                name
                type
                meta {
                    key
                   value
                }
            }
          anchors
          noise
  }
}
`

export interface AppsData {
  apps: App[]
}

export interface AppTCs {
  testCase: TestCase[]
}

export interface TestRunData {
  testRun: TestRunQuery[]
}

export interface RecentTestRunsData {
  testRun: TestRunQuery[]
}

export interface TestcaseData {
  tc: TestCase
}

export interface App {
  id: string
}

export interface TestRunQuery {
  id: string
  created: string
  updated: string
  status: TestRunStatus
  app: string
  user: string
  success: number
  failure: number
  total: number
  tests?: TestQuery[]
}

export interface TestCase {
  id: string
  created: string
  updated: string
  captured: string
  cid: string
  app: string
  uri: string
  httpReq: HttpReq
  deps: Dependency[]
  httpResp: Result
  anchors: string[]
  noise: string[]
}

export interface TestQuery {
  id: string
  status: TestStatus
  started: string
  completed: string
  testCaseID: string
  req: HttpReq
  deps: Dependency[]
  uri: string
  result: ResultQuery
  noise: string[]
}

export interface Result {
  statusCode: number
  header: Header[]
  body: string
}

export interface ResultQuery {
  statusCode: IntResult
  headersResult: HeaderResult[]
  bodyResult: BodyResultQuery
  depResult: Dependency[]
}

export interface IntResult {
  normal: boolean
  expected: number
  actual: number
}

export interface BodyResultQuery {
  normal: boolean
  type: BodyType
  expected: string
  actual: string
  errors: JSONError[]
}

export interface JSONError {
  key: string
  missingInExpected: boolean
  missingInActual: boolean
}

export interface HeaderResult {
  normal: boolean
  expected: Header
  actual: Header
}

export interface Header {
  key: string
  value: string[]
}

export interface Dependency {
  name: string
  type: DependencyType
  meta: KV[]
}

export interface HttpReq {
  protoMajor: number
  protoMinor: number
  urlParam: KV[]
  header: Header[]
  method: Method
  body: string
}

export interface KV {
  key: string
  value: string
}

export enum SegmentType {
  ROOT,
  KEY,
  VALUE
}

export enum BodyType {
  PLAIN,
  JSON
}

export enum DependencyType {
  DB = " DB",
  SQL_DB = " SQL DB"
}

export enum Method {
  GET = "GET",
  PUT = "PUT",
  HEAD = "HEAD",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
}

export enum TestStatus {
  PENDING = "Pending",
  RUNNING = "Running",
  FAILED = "Failed",
  PASSED = "Passed",
}

export enum TestRunStatus {
  RUNNING = "Running",
  FAILED = "Failed",
  PASSED = "Passed"
}
