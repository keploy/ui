import React from "react"
import { AppsData, GET_APPS } from "../../services/queries"
import { AppBar, Grid, Tabs, Toolbar, Typography } from "@mui/material"
import SEO from "../global/seo"
import { makeStyles } from "@mui/styles"
import TestCasesTab from "./tcs-tab"
import { bgImg } from "../../services/services"
// @ts-ignore
import EmptyImg from "../../../static/empty3.png"
import Empty from "../global/empty"
import { useQuery } from "@apollo/client"
import Loading from "../global/backdrop"
import ErrorView from "../global/error"
import { a11yProps, CustomTab, TabPanelBox } from "../global/tab-panel"
import { Link,navigate } from "gatsby";
import { NumberParam, useQueryParam } from "use-query-params"

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  tabs: {
    minWidth: "100%",
    borderRight: `1px solid #00000`,
    marginTop: 10
  },
  url: {
    margin: 2,
    wordBreak: "break-all"
  }
}))

export default function TestList() {
  const classes = useStyles()
  const [index=0]=useQueryParam("index",NumberParam)
  const [value, setValue] = React.useState<number>(index)
  const [tc, setTc] = React.useState("")
  const { loading, error, data, refetch } = useQuery<AppsData>(GET_APPS)


  if (loading) return (<Loading />)
  if (error) return <ErrorView msg={error.message} />
  if (data == undefined || data?.apps == undefined || data?.apps.length == 0) {
    return (<Empty doc={"https://github.com/keploy/keploy"} message={"Please add some apps by integrating SDK and running application in Capture mode! "} image={EmptyImg} />)
  }

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <SEO title="Test Cases List" />
      <AppBar position="relative" sx={{ mb: 1 }} style={bgImg}>
        <Toolbar sx={{ height: '10vh', alignContent: "center" }}>
          <Typography variant="h4" color="inherit" component="div">
            Test Cases
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={2}>
          <Grid item className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs endpoints"
              className={classes.tabs}>
              {[...data.apps].map((e, i) => (
                <CustomTab key={e.id}onClick={()=>{setTc("");navigate(`?index=${i}`)}} label={<React.Fragment>
                  <Link to={`${e.id}`}>
                    <Grid container >
                      <Typography className={classes.url}>{e.id}</Typography>
                    </Grid>
                  </Link>
                </React.Fragment>} {...a11yProps(i)} />
              ))}
            </Tabs>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          {[...data.apps].map((k, i) => (
            <TabPanelBox key={k.id} value={value > data?.apps.length - 1 ? 0 : value} index={i}>
              <TestCasesTab app={k.id} refetch={refetch} tc={tc} setTc={setTc}/>
            </TabPanelBox>
          ))}
        </Grid>
      </Grid>
    </React.Fragment >
  )
}
