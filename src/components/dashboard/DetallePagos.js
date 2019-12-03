import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, Table, TableHead, TableRow, TableCell, Typography, TableBody } from '@material-ui/core';
import useStyles from '../hooks/useStyles'
import moment from 'moment'
export default function DetallePagos({pagos, formatNumber, sumImporte}){
    const classes = useStyles();
    const [totalPagos, setTotalPagos] = useState(0)
    useEffect(() => {
        if(pagos){
            setTotalPagos(
                sumImporte(pagos)
            )
        }
    }, [pagos, sumImporte])
    return (
        <Card elevation={6} square classes={{ root: classes.pagosCard, }}>
            <CardHeader title="Pagos:" ></CardHeader>
            <CardContent>
                {
                    pagos.length > 0 ? 
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Tipo Pago</TableCell>
                                    <TableCell>Ubicación</TableCell>
                                    <TableCell>Referencia</TableCell>
                                    <TableCell align="right">Importe</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pagos.map((pago, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{moment(pago.fecha).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell>{pago.tipoPago}</TableCell>
                                        <TableCell>{pago.ubicacion.nombre}</TableCell>
                                        <TableCell>{pago.referencia}</TableCell>
                                        <TableCell align="right">{formatNumber(pago.importe)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow selected>
                                    <TableCell colSpan={4} align="right">Total</TableCell>
                                    <TableCell align="right">{formatNumber(totalPagos)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    :
                        <Typography variant="h6" align="center" children="No se encontraron pagos." />
                }
            </CardContent>
        </Card>
    )
}