import { Button, Snackbar } from '@mui/material'
import { useState} from 'react'
import React from 'react'

export interface CopyToClipboardProps {
    data: string
}

function CopyToClipboard(props:CopyToClipboardProps){
    const [open, setOpen] = useState(false)
    const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(props.data)
    }
    return (
        <div>
            <Button onClick={handleClick}>Copy</Button>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied To Clipboard"
            />
        </div>
    )
}
export default CopyToClipboard