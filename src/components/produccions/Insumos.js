import React, {useState, useEffect} from 'react' 
import { LinearProgress, Card, CardHeader, CardContent, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {formatNumber, sumImporte} from '../Tools'
export default function Insumos(props) {
    const {eliminar, insumos} = props
    const [sumaInsumos, setSumaInsumos] = useState(0)
    useEffect(() => {
        if(insumos){
            setSumaInsumos(sumImporte(insumos))
        }
    }, [insumos])

    // const agregar = (insumo) => {
    //     insumo.produccion = produccion._id
    //     showMessage("Agregando...", "info")
    //     add(insumo).then(res => {
    //         showMessage(res.message, res.status)
    //     })
    //     restaStock(insumo.compraItem._id, insumo.cantidad)
    // }
    
    // const eliminar = (insumo) => {
    //     showMessage("Eliminando...", "info")
    //     del(insumo).then(res=>{
    //         showMessage(res.message, res.status)
    //     })
    //     sumaStock(insumo.compraItem._id, insumo.cantidad)
        
    // }
    return (
        <Card>
            {
                insumos === null ?
                    <LinearProgress variant="query"/>
                :
                <React.Fragment>
                    <CardHeader title="Insumos" 
    
                    />
                    <CardContent>
                        { 
                            insumos.length === 0 ?
                                <Typography children="No hay insumos." />
                            :
                                <Grid container >
                                    <Grid item xs={12}>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Descripción</TableCell>
                                                    <TableCell align="right">Cantidad</TableCell>
                                                    <TableCell align="right">Importe</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    insumos.map((insumo, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{insumo.compraItem.producto.descripcion}</TableCell>
                                                            <TableCell align="right">{insumo.cantidad}</TableCell>
                                                            <TableCell align="right">${formatNumber(insumo.importe, 2)}</TableCell>
                                                            <TableCell align="right">
                                                                <IconButton onClick={() => eliminar(insumo)}>
                                                                    <DeleteIcon color="secondary"/>
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                                <TableRow>
                                                    <TableCell colSpan={2} align="right">Total</TableCell>
                                                    <TableCell align="right">
                                                        <Typography align="right">${ formatNumber(sumaInsumos, 2) }</Typography> 
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                    </Grid>
                                </Grid>
                        }

                    </CardContent>
                </React.Fragment>
            }
        </Card>
    )
}