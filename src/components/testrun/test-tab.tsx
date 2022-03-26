import React from "react"
import { DependencyType, TestQuery, TestStatus } from "../../services/queries"
import { getRows } from "../../services/services"
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  MuiEvent
} from "@mui/x-data-grid"
import { Box, Chip, IconButton } from "@mui/material"
import { Check, Close, HourglassEmpty } from "@mui/icons-material"
import { Color } from "@material-ui/lab"
import CompareView from "./compare"
import {TestRunData } from "../../services/queries"
import { defaultTq } from "../../constants"
import {navigate} from "gatsby";

export interface TestTabProps {
  tests: TestQuery[]
  editMode: boolean
  tdId:string | null | undefined
  testRunID:string
  index:number | null
  data: TestRunData
}

export interface TestRow {
  id: string
  time: string
  proto: string
  dependencyTypes: DependencyType[]
  statusCode: number
  status: TestStatus
}

export function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ margin: 15 }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  )
}

function renderStatus(params: GridRenderCellParams<TestStatus>) {
  let styleClass: Color = "warning"

  let startIcon = <HourglassEmpty color={"warning"} />

  switch (params.value.valueOf()) {
    case "PASSED": {
      styleClass = "success"
      startIcon = <Check color={"success"} />
      break
    }
    case "FAILED": {
      styleClass = "error"
      startIcon = <Close color={"error"} />
      break
    }
  }

  return <Chip sx={{ minWidth: "30%" }} variant="outlined" color={styleClass}
    avatar={<IconButton>{startIcon}</IconButton>} label={params.value} />
}

export default function TestTab(props: TestTabProps) {
  const {tdId,testRunID,index,data } = props

  let testCaseData = data.testRun[0].tests!.filter((value) => value.id == tdId)
  let filteredData=defaultTq;

  if(testCaseData.length>0){
    filteredData = testCaseData[0]
  }
  const [tcData,setTcData]=React.useState<TestQuery>(filteredData)

  const rows: TestRow[] = getRows(props.tests)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = React.useState<number>(25)

  const columns: GridColDef[] = [
    {
      field: "time",
      headerName: "Started At",
      minWidth: 250,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "left",
      headerAlign: "left"
    },
    {
      field: "proto",
      headerName: "Proto",
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center"
    },
    {
      field: "dependencyTypes",
      headerName: "Dependencies",
      minWidth: 200,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center"
    },
    {
      field: "statusCode",
      headerName: "Response Code",
      minWidth: 150,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center"
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 250,
      flex: 1,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      renderCell: renderStatus
    }
  ]

  return (
    <Box sx={{
      width: "100%", backgroundColor: "white",
      "& .super-app-theme--header": {
        backgroundColor: "rgba(25,118,210,0.9)",
        color: "#ffffff"
      }
    }}>
      {tdId == "" && (
        <React.Fragment>
          {!props.editMode && (
            <DataGrid rows={rows} columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[25, 50, 100]}
              pagination
              autoHeight={true}
              isRowSelectable={(params: GridRowParams) => params.row["status"] == TestStatus.FAILED}
              onRowClick={(params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
                event.defaultMuiPrevented = true
                let t = props.tests.filter((item) => item.id == params.id)
                setTcData(t[0])
                navigate("?id="+testRunID+"&index="+index+"&tdId="+t[0].id)
              }}
              components={{ Toolbar: CustomToolbar }} />
          )}

          {props.editMode && (
            <DataGrid rows={rows} columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[25, 50, 100]}
              pagination
              autoHeight={true}
              checkboxSelection={true}
              isRowSelectable={(params: GridRowParams) => params.row["status"] == TestStatus.FAILED}
              onRowClick={(params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
                event.defaultMuiPrevented = true
                let t = props.tests.filter((item) => item.id == params.id)
                setTcData(t[0])
              }}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel)
              }}
              selectionModel={selectionModel}
              components={{ Toolbar: CustomToolbar }} />
          )}
        </React.Fragment>
      )}
      {tdId != "" && (
        <CompareView test={tcData} close={() => {
          setTcData(defaultTq)
          navigate("?id="+testRunID+"&index="+index)
        }} />
      )}
    </Box>
  )
}
