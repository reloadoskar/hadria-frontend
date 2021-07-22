import React from 'react'
import { Grid, Box } from '@material-ui/core'

export default function Producto({producto}){
    return producto ?
        <Box borderBottom={1}>
            <Grid item xs={12} container >
                <Grid item xs={12} sm={4} >{producto.descripcion}</Grid>
                <Grid item xs={12} sm={2} >{producto.costo}</Grid>
                <Grid item xs={12} sm={2} >{producto.precio1}</Grid>
                <Grid item xs={12} sm={2} >{producto.precio2}</Grid>
                <Grid item xs={12} sm={2} >{producto.precio3}</Grid>
            </Grid>
        </Box>
    :
    null
}