import React from 'react'
import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import {formatNumber} from '../Tools'
export default function EstadoDeCuenta(props){
    const {cuentas} =props
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell><Typography align="right" variant="caption" children="Folio" /></TableCell>
                    <TableCell><Typography align="right" variant="caption" children="Fecha" /></TableCell>
                    <TableCell align="right"><Typography variant="caption" children="Saldo" /></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                cuentas.map((cuenta, i) => (   
                    <TableRow key={i}>
                        <TableCell >
                            <Typography align="right" variant="subtitle2" children={cuenta.folio + " " +cuenta.compra.clave} />
                        </TableCell>
                        <TableCell>
                            <Typography align="right" variant="subtitle2" children={cuenta.concepto} />                                                    
                        </TableCell>
                        <TableCell>
                            <Typography align="right" variant="subtitle2" children={"$"+formatNumber(cuenta.saldo)} />
                        </TableCell>                            
                    </TableRow>                                         
                ))
            }                       
            </TableBody>
        </Table>
    )
}