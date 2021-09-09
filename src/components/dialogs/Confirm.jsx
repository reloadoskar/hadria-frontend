import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
export default function Confirm(props){
    const classes = useStyles()
    const { open, close, onConfirm } = props

    function handleConfirm(){
        onConfirm()
        close()
    }

    function handleClose(){
        close()
    }
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={handleClose}
            classes={{paper: classes.suspended}}                
        >
            <DialogTitle>CANCELAR</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="h6" align="center" children="¿Seguro quieres CANCELAR?" />
                </DialogContent>
            <DialogActions>
                <Button className={classes.botonSimplon} autoFocus onClick={handleClose}>
                    No, espera.
                </Button>
                <Button className={classes.botonCosmico} variant="contained" onClick={() => handleConfirm()}>
                    Esta bien.
                </Button>
            </DialogActions>
        </Dialog>
    )
}