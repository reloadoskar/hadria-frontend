import React from 'react'
import { Card, CardContent, CardHeader, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import { formatNumber, sumImporte } from '../Tools';
export default function Productos(props){
    const {productos, eliminar, 
        // produccion, 
        // showMessage
    } = props
    // const agregar = () => {

    // }

    const handleEliminar = (producto) => {
        eliminar(producto)
    }
    return (
        <Card>
            {
                productos === null ?
                    null
                :
                    <div>
                        <CardHeader title="Productos"
                            subheader={"$" + formatNumber(sumImporte(productos), 2 )}
                            >
                        </CardHeader>
                        <CardContent>
                            {
                                productos.length === 0 ?
                                        <Typography align="center">No hay productos</Typography>
                                    :
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Descripción</TableCell>
                                                    <TableCell>Cantidad</TableCell>
                                                    <TableCell>Costo/u</TableCell>
                                                    <TableCell>Importe</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    productos.map((op, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell>{op.producto.descripcion}</TableCell>
                                                            <TableCell align="right">{op.cantidad}</TableCell>
                                                            <TableCell align="right">{formatNumber(op.costo,2)}</TableCell>
                                                            <TableCell align="right">{formatNumber(op.importe)}</TableCell>
                                                            <TableCell>
                                                                <IconButton onClick={() => handleEliminar(op)}>
                                                                    <DeleteIcon color="secondary"/>
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                            }
                        </CardContent>
                    </div>

            }

        </Card>
    )
}