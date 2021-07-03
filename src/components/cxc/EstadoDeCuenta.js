import React from 'react'
import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import {formatNumber, sumSaldo} from '../Tools'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
export default function EstadoDeCuenta(props){
    const {cuentas} =props
    const classes = useStyles()
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell><Typography align="left" variant="caption" children="Folio" /></TableCell>
                    <TableCell><Typography align="left" variant="caption" children="Fecha" /></TableCell>
                    <TableCell align="right"><Typography variant="caption" children="Importe" /></TableCell>
                    <TableCell align="right"><Typography variant="caption" children="Saldo" /></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                cuentas.map((cuenta, i) => (   
                    <TableRow key={i}>
                        <TableCell >
                            <Typography align="left" variant="subtitle2" children={cuenta.venta.folio} />
                        </TableCell>
                        <TableCell>
                            <Typography align="left" variant="subtitle2" children={moment(cuenta.venta.fecha).format("D/M/YY")} />                                                    
                        </TableCell>
                        <TableCell>
                            <Typography align="right" variant="subtitle2" children={"$"+formatNumber(cuenta.venta.importe)} />
                        </TableCell>
                        <TableCell>
                            <Typography align="right" variant="subtitle2" children={"$"+formatNumber(cuenta.saldo)} />
                        </TableCell>
                    </TableRow>                                         
                ))
            }         
                <TableRow>
                    <TableCell colSpan={3}>
                        
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.textoMiniFacheron} align="right" >Total:</Typography>
                        <Typography className={classes.textoMirame} align="right" >{formatNumber(sumSaldo(cuentas),2)}</Typography>
                    </TableCell>
                </TableRow>              
            </TableBody>
        </Table>
    )
}