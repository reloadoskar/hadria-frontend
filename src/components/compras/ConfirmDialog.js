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
    const { open, cancel, ok, data } = props

    const handleCancel = () => {
        cancel()
    }

    const handleOk = () => {
        ok(data)
    }
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="sm"
            fullWidth
            open={open}
            classes={{paper: classes.suspended}}                
        >
            <DialogTitle>CANCELAR</DialogTitle>
            {
                data === null ?
                    null
                    :
                    <DialogContent dividers>
                        <Typography variant="h6" align="center" color="secondary" children="¿CANCELAR la compra?:" />
                        <Typography variant="h4" align="center" children={data.folio + '-' + data.clave} />
                    </DialogContent>

            }
            <DialogActions>
                <Button className={classes.botonSimplon} autoFocus onClick={handleCancel}>
                    No, espera.
        </Button>
                <Button className={classes.botonGenerico} variant="contained" onClick={handleOk} color="primary">
                    Esta bien.
        </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog