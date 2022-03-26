import React from "react"
import { GET_RECENT_TEST_RUNS, RecentTestRunsData } from "../../services/queries"
import { POLLING_INTERVAL } from "../../constants"
import SEO from "../global/seo"
import { makeStyles } from "@mui/styles"
import {
  AppBar,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  styled,
  Toolbar,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from "@mui/material"
import { navigate } from "gatsby"
import { bgImg, convertTime } from "../../services/services"
import { ProgressBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
// @ts-ignore
import EmptyImg from "../../../static/empty.png"
import Empty from "../global/empty"
import Loading from "../global/backdrop"
import ErrorView from "../global/error"
import { useQuery } from "@apollo/client"

const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
    marginTop: 20,
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
      transform: "translate3d(0px, -1px, 0px)",
    },
    borderRadius: 10
  },
  key: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    color: "rgb(50,50,50)"
  },
  value: {
    color: "rgba(25,118,210)",
    textOverflow: "ellipsis",
    overflow: "hidden",
    flexGrow: 1
  },
  success: {
    color: "success"
  },
  failed: {
    color: "error"
  }
}))

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />))(({}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "rgba(146,146,146,0.87)",
    minWidth: 250,
    marginBottom: 5,
    border: "1px solid #dadde9"
  }
}))

export default function RecentTestRuns() {
  const classes = useStyles()
  const { loading, error, data } = useQuery<RecentTestRunsData>(GET_RECENT_TEST_RUNS, {
    pollInterval: POLLING_INTERVAL,
  })
  if (loading) return (<Loading />)
  if (error) return <ErrorView msg={error.message} />
  if (data == undefined || data?.testRun == undefined || data?.testRun.length == 0) {
    return (<Empty doc={"https://github.com/keploy/keploy"} message={"Please perform some Test Runs! "} image={EmptyImg}/>)
  }
  return (
    <React.Fragment>
      <SEO title="Recent Test Runs" />
      <Grid container sx={{mb : 50}}>
        {data?.testRun.length > 0 && (
          <Grid item container direction={"column"}>
            <AppBar position="relative" sx={{mb: 1 }} style={bgImg}>
              <Toolbar sx={{height: '10vh', alignContent: "center"}}>
                <Typography variant="h4" color="inherit" component="div">
                  Recent Test Runs
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid item container spacing={4} sx={{pl: 5, pr: 5}}>
              {[...data.testRun].sort((x, y) => (x.updated < y.updated) ? 1 : -1).map(k => (
                <Grid item xs={3} container>
                  <Card key={"card-" + k.id} className={classes.card}>
                    <CardContent onClick={() => {
                      navigate("/testruns/detail/?id=" + k.id)
                    }} style={{ minHeight: 100 }}>
                      <Grid item container direction={"row"} style={{ marginBottom: 10 }} justifyContent={"center"}>
                        <Grid item xs={6}>
                          <Typography variant={"subtitle2"} className={classes.key}>
                            App
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant={"subtitle2"} className={classes.value}>
                            : {k.app}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item container direction={"row"} style={{ marginBottom: 10 }} justifyContent={"center"}>
                        <Grid item xs={6}>
                          <Typography variant={"subtitle2"} className={classes.key}>
                            Started at
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant={"subtitle2"} className={classes.value}>
                            : {convertTime(k.created)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item container direction={"row"} style={{ marginBottom: 10 }} justifyContent={"center"}>
                        <Grid item xs={6}>
                          <Typography variant={"subtitle2"} className={classes.key}>
                            Run by
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant={"subtitle2"} className={classes.value}>
                            : {k.user}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions style={{ marginBottom: 0 }}>
                      <Grid container direction={"row"} style={{ alignItems: "center" }}>
                        <Grid container style={{ justifyContent: "flex-start" }}>
                          <Box sx={{ width: "100%" }}>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography>Summary</Typography>
                                  <Grid container direction={"column"}>
                                    <Grid item container direction={"row"} style={{ marginBottom: 10 }}
                                          justifyContent={"center"}>
                                      <Grid item xs={6}>
                                        <Typography variant={"subtitle2"} color={"success.main"}>
                                          Successful Tests
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography variant={"subtitle2"} color={"success.main"}>
                                          : {k.success}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid item container direction={"row"} style={{ marginBottom: 10 }}
                                          justifyContent={"center"}>
                                      <Grid item xs={6}>
                                        <Typography variant={"subtitle2"} color={"error.main"}>
                                          Failed Tests
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography variant={"subtitle2"} color={"error.main"}>
                                          : {k.failure}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid item container direction={"row"} style={{ marginBottom: 10 }}
                                          justifyContent={"center"}>
                                      <Grid item xs={6}>
                                        <Typography variant={"subtitle2"} className={classes.value}>
                                          Total Tests
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography variant={"subtitle2"} className={classes.value}>
                                          : {k.total}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </React.Fragment>
                              }
                            >
                              <ProgressBar style={{ height: 8 }}>
                                <ProgressBar now={(k.success * 100) / k.total} visuallyHidden={true}
                                             style={{ height: 8, backgroundColor: "rgba(46,125,50,0.8)" }}
                                             label={k.success + ` Successful`} key={1} />
                                <ProgressBar now={(k.failure * 100) / k.total} visuallyHidden={true}
                                             style={{ height: 8, backgroundColor: "rgba(211,47,47,0.8)" }}
                                             label={k.failure + ` Failed`} key={2} />
                                {k.status.valueOf() == "RUNNING" && (
                                  <ProgressBar visuallyHidden={true}
                                               now={((k.total - k.success - k.failure) * 100) / k.total}
                                               style={{ height: 8, backgroundColor: "#fff59d", color: "#000" }}
                                               animated striped label={`In Progress`} key={3} />
                                )}
                              </ProgressBar>
                            </HtmlTooltip>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  )
}
