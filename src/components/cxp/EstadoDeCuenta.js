import React from 'react'
import { Typography, Grid, Divider } from '@material-ui/core'
import {formatNumber} from '../Tools'
export default function EstadoDeCuenta(props){
    const {cuentas} =props
    return cuentas.length > 0 ?
            cuentas.map((cuenta, i)  => (
                <React.Fragment key={i}>
                <Grid item xs={12} container >
                    <Grid item xs={2} sm={4}>#{cuenta.folio}</Grid>
                    <Grid item xs={5} sm={4}>{cuenta.compra.fecha}</Grid>
                    <Divider />
                    <Grid item xs={5} sm={4}>
                        <Typography align="right">{"$"+formatNumber(cuenta.saldo,2)}</Typography>
                    </Grid>
                </Grid>
                </React.Fragment>
            ))

    :
        null
        // <Table size="small">
        //     <TableHead>
        //         <TableRow>
        //             <TableCell><Typography align="right" variant="caption" children="Folio" /></TableCell>
        //             <TableCell><Typography align="right" variant="caption" children="Fecha" /></TableCell>
        //             <TableCell align="right"><Typography variant="caption" children="Saldo" /></TableCell>
        //         </TableRow>
        //     </TableHead>
        //     <TableBody>
        //     {
        //         cuentas.map((cuenta, i) => (   
        //             <TableRow key={i}>
        //                 <TableCell >
        //                     <Typography align="right" variant="subtitle2" children={cuenta.folio} />
        //                 </TableCell>
        //                 <TableCell>
        //                     <Typography align="right" variant="subtitle2" children={cuenta.compra.fecha} />                                                    
        //                 </TableCell>
        //                 <TableCell>
        //                     <Typography align="right" variant="subtitle2" children={"$"+formatNumber(cuenta.saldo)} />
        //                 </TableCell>                            
        //             </TableRow>                                         
        //         ))
        //     }                       
        //     </TableBody>
        // </Table>
    // )
}