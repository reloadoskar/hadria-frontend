import React from 'react'
import {
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@material-ui/core';
const ConfirmDialog = (props) => {
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
        >
            <DialogTitle>CANCELAR</DialogTitle>
            {
                data === null ?
                    null
                    :
                    <DialogContent dividers>
                        <Typography variant="h6" align="center" color="secondary" children="Se va a CANCELAR la compra:" />
                        <Typography variant="h4" align="center" children={data.folio + '-' + data.clave} />
                    </DialogContent>

            }
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    No, espera.
        </Button>
                <Button variant="contained" onClick={handleOk} color="primary">
                    Esta bien.
        </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog