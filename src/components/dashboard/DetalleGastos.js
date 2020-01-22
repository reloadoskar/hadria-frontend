import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { 
    sumCantidad, 
    sumEmpaques, 
    sumImporte,
    formatNumber,
} from '../Tools'
const DetalleGastos = ({gastos}) => {
    const [total, setTotal] = useState(0)
    useEffect(() => {
        if(gastos){
            let ttl= sumImporte(gastos)
            setTotal(formatNumber(ttl))
        }
    }, [gastos])
    return(
        <Card>
            <CardHeader title="Detalle de Gastos"></CardHeader>
            <CardContent>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>folio</TableCell>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Descripcion</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="right">Importe</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gastos.map(gasto => (
                            <TableRow key={gasto._id}>
                                <TableCell>{gasto.folio}</TableCell>    
                                <TableCell>{gasto.concepto}</TableCell>    
                                <TableCell>{gasto.descripcion}</TableCell>    
                                <TableCell>{gasto.fecha}</TableCell>    
                                <TableCell align="right">{formatNumber(gasto.importe)}</TableCell>    
                            </TableRow>                            
                        ))}
                        <TableRow selected>
                            <TableCell colSpan="4" align="right">Total</TableCell>
                            <TableCell align="right">{total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default DetalleGastos