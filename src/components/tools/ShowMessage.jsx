import { Snackbar } from '@material-ui/core'
import React from 'react'

export default function ShowMessage({mensaje, open=false, vertical="bottom", horizontal="center", duration=6000, action=null}){
    const [op, setOp] = React.useState(open);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }   
        setOp(false);
    }
    return(
        <Snackbar 
            anchorOrigin={{vertical: vertical, horizontal: horizontal}}
            open={op}
            autoHideDuration={duration}
            onClose={handleClose}
            message={mensaje}
            action={action}
        />
    )
}