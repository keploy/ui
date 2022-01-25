import * as React from "react"
import { ReactNode } from "react"
import { CSSObject, styled, Theme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { Avatar, Grid, Tooltip, tooltipClasses, TooltipProps } from "@mui/material"
import { ChevronLeft, Menu } from "@mui/icons-material"
import SpeedIcon from "@mui/icons-material/Speed"
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay"
import { Link } from "gatsby"
import { makeStyles } from "@mui/styles"
// @ts-ignore
import Logo from "../../images/logo.png"
import { Helmet } from "react-helmet"

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface LayoutProps {
  children: ReactNode
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 15
  }
}))

const useStyles = makeStyles(() => ({
  links: {
    color: "black",
    textDecoration: "none"
  },
}))

export default function Layout(props: LayoutProps) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          sx: {
            "&:hover": {
              boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
            },
          }
        }}
        variant="permanent" open={open} >
        <DrawerHeader>
          <Grid container justifyContent={"flex-start"} alignItems={"center"} sx={{ marginTop: 3 }}>
            <Avatar variant={"square"} alt="Keploy" src={Logo} sx={{
              minHeight: 25,
              minWidth: 25
            }} />
          </Grid>
        </DrawerHeader>
        <List sx={{ justifyContent: "center" }}>
          <ListItem>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" })
              }}>
              <Menu sx={{
                color: "rgba(25,118,210)",
                width: 25,
                height: 25
              }} />
            </IconButton>
          </ListItem>
          {open && (
            <ListItem>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeft sx={{
                  color: "rgba(25,118,210)",
                  width: 25,
                  height: 25
                }} />
              </IconButton>
            </ListItem>
          )}
        </List>
        <Divider />
        <List sx={{ justifyContent: "center" }}>
          {[
            { name: "Test Cases", icon: <PlaylistPlayIcon sx={{
                color: "rgba(25,118,210)",
                width: 25,
                height: 25
              }} />, link: "/testlist" },
            { name: "Test Runs", icon: <SpeedIcon sx={{
                color: "rgba(25,118,210)",
                width: 25,
                height: 25
              }} />, link: "/testruns" },
          ].map((e) => (
            <Link key={e.link} className={classes.links} to={e.link}>
              <BootstrapTooltip title={e.name} placement="right" arrow>
                <ListItem button key={e.name} sx={{maxHeight: 60}}>
                  <ListItemIcon sx={{maxHeight: 60}}>{e.icon}</ListItemIcon>
                  <ListItemText primary={e.name} />
                </ListItem>
              </BootstrapTooltip>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {props.children}
      </Box>
      <Grid className="meetings-iframe-container" data-src="https://meetings.hubspot.com/gneha21?embed=true" />
      <Helmet>
        <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/9007927.js" />
      </Helmet>
    </Box>
  );
}
