import { Grid, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material"
import React from "react"
import { Close, Edit } from "@mui/icons-material"
import { makeStyles } from "@mui/styles"
import { InteractionProps } from "react-json-view"
import { GET_TC, TestcaseData } from "../../services/queries"
import { isJSON } from "../../services/services"
import { a11yProps, AntTab, AntTabs, TabPanel } from "../global/tab-panel"
import { ReactJson } from "../global/json"
import { useQuery } from "@apollo/client"
import Loading from "../global/backdrop"
import ErrorView from "../global/error"
import Empty from "../global/empty"
import { navigate } from "gatsby"
import EditTc from "./edit-Tc"
// @ts-ignore
import { EmptyImg } from "../../../static/empty.png"

export interface TcsDetailProps {
  close?: () => void
  tc: string | null
}

const useStyles = makeStyles(() => ({
  listItem: {
    margin: 8,
    wordBreak: "break-all"
  },
}))


export default function TcsDetail(props: TcsDetailProps) {
  const classes = useStyles()
  const [editTest, setEditTest] = React.useState(props.close == undefined)
  const [value, setValue] = React.useState(0)
  const [valueRes, setResValue] = React.useState(0)
  const { loading, error, data: tc } = useQuery<TestcaseData>(GET_TC, {
    variables: { id: props.tc }
  })

  if (loading) return <Loading />
  if (error) return <ErrorView msg={error.message} />
  if (tc == null || tc.testCase == null || tc.testCase.length == null) {
    return <Empty message={"Uh! Oh! This test case doesn't exist anymore."} doc={"https://docs.keploy.io"} image={EmptyImg}/>
  }

  const data = tc.testCase[0]

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeRes = (_: React.SyntheticEvent, newValue: number) => {
    setResValue(newValue)
  }

  return (
    <Grid sx={{minHeight: '80vh'}} >
      {!editTest && (
        <React.Fragment>
          <Grid container>
            <Grid item xs={6}>
              <AntTabs value={value} onChange={handleChange} aria-label="basic tabs">
                <AntTab label="Response" {...a11yProps(0)} />
                <AntTab label="Request" {...a11yProps(1)} />
                <AntTab label="Dependency" {...a11yProps(2)} />
                <AntTab label="Raw Events" {...a11yProps(3)} />
              </AntTabs>
            </Grid>
            <Grid item xs={6} container justifyContent={"flex-end"} alignItems={"center"}>
              <Tooltip title={"Edit Test Case"}>
                <Edit sx={{
                  marginRight: 2,
                  color: "#d2d2d2",
                  ':hover': {
                    color: 'warning.main',
                  },
                }}
                      onClick={()=> {
                        setEditTest(true)
                        setValue(0)
                      }}
                />
              </Tooltip>
              <Close sx={{ margin: 2 }} onClick={() => {
                props.close? props.close() : navigate("/testlist")
              }} />
            </Grid>
          </Grid>
          <Grid container>
            <TabPanel value={value} index={0}>
              <AntTabs value={valueRes} onChange={handleChangeRes} aria-label="basic tabs example">
                <AntTab label="Body" {...a11yProps(0)} />
                <AntTab label="Header" {...a11yProps(1)} />
              </AntTabs>
              <Grid container direction={"row"}>
                <TabPanel value={valueRes} index={0}>
                  { data.httpResp?.body != null && (
                    <Grid item container sx={{marginBottom: 10}}>
                      {isJSON(data.httpResp.body) != "object" && (
                        <Typography sx={{margin: 2}}>{data.httpResp.body}</Typography>
                      )}
                      {isJSON(data.httpResp.body) == "object" && (
                        <ReactJson
                          quotesOnKeys={false}
                          validationMessage={"JSON is invalid"}
                          onEdit={(edit: InteractionProps) => {
                            console.log(edit)
                          }}
                          onAdd={(edit: InteractionProps) => {
                            console.log(edit)
                          }}
                          onDelete={(edit: InteractionProps) => {
                            console.log(edit)
                          }}
                          src={JSON.parse(data.httpResp.body)}
                        />
                      )}
                    </Grid>
                  )}
                  { data.httpResp?.body == null && (
                    <List dense={true}>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={"Empty"} />
                      </ListItem>
                    </List>
                  )}
                </TabPanel>
              </Grid>
              <Grid container direction={"row"}>
                <TabPanel value={valueRes} index={1}>
                  <Grid item container  sx={{marginBottom: 10}}>
                    {data.httpResp?.header != null && [...data.httpResp.header].map((h) => (
                      <Grid container>
                        <Grid item xs sx={{ padding: 1 }}>
                          <List dense={true}>
                            <ListItem className={classes.listItem}>
                              <Grid container>
                                <Grid item xs={4}>
                                  <ListItemText primary={h.key} />
                                </Grid>
                                <Grid item xs={2} container justifyContent={"center"}>
                                  <ListItemText primary=":" />
                                </Grid>
                                <Grid item xs={6} container direction={"column"}>
                                  {([...h.value].map((eh) => (
                                    <Grid item>
                                      <ListItemText primary={eh} />
                                    </Grid>
                                  )))}
                                </Grid>
                              </Grid>
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    ))}
                    {data.httpResp?.header == null && (
                      <List dense={true}>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={"Empty"} />
                        </ListItem>
                      </List>
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
              <Grid container direction={"row"}>
                <TabPanel value={valueRes} index={0}>
                  { data.httpReq?.body != null && (
                    <Grid item container  sx={{marginBottom: 10}}>
                      {isJSON(data.httpReq.body) != "object" && (
                        <Typography sx={{margin: 2}}>{data.httpReq.body}</Typography>
                      )}
                      {isJSON(data.httpReq.body) == "object" && (
                        <ReactJson
                          quotesOnKeys={false}
                          validationMessage={"JSON is invalid"}
                          src={JSON.parse(data.httpReq.body)} />
                      )}
                    </Grid>
                  )}
                </TabPanel>
              </Grid>
              <Grid container direction={"row"}>
                <TabPanel value={valueRes} index={1}>
                  { data.httpReq != null && (
                    <Grid item container direction={"column"}  sx={{marginBottom: 10}}>
                      <Grid item sx={{ padding: 3 }}>
                        <Typography color={"text.secondary"} variant={"subtitle1"}>Info</Typography>
                      </Grid>
                      <Grid item xs={8} container direction={"column"} sx={{ padding: 3 }}>
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
                                  <ListItemText primary={data.httpReq.protoMajor + "." + data.httpReq.protoMinor} />
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
                                  <ListItemText primary={data.httpReq.method} />
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
                                  <ListItemText primary={data.uri} />
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
                          {data.httpReq.header != null && [...data.httpReq.header].map((h) => (
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
                          ))}
                          {data.httpReq.header == null && (
                            <List dense={true}>
                              <ListItem className={classes.listItem}>
                                <ListItemText primary={"Empty"} />
                              </ListItem>
                            </List>
                          )}
                        </List>
                      </Grid>
                    </Grid>
                  )}
                </TabPanel>
              </Grid>
            </TabPanel>
          </Grid>
          <Grid container>
            <TabPanel value={value} index={3}>
              <ReactJson
                quotesOnKeys={false}
                validationMessage={"JSON is invalid"}
                src={JSON.parse(JSON.stringify(data))} />
            </TabPanel>
          </Grid>
          <Grid container sx={{mb: 10}}>
            <TabPanel value={value} index={2}>
              { data.deps != null && data.deps.map(d => (
                <React.Fragment>
                  <Typography sx={{ mt: 4, mb: 2, ml : 2 }} variant="h6" component="div">
                    {d.name} <Typography variant={"caption"}> [ {d.type}  ] </Typography>
                  </Typography>
                  <List dense={true}>
                    {d.meta?.filter(dep => (dep.key != "name" && dep.key != "type")).map(m => (
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
              {data.deps == null && (
                <List dense={true}>
                  <ListItem className={classes.listItem}>
                    <ListItemText primary={"Empty"} />
                  </ListItem>
                </List>
              )}
            </TabPanel>
          </Grid>
        </React.Fragment>
      )}
      {editTest && (
        <EditTc tc={data} close={()=> setEditTest(false)}/>
      )}
    </Grid>
  )
}
