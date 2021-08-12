import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { formatNumber } from '../Tools'
export default function VentaGrouped({venta}){
    return venta !== null ?
        <TableRow>
            <TableCell>#{venta.ventaFolio}</TableCell>
            <TableCell>{venta.ubicacion.nombre}</TableCell>
            <TableCell>{venta.fecha}</TableCell>
            <TableCell>{venta.venta.cliente.nombre}</TableCell>
            <TableCell>{venta.producto.descripcion}</TableCell>
            <TableCell align="right">{formatNumber(venta.cantidad,1)}</TableCell>
            <TableCell align="right">{venta.empaques}</TableCell>
            <TableCell align="right">${venta.precio}</TableCell>
            <TableCell align="right">${formatNumber(venta.importe,1)}</TableCell>
        </TableRow>
    : null
}