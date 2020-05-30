import React, { useState, useEffect } from 'react'
import { Table, Card, TableHead, TableCell, TableRow, TableBody, CardHeader, CardContent, Typography } from '@material-ui/core';
import { 
    sumCantidad, 
    sumEmpaques, 
    sumImporte,
    formatNumber,
} from '../Tools'
const DetalleVentas = ({ventas}) => {
    const [tcantidad, setTcantidad] = useState(0)
    const [tempaques, setTempaques] = useState(0)
    const [precioProm, setPrecioProm] = useState(0)
    const [timporte, setTimporte] = useState(0)

    useEffect(() => {
        if(ventas){
            let tcant = sumCantidad(ventas)
            let temp = sumEmpaques(ventas)
            let timp = sumImporte(ventas)
            let pp = timp/tcant

            setTcantidad(formatNumber(tcant))
            setTempaques(formatNumber(temp))
            setPrecioProm(formatNumber(pp,2))
            setTimporte(formatNumber(timp))
        }
    }, [ventas])
    return (
        <Card>
            <CardHeader title="Detalle de Ventas"></CardHeader>
            <CardContent>
                {
                    ventas.length === 0 ?
                        <Typography variant ="h6" align="center" children="No se encontraron Ventas." />
                    :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>folio</TableCell>
                                <TableCell>fecha</TableCell>
                                <TableCell>Producto</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Empaques</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Importe</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ventas.map( venta => (//{
                                // if(venta.venta !== null){
                                //     return(

                                venta.venta !== null ?
                                        <TableRow key={venta._id}>
                                            <TableCell>{venta.ventaFolio}</TableCell>
                                            <TableCell>{venta.venta.fecha}</TableCell>
                                            <TableCell>{venta.producto.descripcion}</TableCell>
                                            <TableCell align="right">{venta.cantidad}</TableCell>
                                            <TableCell align="right">{venta.empaques}</TableCell>
                                            <TableCell align="right">{venta.precio}</TableCell>
                                            <TableCell align="right">{venta.importe}</TableCell>
                                        </TableRow> 
                                :
                                    null
                                //     )
                                // }
                            ))//}
                            }
                            <TableRow selected>
                                <TableCell colSpan="2" align="right">Total</TableCell>
                                <TableCell align="right">{tcantidad}</TableCell>
                                <TableCell align="right">{tempaques}</TableCell>
                                <TableCell align="right">{precioProm}</TableCell>
                                <TableCell align="right">{timporte}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                }
            </CardContent>
        </Card>
    )
}

export default DetalleVentas