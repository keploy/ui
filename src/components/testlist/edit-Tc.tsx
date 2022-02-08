import React from "react"
import {
  AlertProps,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from "@mui/material"
import { Close, Save } from "@mui/icons-material"
import { InteractionProps } from "react-json-view"
import { makeStyles } from "@mui/styles"
import DeleteIcon from "@material-ui/icons/Delete"
import { navigate } from "gatsby"
import { useMutation } from "@apollo/client"
import { EDIT_TESTCASE, TestCase } from "../../services/queries"
import Empty from "../global/empty"
import { a11yProps, AntTab, AntTabs, TabPanel } from "../global/tab-panel"
import { deepCopyTc, isJSON } from "../../services/services"
import { ReactJson } from "../global/json"
import CustomAlert from "../global/alert"
// @ts-ignore
import EmptyImg from "../../../static/empty2.png"

export interface EditTcProps {
  close?: () => void
  tc: TestCase
}

const useStyles = makeStyles(() => ({
  caption: {
    color: "#949393",
    fontSize: "0.8rem !important"
  },
  listItem: {
    margin: 8,
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

export default function EditTc(props: EditTcProps) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [valueRes, setResValue] = React.useState(0)
  const [newTc, setNewTc] = React.useState<TestCase>(props.tc)
  const [alert, setAlert] = React.useState<AlertProps["severity"]>(undefined)

  if (props.tc == null) {
    return <Empty message={"Uh! Oh! Something went wrong. Please file an issue on keploy/keploy repo on Github!"} doc={"https://docs.keploy.io"} image={EmptyImg}/>
  }

  const [updateTc] = useMutation<{ updateTestCase: boolean }, { tc: TestCase[] }>(EDIT_TESTCASE, {
    variables: { tc: [newTc] }
  })

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
          </AntTabs>
        </Grid>
        <Grid item xs={6} container justifyContent={"flex-end"} alignItems={"center"}>

          <Tooltip title={"Save Test Case"}>
            <Save
              onClick={() =>  {
                updateTc().then((d) => {
                  if (d.data != null) {
                    if (d.data.updateTestCase) {
                      setAlert("success")
                      props.close? props.close() : navigate("/testlist")
                    } else {
                      setAlert("error")
                    }
                  } else {
                    setAlert("error")
                  }
                  return
                }).catch((err) => {
                  console.log(err)
                  setAlert("error")
                })
              }}
              sx={{
                color: "warning.main",
                ":hover": {
                  color: "success.main"
                }
              }}
            />
          </Tooltip>

          <Tooltip title={"Cancel"}>
            <Close sx={{ margin: 2 }} onClick={() => {
              props.close? props.close() : navigate("/testlist")
            }} />
          </Tooltip>
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
              { newTc.httpResp != null && newTc.httpResp.body != null && (
                <Grid item container sx={{marginBottom: 10}}>
                  {isJSON(newTc.httpResp.body) != "object" && (
                    <TextField
                      multiline
                      rows={4}
                      fullWidth={true}
                      sx={{margin : 2}}
                      value={newTc.httpResp!.body}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                        let tmp = deepCopyTc(newTc)
                        tmp.httpResp!.body = event.target.value
                        setNewTc(tmp)
                      }} id="standard-basic" label="Enter Plain Text Body"/>
                  )}
                  {isJSON(newTc.httpResp.body) == "object" && (
                    <ReactJson
                      quotesOnKeys={false}
                      validationMessage={"JSON is invalid"}
                      src={JSON.parse(newTc.httpResp!.body!)}
                      onEdit={(edit: InteractionProps) => {
                        let tmp = deepCopyTc(newTc)
                        tmp.httpResp!.body = JSON.stringify(edit.updated_src)
                        setNewTc(tmp)
                      }}
                      onAdd={(edit: InteractionProps) => {
                        let tmp = deepCopyTc(newTc)
                        tmp.httpResp!.body = JSON.stringify(edit.updated_src)
                        setNewTc(tmp)
                      }}
                      onDelete={(edit: InteractionProps) => {
                        let tmp = deepCopyTc(newTc)
                        tmp.httpResp!.body = JSON.stringify(edit.updated_src)
                        setNewTc(tmp)
                      }}
                    />
                  )}
                </Grid>
              )}
              { newTc.httpResp?.body == null && (
                <TextField
                  sx={{margin : 2}}
                  multiline
                  rows={4}
                  fullWidth={true}
                  value={newTc.httpResp?.body}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                    let tmp = deepCopyTc(newTc)
                    tmp.httpResp!.body = event.target.value
                    setNewTc(tmp)
                  }} id="standard-basic" label="Enter Plain Text Body" />
              )}
            </TabPanel>
          </Grid>
          <Grid container direction={"row"}>
            <TabPanel value={valueRes} index={1}>
              <Grid item container  sx={{marginBottom: 10}}>
                {newTc.httpResp != null && newTc.httpResp?.header != null && [...newTc.httpResp.header].map((h, index) => (
                  <Grid container>
                    <Grid item xs sx={{ padding: 1 }}>
                      <List dense={true}>
                        <ListItem className={classes.listItem}>
                          <Grid container alignItems={"center"}>
                            <Grid item xs={4}>
                              <ListItemText primary={h.key} />
                            </Grid>
                            <Grid item xs={2} container justifyContent={"center"}>
                              <ListItemText primary=":" />
                            </Grid>
                            <Grid item xs={6} container direction={"column"} >
                              {([...h.value].map((eh, i) => (
                                <Grid item>
                                  <TextField
                                    sx={{ width : '80%'}}
                                    multiline
                                    rows={2}
                                    value={eh}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                                      let tmp = deepCopyTc(newTc)
                                      tmp.httpResp.header[index].value[i] =  event.target.value
                                      setNewTc(tmp)
                                    }} id="standard-basic" label="Enter Header Value" />
                                  <IconButton  sx={{
                                    color: "error.main",
                                    ":hover": {
                                      color: "primary.main"
                                    }
                                  }} aria-label="delete" size="small"
                                               onClick={()=> {
                                                 let tmp = deepCopyTc(newTc)
                                                 if (tmp.httpResp.header[index].value.length  < 2) {
                                                   tmp.httpResp.header.splice(index, 1)
                                                 } else {
                                                   tmp.httpResp.header[index].value.splice(i, 1)
                                                 }
                                                 setNewTc(tmp)
                                               }}><DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              )))}
                            </Grid>
                          </Grid>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                ))}
                {newTc.httpResp?.header == null && (
                  <List dense={true}>
                    <ListItem className={classes.listItem}>
                      <ListItemText primary={"Empty"} secondary={"Headers can't be added " +
                      "in Edit mode. Please re-record the API call to add headers."} />
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
              { newTc.httpReq != null && newTc.httpReq?.body != null && (
                <Grid item container  sx={{marginBottom: 10}}>
                  {isJSON(newTc.httpReq.body) != "object" && (
                    <TextField
                      sx={{margin : 2}}
                      multiline
                      rows={4}
                      fullWidth={true}
                      value={newTc.httpReq!.body}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                        let tmp = deepCopyTc(newTc)
                        tmp.httpReq!.body = event.target.value
                        setNewTc(tmp)
                      }} id="standard-basic" label="Enter Plain Text Body" />
                  )}
                  {isJSON(newTc.httpReq.body) == "object" && (
                    <ReactJson
                      quotesOnKeys={false}
                      validationMessage={"JSON is invalid"}
                      src={JSON.parse(newTc.httpReq!.body!)}
                      onEdit={(edit: InteractionProps) => {
                        let tmp = deepCopyTc(newTc)
                        tmp.httpReq!.body = JSON.stringify(edit.updated_src)
                        setNewTc(tmp)
                      }}
                      onAdd={(edit: InteractionProps) => {
                        let tmp = deepCopyTc(newTc)
                        tmp.httpReq!.body = JSON.stringify(edit.updated_src)
                        setNewTc(tmp)
                      }}
                      onDelete={(edit: InteractionProps) => {
                        let tmp = deepCopyTc(newTc)
                        tmp.httpReq!.body = JSON.stringify(edit.updated_src)
                        setNewTc(tmp)
                      }}
                    />
                  )}
                </Grid>
              )}
            </TabPanel>
          </Grid>
          <Grid container direction={"row"}>
            <TabPanel value={valueRes} index={1}>
              { newTc.httpReq != null && (
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
                              <ListItemText primary={newTc.httpReq.protoMajor + "." + newTc.httpReq.protoMinor} />
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
                              <ListItemText primary={newTc.httpReq.method} />
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
                              <ListItemText primary={newTc.uri} />
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
                      {newTc.httpReq.header != null && [...newTc.httpReq.header].map((h, index) => (
                        <ListItem className={classes.listItem}>
                          <Grid container>
                            <Grid item xs={3}>
                              <ListItemText primary={h.key} />
                            </Grid>
                            <Grid item xs={2} container justifyContent={"center"}>
                              <ListItemText primary=":" />
                            </Grid>
                            <Grid item xs={7} container direction={"column"}>
                              {([...h.value].map((eh, i) => (
                                <Grid item>
                                  <TextField
                                    sx={{ width : '80%'}}
                                    multiline
                                    rows={2}
                                    value={eh}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                                      let tmp = deepCopyTc(newTc)
                                      tmp.httpReq.header[index].value[i] =  event.target.value
                                      setNewTc(tmp)
                                    }} id="standard-basic" label="Enter Header Value" />
                                  <IconButton  sx={{
                                    color: "error.main",
                                    ":hover": {
                                      color: "primary.main"
                                    }
                                  }} aria-label="delete" size="small"
                                               onClick={()=> {
                                                 let tmp = deepCopyTc(newTc)
                                                 if (tmp.httpReq.header[index].value.length  < 2) {
                                                   tmp.httpReq.header.splice(index, 1)
                                                 } else {
                                                   tmp.httpReq.header[index].value.splice(i, 1)
                                                 }
                                                 setNewTc(tmp)
                                               }}><DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              )))}
                            </Grid>
                          </Grid>
                        </ListItem>
                      ))}
                      {newTc.httpReq.header == null && (
                        <List dense={true}>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={"Empty"} secondary={"Headers can't be added " +
                            "in Edit mode. Please re-record the API call to add headers."} />
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
      {alert != undefined && (
        <CustomAlert msg={alert=="success"? "Test Case Updated!" : "Failed to Update!"} open={true} severity={alert}/>
      )}
    </Grid>
  )
}
