import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { formatNumber } from '../Tools'
export default function VentaGrouped({venta}){
    return venta !== null ?
        
        <Grid container>
            <Grid item xs={2} sm={1}>#{venta.folio}</Grid>
            <Grid item xs={10} sm={2}>{venta.fecha}</Grid>
            <Grid item xs={8} sm={7}>{venta.cliente.nombre}</Grid>
            <Grid item xs={4} sm={2}>
                <Typography align="right" >
                    ${formatNumber(venta.importe,2)}
                </Typography>
            </Grid>
        </Grid>
        
    : null
}