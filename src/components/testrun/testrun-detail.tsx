import React from "react"
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tabs,
  Typography,
} from "@mui/material"
import SEO from "../global/seo"
import { makeStyles } from "@mui/styles"
import TestTab from "./test-tab"
import { GET_TEST_RUN_DETAIL, TestRunData } from "../../services/queries"
import {
  convertTime,
  getStatusColor,
  getTestForURL,
} from "../../services/services"
import Empty from "../global/empty"
// @ts-ignore
import EmptyImg from "../../../static/empty2.png"
import Loading from "../global/backdrop"
import ErrorView from "../global/error"
import { useQuery } from "@apollo/client"
import { a11yProps, CustomTab, TabPanelBox } from "../global/tab-panel"
import { defaultTq } from "../../constants"
import { TestQuery } from "../../services/queries"

export interface TestRunDetailProps {
  testRunID: string
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  tabs: {
    minWidth: "100%",
    borderRight: `1px solid #00000`,
    marginTop: 10,
  },
  caption: {
    color: "#949393",
  },
  url: {
    margin: 2,
    wordBreak: "break-all",
  },
}))

export default function TestRunDetail(props: TestRunDetailProps) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [testDetail, setTestDetail] = React.useState<TestQuery>(defaultTq)
  const { loading, error, data } = useQuery<TestRunData>(GET_TEST_RUN_DETAIL, {
    variables: { id: props.testRunID },
  })
  if (loading) return <Loading />
  if (error) return <ErrorView msg={error.message} />
  if (
    data == undefined ||
    data?.testRun == undefined ||
    data?.testRun[0].tests == undefined ||
    data?.testRun[0].tests?.length == 0
  ) {
    return (
      <Empty
        doc={"https://github.com/keploy/keploy"}
        message={"Please wait while we run test cases for you! "}
        image={EmptyImg}
      />
    )
  }

  let urlData = getTestForURL(data.testRun[0].tests)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <SEO title="Test Run Details" />
      <Grid container>
        <Grid item xs={2}>
          <Grid item className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs endpoints"
              className={classes.tabs}
            >
              {[...urlData.keys()].map((e, i) => (
                <CustomTab
                  key={e}
                  label={
                    <React.Fragment>
                      <Grid
                        container
                        direction={"column"}
                        // dfsdfsdf
                        onClick={() => setTestDetail(defaultTq)}
                      >
                        <Grid item container>
                          <Grid item xs={6}>
                            {" "}
                            <Typography>
                              {" "}
                              {urlData.get(e)![0].req.method}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            container
                            justifyContent={"flex-end"}
                          >
                            <Typography className={classes.caption}>
                              {urlData.get(e)!.length} tests
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.url}>
                            {urlData.get(e)![0].uri}
                          </Typography>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  }
                  {...a11yProps(i)}
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Card sx={{ width: "98%", marginLeft: 1.5 }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor:
                      "#" + (((1 << 24) * Math.random()) | 0).toString(16),
                  }}
                  aria-label="recipe"
                >
                  {data.testRun[0].user.charAt(0)}
                </Avatar>
              }
              title={data.testRun[0].user + " tested " + data.testRun[0].app}
              subheader={convertTime(data.testRun[0].created)}
            />
            <CardContent>
              <Grid
                container
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Grid item xs={3}>
                  <Typography color={"primary"}>Total Tests </Typography>
                  <Typography color={"info.main"}>
                    {data.testRun[0].total}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography color={"primary"}>Passed </Typography>
                  <Typography color={"success.main"}>
                    {data.testRun[0].success}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography color={"primary"}>Failed </Typography>
                  <Typography color={"error"}>
                    {data.testRun[0].failure}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography color={"primary"}>Status </Typography>
                  <Typography color={getStatusColor(data.testRun[0].status)}>
                    {data.testRun[0].status}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {[...urlData.keys()].map((k, i) => (
            <TabPanelBox key={k} value={value} index={i}>
              <TestTab
                tests={urlData.get(k)!}
                editMode={false}
                setTestDetail={setTestDetail}
                testDetail={testDetail}
              />
            </TabPanelBox>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
