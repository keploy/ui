import React from "react"
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      style={{ padding: 0, width: "100%" }}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment> {children}</React.Fragment>
      )}
    </div>
  )
}

export function TabPanelBox(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flexGrow: 1, backgroundColor: "rgba(240,240,240,0.4)" }}
    >
      {value === index && (
        <Box style={{ margin: 10 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Grid>
  )
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  }
}

export const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff"
  }
})

export interface StyledTabProps {
  label: string
  normal? : boolean
}

export const AntTab = styled((props: StyledTabProps) =>
  <Tab disableRipple {...props}
       sx={{
         backgroundColor: "#ffffff",
         color: props.normal || props.normal == undefined? "#000000": "#730606",
       }}
  />)
(({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\""
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&.Mui-selected": {
      color: "#000000",
      fontWeight: theme.typography.fontWeightBold
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff"
    }
  })
)

export const CustomTab = styled(Tab)`
  :hover {
    color: #59086d;
  }
  margin-right: 10px;
  margin-left: 10px;
  text-transform: initial;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  border-style: solid;
  border-bottom-width: 1px;
  border-color: #1976d2;
`
