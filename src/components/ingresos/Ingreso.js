import { Grid } from '@material-ui/core'
import React from 'react'

export default function Ingreso(props){
    const {ingreso} = props
    return (
        <Grid container>
            <Grid item >{ingreso.ubicacion}</Grid>
            <Grid item >{ingreso.fecha}</Grid>
            <Grid item >{ingreso.concepto}</Grid>
            <Grid item >{ingreso.descripcion}</Grid>
            <Grid item >{ingreso.importe}</Grid>
            <Grid item >edit delete</Grid>
        </Grid>
    )
}