import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

const StatusDialog = (props) => {
const {open=true, close, message} = props
return (
    <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
    >
        <DialogTitle>Cuenta Suspendida</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions></DialogActions>
    </Dialog>
)
}

export default StatusDialog