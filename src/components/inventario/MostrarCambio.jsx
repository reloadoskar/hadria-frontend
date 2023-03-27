import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
export default function MostrarCambio({open, close, cambio}){
    const classes = useStyles()
    return !cambio || !open ? null :
        <Dialog 
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={close}
        >
            <DialogTitle>Cambio: #{cambio.folio}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} className={classes.gridTabla2c}>
                    <Grid item xs={6}><Typography>Solicitado el:</Typography></Grid>
                    <Grid item xs={6}><Typography>{cambio.fecha} {moment(cambio.createdAt).format("HH:mm A")}</Typography></Grid>
                    <Grid item xs={6}><Typography>Piezas:</Typography></Grid>
                    <Grid item xs={6}><Typography>{cambio.piezas}</Typography></Grid>
                    <Grid item xs={6}><Typography>Enviado el:</Typography></Grid>
                    <Grid item xs={6}><Typography>{moment(cambio.respuesta.fecha).format("YYYY-MM-DD HH:mm A")}</Typography></Grid>
                    <Grid item xs={6}><Typography>Repartidor:</Typography></Grid>
                    <Grid item xs={6}><Typography>{cambio.respuesta.empleado.nombre}</Typography></Grid>
                    <Grid item xs={6}><Typography>Desde:</Typography></Grid>
                    <Grid item xs={6}><Typography>{cambio.respuesta.ubicacion.nombre}</Typography></Grid>
                    <Grid item xs={6}><Typography>Recibido el:</Typography></Grid>
                    <Grid item xs={6}><Typography>{moment(cambio.firma.fecha).format("YYYY-MM-DD HH:mm A")}</Typography></Grid>
                    <Grid item xs={6}><Typography>Recibió:</Typography></Grid>
                    <Grid item xs={6}><Typography>{cambio.firma.user}</Typography></Grid>
                    <Grid item xs={6}><Typography>Comentario:</Typography></Grid>
                    <Grid item xs={6}><Typography>{cambio.firma.comentario}</Typography></Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>
                    Salir
                </Button>
            </DialogActions>
        </Dialog>
}