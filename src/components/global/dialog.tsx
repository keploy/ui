import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import React from "react"

interface CustomDialogProps {
  open : boolean
  msg : string
  title: string
  okfn : () => void
  closefn : () => void
}

export default function CustomDialog (props: CustomDialogProps) {
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.closefn}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closefn}>Cancel</Button>
        <Button
          onClick = {(e) => {
            e.preventDefault()
            props.okfn()
          }}
        >Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
