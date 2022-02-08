import { AlertProps, Snackbar } from "@mui/material"
import React from "react"
import MuiAlert from '@mui/material/Alert'

interface CustomAlertProps {
  open : boolean
  msg : string
  severity : AlertProps["severity"]
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref,) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export default function CustomAlert (props: CustomAlertProps) {
  const [open, setOpen] = React.useState(props.open)
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant={"standard"} onClose={handleClose} severity={ props.severity } sx={{ width: '100%' }}>
        {props.msg}
      </Alert>
    </Snackbar>
  )
}
