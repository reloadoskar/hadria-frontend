import React from 'react'
import { TableRow, TableCell, Typography } from '@material-ui/core'
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
export default function VentaGrouped({venta}){
    const classes = useStyles()
    return venta !== null ?
        <TableRow>
            <TableCell>#{venta.ventaFolio}</TableCell>
            <TableCell>{venta.ubicacion.nombre}</TableCell>
            <TableCell>{venta.fecha}</TableCell>
            <TableCell>
                { venta.venta.cliente ? venta.venta.cliente.nombre : <Typography className={classes.textoMirame}>¡Desapareció! 🤷‍♂️🤷‍♂️😢</Typography> }
            </TableCell>
            <TableCell>{venta.producto.descripcion}</TableCell>
            <TableCell align="right">{formatNumber(venta.cantidad,1)}</TableCell>
            <TableCell align="right">{venta.empaques}</TableCell>
            <TableCell align="right">${venta.precio}</TableCell>
            <TableCell align="right">${formatNumber(venta.importe,1)}</TableCell>
        </TableRow>
    : null
}