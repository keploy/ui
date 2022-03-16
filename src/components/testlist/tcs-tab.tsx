import React from "react"
import { AppTCsMeta, DELETE_TC, GET_APP_TC_META, Method } from "../../services/queries"
import { getTcRows } from "../../services/services"
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams, MuiEvent } from "@mui/x-data-grid"
import { Box, IconButton } from "@mui/material"
import { CustomToolbar } from "../testrun/test-tab"
import TcsDetail from "./tcs-detail"
import { useMutation, useQuery } from "@apollo/client"
import { Delete } from "@mui/icons-material"
import Empty from "../global/empty"
// @ts-ignore
import EmptyImg from "../../../static/empty2.png"
import Loading from "../global/backdrop"
import ErrorView from "../global/error"
import {navigate} from "gatsby";

export interface TestTabProps {
  app: string
  refetch: () => void
  tc: string
  setTc: React.Dispatch<React.SetStateAction<string>>
  index:number
}

export interface TcRow {
  id: string
  time: string
  proto: string
  uri: string
  statusCode: number
  method: Method
}

export default function TestCasesTab(props: TestTabProps) {
  const{tc,setTc,index}=props
  const [pageSize, setPageSize] = React.useState<number>(25)
  const [delete_tc, setDeleteTc] = React.useState("")
  const { loading, error, data, refetch } = useQuery<AppTCsMeta>(GET_APP_TC_META, {
    variables: { app: props.app }
  })

  const [deleteTc] = useMutation<{ deleteTestCase: boolean }, { id: string }>(DELETE_TC, {
    variables: {
      id: delete_tc
    }
  })

  if (loading) return <Loading />
  if (error) return <ErrorView msg={error.message} />

  if (data == undefined || data.testCase == undefined || data.testCase.length == 0) {
    return (<Empty doc={"https://github.com/keploy/keploy"} message={"No Test Cases Recorded Yet! "} image={EmptyImg}/>)
  }

  const renderOperations = (params: GridRenderCellParams<string>) => {
    return <IconButton color="error" aria-label="Delete test-case"
                       component="span" onClick={(e: React.MouseEvent<HTMLElement>)=> {
      e.preventDefault()
      async function deleteTestCase() {
        await setDeleteTc(params.row['id'])
        deleteTc()
          .then(() => {
            refetch()
            props.refetch()
            setDeleteTc("")
            return
          })
          .catch((err) => {
            console.log(err)
          })
      }
      deleteTestCase()
    }}>
      <Delete />
    </IconButton>
  }

  const columns: GridColDef[] = [
    {
      field: "time",
      headerName: "Updated At",
      minWidth: 200,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "left",
      headerAlign: "left"
    },
    {
      field: "id",
      headerName: "Test ID",
      minWidth: 100,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center"
    },
    {
      field: "proto",
      headerName: "Proto",
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center"
    },
    {
      field: "uri",
      headerName: "URI",
      minWidth: 200,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center"
    },
    {
      field: "statusCode",
      headerName: "Response Code",
      minWidth: 100,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center"
    },
    {
      field: "method",
      headerName: "Method",
      minWidth: 100,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center"
    },
    {
      field: "methods",
      headerName: " _   ",
      minWidth: 20,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      renderCell: renderOperations
    },
  ]

  const rows: TcRow[] = getTcRows(data.testCase)

  return (
    <Box sx={{
      width: "100%", backgroundColor: "white",
      "& .super-app-theme--header": {
        backgroundColor: "rgba(25,118,210,0.9)",
        color: "#ffffff"
      }
    }}>
      {tc == "" && (
        <DataGrid rows={rows} columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[25, 50, 100]}
                  pagination
                  autoHeight={true}
                  onCellClick={(params: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
                    if (params.field != "methods"){
                      event.defaultMuiPrevented = true
                      let t = data.testCase.filter((item) => item.id == params.id)
                      setTc(t[0].id)
                      navigate("?index="+index+"&tcId="+t[0].id)
                    } else {
                      setDeleteTc(params.row['id'])
                    }
                  }}
                  components={{ Toolbar: CustomToolbar }} />
      )}
      {tc != "" && (
        <TcsDetail tc={tc} close={() => {
          setTc("")
        }} />
      )}
    </Box>
  )
}
