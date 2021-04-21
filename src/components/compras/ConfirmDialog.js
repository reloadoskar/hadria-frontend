import React from 'react'
import {
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@material-ui/core';
import useStyles from '../hooks/useStyles';
const ConfirmDialog = (props) => {
    const classes = useStyles()
    const { open, close, onConfirm } = props

    function handleConfirm(){
        onConfirm()
    }

    function handleClose(){
        close()
    }
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={handleClose}
            classes={{paper: classes.suspended}}                
        >
            <DialogTitle>CANCELAR</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="h6" align="center" children="¿Seguro quieres CANCELAR?:" />
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

export default ConfirmDialog