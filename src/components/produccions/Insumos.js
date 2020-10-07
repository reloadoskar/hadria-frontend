import React, {useState, useEffect} from 'react' 
import { Card, CardHeader, CardContent, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {formatNumber, sumImporte} from '../Tools'
import AddInsumo from './AddInsumo'
import useCompraItems from '../hooks/useCompraItems'
import useInsumos from '../hooks/useInsumos'
export default function Insumos(props) {
    const {produccion, enviarMensaje} = props
    const {items, restaStock, sumaStock} = useCompraItems()
    const {add, del} = useInsumos()
    // useEffect(() => {
    //     setInsumos(useInsumos(produccion.id))
    // }, [produccion])
    const [sumaInsumos, setSumaInsumos] = useState(0)
    useEffect(() => {
        if(produccion){
            setSumaInsumos(sumImporte(produccion.insumos))
        }
    }, [produccion])
    const [agregarInsumo, setAgregarInsumo] = useState(false)
    const showAgregarInsumo = () => {
        setAgregarInsumo(true)
    }
    const closeAgregarInsumo = () => {
        setAgregarInsumo(false)
    }

    const agregar = (insumo) => {
        insumo.produccion = produccion.id
        enviarMensaje("Agregando...", "info")
        add(insumo).then(res => {
            enviarMensaje(res.message, res.status)
        })
        restaStock(insumo.compraItem._id, insumo.cantidad)
    }

    const eliminar = (insumo) => {
        enviarMensaje("Eliminando...", "info")
        del(insumo).then( res => {
            enviarMensaje(res.message, res.status)
        })
        sumaStock(insumo.compraItem._id, insumo.cantidad)
    }
    
    return (
        <Card>
            <CardHeader title="Insumos" />
            <CardContent>
                {
                    produccion.items === null ?
                        <Typography >not ready :/</Typography>
                    :
                    <div>
                        <Grid container direction="row-reverse">
                            <Grid item xs={2}>
                                <IconButton onClick={showAgregarInsumo}>
                                    <AddIcon />
                                </IconButton>

                                <AddInsumo open={agregarInsumo} close={closeAgregarInsumo} agregar={agregar} enviarMensaje={enviarMensaje} items={items}/>
                            </Grid>
                        </Grid>

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
                                    produccion.insumos.map((insumo, index) => (
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
                </div>
                }
            </CardContent>
        </Card>
    )
}