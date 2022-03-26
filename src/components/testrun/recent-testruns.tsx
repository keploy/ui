import React from "react"
import {GET_RECENT_TEST_RUNS, RecentTestRunsData} from "../../services/queries"
import { POLLING_INTERVAL } from "../../constants"
import SEO from "../global/seo"
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material"
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef
} from '@mui/x-data-grid';
import { navigate } from "gatsby"
import { convertTime } from "../../services/services"
import { bgImg } from "../../services/services"
import ProgressBar from 'react-bootstrap/ProgressBar'
import { makeStyles } from "@mui/styles"

// @ts-ignore
import EmptyImg from "../../../static/empty.png"
import Empty from "../global/empty"
import Loading from "../global/backdrop"
import ErrorView from "../global/error"
import { useQuery} from "@apollo/client"
import {CustomToolbar} from "./test-tab";
import 'bootstrap/dist/css/bootstrap.min.css';


export interface TestRunRow {
  id:string,
  app:string,
  startedAt:string,
  totalTests:number,
  successfulTests:number,
  failedTests:number
  getDetailPanelContent?:unknown
}

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
  const [pageSize, setPageSize] = React.useState<number>(5)

  const { loading, error, data, } = useQuery<RecentTestRunsData>(GET_RECENT_TEST_RUNS, {
        pollInterval: POLLING_INTERVAL,
      }
  );

  console.log(data)
  if (loading) return (<Loading />)
  if (error) return <ErrorView msg={error.message} />
  if (data == undefined || data?.testRun == undefined || data?.testRun.length == 0) {
    return (<Empty doc={"https://github.com/keploy/keploy"} message={"Please perform some Test Runs! "} image={EmptyImg}/>)
  }

  const columns:GridColDef[] = [
    { field: "id", headerName: "App ID", minWidth:350,flex:1,headerClassName: 'super-app-theme--header',align: "center",headerAlign:"center"
    },
    { field: "app", headerName: "App Name", minWidth:200,flex:1,headerClassName: 'super-app-theme--header',align: "center",headerAlign:"center"
    },
    {
      field: "startedAt",
      headerName: "Started At",
      minWidth:150,
      flex:1,
      headerClassName: 'super-app-theme--header',
      align: "center",
      headerAlign:"center"
    },
    {
      field: "totalTests",
      headerName: "Total Tests",
      type: "number",
      minWidth: 160,
      flex:1,
      headerClassName: 'super-app-theme--header',
      align: "center",
      headerAlign:"center"
    },
    {
      field: "successfulTests",
      headerName: "Successful Tests",
      type: "number",
      minWidth: 160,
      flex:1,
      headerClassName: 'super-app-theme--header',
      align: "center",
      headerAlign:"center"
    },
    {
      field: "failedTests",
      headerName: "Failed Tests",
      minWidth: 160,
      flex:1,
      headerClassName: 'super-app-theme--header',
      align: "center",
      headerAlign:"center"
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 160,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      align: "center",
      headerAlign: "center",
      renderCell:(cellValues)=>{
        return(
            <HtmlTooltip title={<>
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
                      : {cellValues.row.successfulTests}
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
                      : {cellValues.row.failedTests}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container direction={"row"} style={{ marginBottom: 10}}
                      justifyContent={"center"}>
                  <Grid item xs={6}>
                    <Typography variant={"subtitle2"} className={classes.value}>
                      Total Tests
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant={"subtitle2"} className={classes.value}>
                      : {cellValues.row.totalTests}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </>}>
            <ProgressBar style={{ height: 8,width:100 }}>
              <ProgressBar now={(cellValues.row.successfulTests * 100) / cellValues.row.totalTests} visuallyHidden={true}
                           style={{ height: 8, backgroundColor: "rgba(46,125,50,0.8)" }}
                           label={cellValues.row.successfulTests  + ` Successful`}
                           key={1} />
              <ProgressBar now={(cellValues.row.failedTests  * 100) / cellValues.row.totalTests} visuallyHidden={true}
                           style={{ height: 8, backgroundColor: "rgba(211,47,47,0.8)" }}
                           label={cellValues.row.failedTests  + ` Failed`}
                           key={2} />
              {cellValues.row.status == "RUNNING" && (
                  <ProgressBar visuallyHidden={true}
                               now={((cellValues.row.totalTests- cellValues.row.successfulTests - cellValues.row.failedTests) * 100) / cellValues.row.totalTests}
                               style={{ height: 8, backgroundColor: "#fff59d", color: "#000" }}
                               animated striped label={`In Progress`} key={3} />
              )}
            </ProgressBar>
        </HtmlTooltip>
        )
      }
    }
  ];

  const random = [...data.testRun].sort((x, y) => (x.updated < y.updated) ? 1 : -1);
  let rows:TestRunRow[]=[];
  random.map(value => {
    rows.push({id:value.id, app:value.app,startedAt:convertTime(value.updated),totalTests:value.total ,successfulTests:value.success,failedTests:value.failure,})
  });

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
              <Box sx={{width: "100%",marginTop:5,marginLeft:"auto",marginRight:"auto",backgroundColor: "white",
                "& .super-app-theme--header": {
                  backgroundColor: "#1976D2",
                  color: "#ffffff"
                }
              }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight={true}
                    rowHeight={60}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 100]}
                    onRowClick={(params)=>{
                      navigate(`detail/?id=${params.row.id}`)
                    }}
                    components={{ Toolbar: CustomToolbar
                    }}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  )
}

