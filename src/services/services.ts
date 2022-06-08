import { Method, TestCase, TestQuery, TestRunStatus } from "./queries"
import { TestRow } from "../components/testrun/test-tab"
import { createTheme } from "@mui/material/styles"
import { TcRow } from "../components/testlist/tcs-tab"
import moment from "moment"

export const theme = createTheme({
  palette: {
    background: {
      default: "#f8f8f8"
    }
  }
})

export const bgImg = {
  backgroundImage:
    "url(https://source.unsplash.com/user/keploy/likes/)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}

export function convertTime(t: string) {
  if (t == undefined) {
    return "NAN"
  } else {
    return moment.utc(t).local().format('DD/MM/YY HH:mm')
  }
}

export function getTestForURL(tests: TestQuery[]) {
  let urlTests = new Map<string, TestQuery[]>()

  for (let t of tests) {
    if (urlTests.has(t.uri + "@" + t.req.method)) {
      let tmp = urlTests.get(t.uri + "@" + t.req.method)!
      tmp.push(t)
      urlTests.set(t.uri + "@" + t.req.method, tmp)
      continue
    }
    let tmp: TestQuery[] = [t]
    urlTests.set(t.uri + "@" + t.req.method, tmp)
  }
  return urlTests
}

export function getRows(tests: TestQuery[]) {
  return Array.from(tests.reduce((map, t) => (
    map.set(t.id, {
      dependencyTypes: [...new Set(t.deps?.map(item => item.type))],
      proto: t.req.protoMajor + "." + t.req.protoMinor,
      id: t.id,
      status: t.status,
      statusCode: t.result.statusCode.actual,
      time: convertTime(t.started)
    }), map
  ), new Map<string, TestRow>()).values())
}


export function getTcRows(tcs: TestCase[]) {
  return Array.from(tcs.reduce((map, t) => (
    map.set(t.id, {
      uri: t.uri? t.uri : "",
      proto: t.httpReq?.protoMajor + "." + t.httpReq?.protoMinor,
      id: t.id,
      statusCode: t.httpResp? t.httpResp!.statusCode! : 0,
      time: t.updated? convertTime(t.updated) : "",
      method: t.httpReq? t.httpReq?.method! : Method.OPTIONS
    }), map
  ), new Map<string, TcRow>()).values())
}

export function isJSON(text: string) {
  try {
    JSON.parse(text)
  } catch (e) {
    return "plain"
  }
  return typeof JSON.parse(text)
}

export function getStatusColor(status: TestRunStatus) {
  switch (status.valueOf()) {
    case "FAILED" : {
      return "error.main"
    }
    case "PASSED": {
      return "success.main"
    }
    default : {
      return "warning.main"
    }
  }
}

export function deepCopyTc(original : TestCase) {
  return {
    id : original.id,
    created: original.created,
    updated: original.updated,
    captured: original.captured,
    cid: original.cid,
    app: original.app,
    uri: original.uri,
    httpReq: {
      protoMajor: original.httpReq?.protoMajor,
      protoMinor: original.httpReq?.protoMinor,
      url: original.httpReq?.url,
      urlParam:  JSON.parse(JSON.stringify(original.httpReq?.urlParam)),
      header:  JSON.parse(JSON.stringify(original.httpReq?.header)),
      method: original.httpReq?.method,
      body: original.httpReq?.body
    },
    deps: JSON.parse(JSON.stringify(original.deps)),
    httpResp: {
      statusCode: original.httpResp?.statusCode,
      header:  JSON.parse(JSON.stringify(original.httpResp?.header)),
      body: original.httpResp?.body
    },
    anchors:  JSON.parse(JSON.stringify(original.anchors)),
    noise:  JSON.parse(JSON.stringify(original.noise))
  }
}
