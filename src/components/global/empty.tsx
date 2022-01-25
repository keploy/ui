import { Box, Grid, IconButton, Link, Paper, Typography } from "@mui/material"
import React from "react"
import { Article } from "@mui/icons-material"

export interface EmptyProps {
  message : string
  doc : string
  image : string
}

export default function Empty (props : EmptyProps){
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: (t) => t.palette.background.default,
        margin: 0,
        height: `calc(100vh)`,
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
        <Box
          component="img"
          sx={{
            height: `calc(70vh)`,
            width: `calc(70vh)`,
          }}
          alt= {props.message}
          src={props.image +"?auto=format&w=350&dpr=2"}
        />
        <Typography variant="subtitle1" sx={{mt : 2}}>
          {props.message}
        </Typography>
        <Grid container direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <IconButton  href={props.doc} color="secondary" aria-label="delete" size="large">
            <Article/>
          </IconButton>
          <Link href={props.doc} underline="hover">
            {'For help, please visit documentation'}
          </Link>
        </Grid>
      </Grid>
    </Paper>
  )
}
