import React from 'react'
import { Card, CardContent, CardHeader, Divider, LinearProgress, Typography, } from '@material-ui/core';
// import DeleteIcon from '@material-ui/icons/Delete'
import Producto from './Producto'
import { formatNumber, sumImporte } from '../Tools';
export default function Productos(props){
    const {productos, eliminar, 
        // produccion, 
        // showMessage
    } = props
    // const agregar = () => {

    // }
    return (
        <Card>
            {
                productos === null ?
                    <LinearProgress variant="query" />
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
                                    <div>
                                        {
                                            productos.map ( (op, i) => (
                                                <div index={i}>
                                                    <Producto producto={op} eliminar={eliminar}/>
                                                    <Divider />
                                                </div>
                                            ))
                                        }
                                        
                                            <Typography align="right" variant="h6" children={"$"+formatNumber(sumImporte(productos),2)} />
                                        
                                    </div>

                            }
                        </CardContent>
                    </div>

            }

        </Card>
    )
}