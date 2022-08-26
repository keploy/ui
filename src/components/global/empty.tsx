import { Box, Grid, IconButton, Link, Paper, Typography } from "@mui/material"
import React from "react"
import { Article } from "@mui/icons-material"

export interface EmptyProps {
  message : string
  doc : string
  image : string
}

export default function Empty (props : EmptyProps){
  var paperHeight = `calc(100vh)`
  if(props.image === "None"){
    //This Case is for Onboarding page.
    paperHeight = `calc(0vh)`
  }
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: (t) => t.palette.background.default,
        margin: 0,
        height: paperHeight,
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: `100%`,
        }}
      >
      {props.image !== "None"?
      <Box
          component="img"
          sx={{
            height: `calc(70vh)`,
            width: `calc(70vh)`,
          }}
          alt= {props.message}
          src={props.image +"?auto=format&w=350&dpr=2"}
        />
        :<br/>}
        <Typography variant="subtitle1" sx={{mt : 2}}>
          {props.message}
        </Typography>
        <Grid container direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <IconButton  href={props.doc} color="secondary" aria-label="delete" size="large">
            <Article/>
          </IconButton>
          <Link href={props.doc} target="_blank" underline="hover">
            {'For help, please visit documentation'}
          </Link>
        </Grid>
      </Grid>
    </Paper>
  )
}
