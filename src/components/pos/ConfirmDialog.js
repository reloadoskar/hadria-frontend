import React from 'react';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { Grid, Typography, Divider } from '@material-ui/core';

export default function ConfirmaDialog(props) {
    const { 
        onClose, 
        open, data, cierraCorte} = props;

    const handleCancel = () => {
        onClose('confirm');
    };
    
    const handleOk = () => {
        cierraCorte(data)
        onClose('confirm');
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="lg"
            open={open}
        >
            <DialogTitle>¿Desea cerrar el día?</DialogTitle>
            <DialogContent dividers>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography align="left" variant="body1">Ventas</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1">$ {data.totalVentas}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Ingresos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1">+$ {data.totalIngresos}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Créditos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1" color="secondary">-$ {data.totalCreditos}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">A cuenta</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1">+$ {data.totalAcuenta}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Egresos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1" color="secondary">-$ {data.totalEgresos}</Typography>
                        </Grid>
                </Grid>
                <Divider />
                <Grid container justify="flex-end">
                    <Typography align="right" variant="h6">$ {data.total}</Typography>
                </Grid>
                <Grid container >
                    <Typography variant="caption" children="*Los cortes se envían automaticamente a ADMINISTRACIÓN" align="center" />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Todavia No
        </Button>
                <Button variant="contained" onClick={handleOk} color="primary">
                    ¡Ciérralo!
        </Button>
            </DialogActions>
        </Dialog>
    )
}


