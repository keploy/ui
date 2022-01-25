import { TestCase, TestQuery, TestRunStatus } from "./queries"
import { TestRow } from "../components/testrun/test-tab"
import { createTheme } from "@mui/material/styles"
import { TcRow } from "../components/testlist/tcs-tab"

export const theme = createTheme({
  palette: {
    background: {
      default: "#f8f8f8"
    }
  }
})

export function testURL(url: string) {
  // returns true if testURL is not a valid URL
  if (url.length == 0) return false
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  return !(res !== null)
}

export function round(num: number) {
  return Math.round(num * 100) / 100
}

export function trimString(value: string) {
  return value.trim()
}

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
    return (new Date(t).getDate() + "/" + new Date(t).getMonth()
      + "/" + new Date(t).getFullYear()
      + ", " + new Date(t).getHours() + ":"
      + new Date(t).getMinutes())
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
      uri: t.uri,
      proto: t.httpReq.protoMajor + "." + t.httpReq.protoMinor,
      id: t.id,
      statusCode: t.httpResp.statusCode,
      time: convertTime(t.updated),
      method: t.httpReq.method
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
