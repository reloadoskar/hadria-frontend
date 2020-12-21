import React from 'react'
import { Grid, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import {sumCantidad, sumEmpaques, sumImporte, formatNumber} from '../Tools'
export default function ListaItems(props) {
    const {items, eliminar} = props
    return(
        <Grid container>
            <Grid item xs={12}>
                {
                items.length === 0 ?
                    null
                :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Producto</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Empaques</TableCell>
                                <TableCell align="right">Costo</TableCell>
                                <TableCell align="right">Importe</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.producto.descripcion}</TableCell>
                                        <TableCell align="right">{item.cantidad}</TableCell>
                                        <TableCell align="right">{item.empaques}</TableCell>
                                        <TableCell align="right">{item.costo}</TableCell>
                                        <TableCell align="right">{formatNumber(item.importe,2)}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => eliminar(index)}>
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    ))
                            }
                            <TableRow>
                                <TableCell align="right" >( {items.length} Items)Total</TableCell>
                                <TableCell align="right">{sumCantidad(items)}</TableCell>
                                <TableCell align="right">{sumEmpaques(items)}</TableCell>
                                <TableCell align="right">-</TableCell>
                                <TableCell align="right">{formatNumber(sumImporte(items),2)}</TableCell>
                                
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                }
            </Grid>
        </Grid>

    )
}