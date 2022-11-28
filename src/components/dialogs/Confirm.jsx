import React from 'react'
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
export default function Confirm({ open, close, onConfirm, texto }){
    const classes = useStyles()

    function handleConfirm(){
        onConfirm()
        close()
    }

    const handleClose = () =>{
        close()
    }
    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={handleClose}
            classes={{paper: classes.confirm}}                
        >
            <DialogContent>
                <Typography variant="h6" align="center" children={texto} />
            </DialogContent>
            <DialogActions>
                <Button className={classes.botonSimplon} autoFocus onClick={handleClose} color="inherit">
                    No, espera.
                </Button>
                <Button className={classes.botonCosmico} variant="contained" onClick={() => handleConfirm()}>
                    Esta bien.
                </Button>
            </DialogActions>
        </Dialog>
    )
}