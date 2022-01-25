import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import React from "react"
import { Close } from "@mui/icons-material"
import { makeStyles } from "@mui/styles"
import { InteractionProps } from "react-json-view"
import { TestCase } from "../../services/queries"
import loadable from "@loadable/component"
import { isJSON } from "../../services/services"
import { a11yProps, AntTab, AntTabs, TabPanel } from "../global/tab-panel"

export interface TcsDetailProps {
  close: () => void
  tc: TestCase
}

const ReactJson = loadable(() => import("react-json-view"))

const useStyles = makeStyles(() => ({
  listItem: {
    margin: 8,
    wordBreak: "break-all"
  },
}))


export default function TcsDetail(props: TcsDetailProps) {
  const classes = useStyles()
  const [editTest, setEditTest] = React.useState(false)
  const [value, setValue] = React.useState(0)
  const [valueRes, setResValue] = React.useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeRes = (_: React.SyntheticEvent, newValue: number) => {
    setResValue(newValue)
  }

  return (
    <Grid sx={{minHeight: '80vh'}} >
      <Grid container>
        <Grid item xs={6}>
          <AntTabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <AntTab label="Response" {...a11yProps(0)} />
            <AntTab label="Request" {...a11yProps(1)} />
            {props.tc.deps != null && (
              <AntTab label="Dependency" {...a11yProps(2)} />
            )}
            <AntTab label="Raw Events" {...a11yProps(3)} />
          </AntTabs>
        </Grid>
        <Grid item xs={6} container justifyContent={"flex-end"} alignItems={"center"}>
          <Close sx={{ margin: 2 }} onClick={() => {
            setEditTest(false)
            props.close()
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
              <Grid item container sx={{marginBottom: 10}}>
                {isJSON(props.tc.httpResp.body) != "object" && (
                  <Typography sx={{margin: 2}}>{props.tc.httpResp.body}</Typography>
                )}
                {isJSON(props.tc.httpResp.body) == "object" && (
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
                    src={JSON.parse(props.tc.httpResp.body)}
                  />
                )}
              </Grid>
            </TabPanel>
          </Grid>
          <Grid container direction={"row"}>
            <TabPanel value={valueRes} index={1}>
              <Grid item container  sx={{marginBottom: 10}}>
                {props.tc.httpResp.header != null && [...props.tc.httpResp.header].map((h) => (
                  <Grid container>
                    {!editTest && (
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
                    )}
                  </Grid>
                ))}
                {props.tc.httpResp.header == null && (
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
              <Grid item container  sx={{marginBottom: 10}}>
                {isJSON(props.tc.httpReq.body) != "object" && (
                  <Typography sx={{margin: 2}}>{props.tc.httpReq.body}</Typography>
                )}
                {isJSON(props.tc.httpReq.body) == "object" && (
                  <ReactJson
                    quotesOnKeys={false}
                    validationMessage={"JSON is invalid"}
                    src={JSON.parse(props.tc.httpReq.body)} />
                )}
              </Grid>
            </TabPanel>
          </Grid>
          <Grid container direction={"row"}>
            <TabPanel value={valueRes} index={1}>
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
                            <ListItemText primary={props.tc.httpReq.protoMajor + "." + props.tc.httpReq.protoMinor} />
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
                            <ListItemText primary={props.tc.httpReq.method} />
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
                            <ListItemText primary={props.tc.uri} />
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
                    {props.tc.httpReq.header != null && [...props.tc.httpReq.header].map((h) => (
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
                    {props.tc.httpReq.header == null && (
                      <List dense={true}>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={"Empty"} />
                        </ListItem>
                      </List>
                    )}
                  </List>
                </Grid>
              </Grid>
            </TabPanel>
          </Grid>
        </TabPanel>
      </Grid>
      <Grid container>
        <TabPanel value={value} index={3}>
          <ReactJson
            quotesOnKeys={false}
            validationMessage={"JSON is invalid"}
            src={JSON.parse(JSON.stringify(props.tc))} />
        </TabPanel>
      </Grid>
      {props.tc.deps != null && (
        <Grid container  sx={{mb: 10}}>
          <TabPanel value={value} index={2}>
            { props.tc.deps.map(d => (
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
    </Grid>
  )
}
