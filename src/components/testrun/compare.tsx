import React from "react"
import { TestQuery } from "../../services/queries"
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer"
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"
import { makeStyles } from "@mui/styles"
import loadable from "@loadable/component"
import { isJSON } from "../../services/services"
import { a11yProps, AntTab, AntTabs, TabPanel } from "../global/tab-panel"

const ReactJson = loadable(() => import("react-json-view"))

export interface CompareViewProps {
  test: TestQuery
  close: () => void
}

const useStyles = makeStyles(() => ({
  caption: {
    color: "#949393",
    fontSize: "0.8rem !important"
  },
  listItem: {
    margin: 3,
    wordBreak: "break-all"
  },
  normal: {
    backgroundColor: "rgb(172,242,189,0.5)"
  },
  error: {
    backgroundColor: "rgba(253,184,192,0.5)",
    margin: 8,
    textOverflow: "ellipsis",
    overflow: "scroll",
    flexGrow: 1
  }
}))

export default function CompareView(props: CompareViewProps) {
  const [value, setValue] = React.useState(0)
  const [valueRes, setResValue] = React.useState(0)
  const classes = useStyles()

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeRes = (_: React.SyntheticEvent, newValue: number) => {
    setResValue(newValue)
  }

  return (
    <Grid sx={{minHeight: '80vh'}}>
      <Grid container>
        <Grid item xs={8}>
          <AntTabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <AntTab label="Response" {...a11yProps(0)} normal={props.test.result.bodyResult.normal && (props.test.result.headersResult? props.test.result.headersResult.filter(hr => (!hr.normal)).length == 0 : true)}/>
            <AntTab label="Request" {...a11yProps(1)} />
            {props.test.deps != null && (
              <AntTab label="Dependency" {...a11yProps(2)} />
            )}
            <AntTab label="Raw Events" {...a11yProps(3)} />
          </AntTabs>
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-end"} alignItems={"center"}>
          <Close sx={{ marginRight: 2 }} onClick={() => {
            props.close()
          }} />
        </Grid>
      </Grid>
      <Grid container>
        <TabPanel value={value} index={0}>
          <AntTabs value={valueRes} onChange={handleChangeRes} aria-label="basic tabs example">
            <AntTab label="Body" {...a11yProps(0)} normal ={props.test.result.bodyResult.normal} />
            <AntTab label="Header" {...a11yProps(1)} normal={(props.test.result.headersResult? props.test.result.headersResult.filter(hr => (!hr.normal)).length == 0 : true)} />
          </AntTabs>
          <Grid container direction={"row"}>
            <TabPanel value={valueRes} index={0}>
              <Grid item container>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <Typography className={classes.caption}>Expected Response</Typography>
                </Grid>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <Typography className={classes.caption}>Actual Response</Typography>
                </Grid>
                <Grid container xs={12}>
                  <ReactDiffViewer
                    hideLineNumbers={true}
                    styles={{
                      line: {
                        wordBreak: 'break-word',
                      },
                    }}
                    compareMethod={DiffMethod.TRIMMED_LINES}
                    oldValue={isJSON(props.test.result.bodyResult.expected) == "object" ? JSON.stringify(JSON.parse(props.test.result.bodyResult.expected), null, 2) : props.test.result.bodyResult.expected}
                    newValue={isJSON(props.test.result.bodyResult.actual) == "object" ? JSON.stringify(JSON.parse(props.test.result.bodyResult.actual), null, 2) : props.test.result.bodyResult.actual}
                    splitView={true}
                    showDiffOnly={false}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </Grid>
          <Grid container direction={"row"}>
            <TabPanel value={valueRes} index={1}>
              <Grid item container>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <Typography className={classes.caption}>Expected Header</Typography>
                </Grid>
                <Grid item xs={6} sx={{ padding: 1 }}>
                  <Typography className={classes.caption}>Actual Header</Typography>
                </Grid>
                {(props.test.result.headersResult != null) && (
                  [...props.test.result.headersResult]?.map((h) => (
                    <Grid container>
                      <Grid item xs sx={{ padding: 2 }}>
                        <List dense={true}>
                          <ListItem className={h.normal ? classes.listItem : classes.normal}>
                            <Grid container>
                              <Grid item xs={4}>
                                {h.expected.key != null && h.expected.key != "" && (
                                  <ListItemText primary={h.expected.key} />
                                )}
                                {h.expected.key == null || h.expected.key == "" && (
                                  <ListItemText primary={"Empty"} />
                                )}
                              </Grid>
                              <Grid item xs={2} container justifyContent={"center"}>
                                <ListItemText primary=":" />
                              </Grid>
                              <Grid item xs={6} container direction={"column"}>
                                {h.expected.value != null && (
                                  <React.Fragment>
                                    {([...h.expected.value].map((eh) => (
                                      <Grid item>
                                        <ListItemText primary={eh} />
                                      </Grid>
                                    )))}
                                  </React.Fragment>
                                )}
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs sx={{ padding: 1 }}>
                        <List dense={true}>
                          <ListItem className={h.normal ? classes.listItem : classes.error}>
                            <Grid container>
                              <Grid item xs={4}>
                                {h.actual.key != null && h.actual.key != "" && (
                                  <ListItemText primary={h.actual.key} />
                                )}
                                {h.actual.key == null || h.actual.key == "" && (
                                  <ListItemText primary={"Empty"} />
                                )}
                              </Grid>
                              <Grid item xs={2} container justifyContent={"center"}>
                                <ListItemText primary=":" />
                              </Grid>
                              <Grid item xs={6} container direction={"column"}>
                                {h.actual.value != null && (
                                  <React.Fragment>
                                    {([...h.actual.value].map((eh) => (
                                      <Grid item>
                                        <ListItemText primary={eh} />
                                      </Grid>
                                    )))}
                                  </React.Fragment>
                                )}
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  )))}
                {(props.test.result.headersResult == null) && (
                  <Typography variant={"caption"} sx={{ margin: 2 }}>Empty</Typography>
                )}
              </Grid>
            </TabPanel>
          </Grid>
        </TabPanel>
      </Grid>
      <Grid container>
        <TabPanel value={value} index={1}>
          <AntTabs value={valueRes} onChange={handleChangeRes} aria-label="basic tabs example">
            <AntTab label="Body" {...a11yProps(0)} />
            <AntTab label="Header & Info" {...a11yProps(1)} />
          </AntTabs>
          <Grid container direction={"row"} >
            <TabPanel value={valueRes} index={0}>
              <Grid item container>
                {isJSON(props.test.req.body) != "object" && (
                  <Typography>{props.test.req.body}</Typography>
                )}
                {isJSON(props.test.req.body) == "object" && (
                  <ReactJson
                    quotesOnKeys={false}
                    validationMessage={"JSON is invalid"}
                    src={JSON.parse(props.test.req.body)} />
                )}
              </Grid>
            </TabPanel>
          </Grid>
          <Grid container direction={"row"}>
            <TabPanel value={valueRes} index={1}>
              <Grid item container direction={"column"}>
                <Grid item sx={{ padding: 3 }}>
                  <Typography color={"text.secondary"} variant={"subtitle1"}>Info</Typography>
                </Grid>
                <Grid item xs={8} container direction={"column"} sx={{ paddingLeft: 3 }}>
                  <List dense={true}>
                    <ListItem className={classes.listItem}>
                      <Grid container>
                        <Grid item xs={3}>
                          <ListItemText primary={"Protocol"} />
                        </Grid>
                        <Grid item xs={2} container justifyContent={"center"}>
                          <ListItemText primary=":" />
                        </Grid>
                        <Grid item xs={7} container direction={"column"}>
                          <Grid item>
                            <ListItemText primary={props.test.req.protoMajor + "." + props.test.req.protoMinor} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Grid container>
                        <Grid item xs={3}>
                          <ListItemText primary={"Method"} />
                        </Grid>
                        <Grid item xs={2} container justifyContent={"center"}>
                          <ListItemText primary=":" />
                        </Grid>
                        <Grid item xs={7} container direction={"column"}>
                          <Grid item>
                            <ListItemText primary={props.test.req.method} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Grid container>
                        <Grid item xs={3}>
                          <ListItemText primary={"URL"} />
                        </Grid>
                        <Grid item xs={2} container justifyContent={"center"}>
                          <ListItemText primary=":" />
                        </Grid>
                        <Grid item xs={7} container direction={"column"}>
                          <Grid item>
                            <ListItemText primary={props.test.uri} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item sx={{ padding: 3 }}>
                  <Typography color={"text.secondary"} variant={"subtitle1"}>Header</Typography>
                </Grid>
                <Grid item xs={8} sx={{ padding: 2 }}>
                  <List dense={true}>
                    {(props.test.req.header != null) && (
                      [...props.test.req.header].map((h) => (
                        <ListItem className={classes.listItem}>
                          <Grid container>
                            <Grid item xs={3}>
                              <ListItemText primary={h.key} />
                            </Grid>
                            <Grid item xs={2} container justifyContent={"center"}>
                              <ListItemText primary=":" />
                            </Grid>
                            <Grid item xs={7} container direction={"column"}>
                              {([...h.value].map((eh) => (
                                <Grid item>
                                  <ListItemText primary={eh} />
                                </Grid>
                              )))}
                            </Grid>
                          </Grid>
                        </ListItem>
                      )))}
                    {(props.test.req.header == null) && (
                      <Typography variant={"caption"} sx={{ margin: 2 }}>Empty</Typography>
                    )}
                  </List>
                </Grid>
              </Grid>
            </TabPanel>
          </Grid>
        </TabPanel>
      </Grid>
      {props.test.deps != null && (
        <Grid container>
          <TabPanel value={value} index={2}>
            { props.test.deps.map(d => (
              <React.Fragment>
                <Typography sx={{ mt: 4, mb: 2, ml : 2 }} variant="h6" component="div">
                  {d.name} <Typography variant={"caption"}> [ {d.type}  ] </Typography>
                </Typography>
                <List dense={true}>
                  {d.meta.filter(dep => (dep.key != "name" && dep.key != "type")).map(m => (
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          <ListItemText primary={m.key} />
                        </Grid>
                        <Grid item xs={2} container justifyContent={"center"}>
                          <ListItemText primary=":" />
                        </Grid>
                        <Grid item xs={7} container direction={"column"}>
                          <Grid item>
                            <ListItemText primary={m.value} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
            ))}
          </TabPanel>
        </Grid>
      )}
      <Grid container>
        <TabPanel value={value} index={3}>
          <ReactJson
            quotesOnKeys={false}
            validationMessage={"JSON is invalid"}
            src={JSON.parse(JSON.stringify(props.test))} />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
