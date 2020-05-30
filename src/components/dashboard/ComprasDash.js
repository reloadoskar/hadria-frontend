import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, ListItem, LinearProgress } from '@material-ui/core';

import useCompras from '../hooks/useCompras';
import {sumStock, sumEmpStock} from '../Tools'
import VerCompra from './VerCompra'
export default function ComprasDash(){
    const {compras, cerrar, updating} = useCompras();
    const [compraSelected, setCompraSelected] = useState(null)
    const [verCompra, setVerCompra] = React.useState(false);

    const handleClose = () => {
        setVerCompra(false)
        setCompraSelected(null)
    };

    const handleMenu = (action, compra) => {
        if(action === 'ver'){
            setCompraSelected(compra)
            setVerCompra(true)
        }
    }
    return (
        <Card>
            <CardHeader title="Compras" />
            <CardContent>                
                {
                    compras === null ?
                        <LinearProgress variant="query" />
                    :

                    compras.length === 0 ?
                        <Typography variant="h6" align="center" gutterBottom>No hay Compras registradas.</Typography>
                    : 
                        compras.map( (compra, index) => (
                            updating === true ?
                                <LinearProgress key={index} variant="query" />
                            :
                            <ListItem button key={index} onClick={()=> handleMenu('ver', compra._id)}>
                            <Grid key={index} container >
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5">{compra.folio + ":" +compra.clave}</Typography>
                                    <Typography variant="body2">{compra.ubicacion.nombre} | {compra.tipoCompra.tipo}</Typography>
                                </Grid>
                                <Grid item xs={12} md>
                                    <Typography children={compra.status} />
                                </Grid>
                                <Grid item xs={6} md>
                                    <Typography variant="body2" align="right" children="Unidades:" />
                                    <Typography variant="h5" align="right" children={sumStock(compra.items) + " | "} />
                                </Grid>
                                <Grid item xs={6} md>
                                    <Typography variant="body2" children="Empaques: " />
                                    <Typography variant="h5" align="left" children={sumEmpStock(compra.items) } />
                                </Grid>
                                
                            </Grid>
                            </ListItem>
                        ))
                }
            </CardContent>
            <VerCompra compraId={compraSelected} isOpen={verCompra} handleClose={handleClose} cerrar={cerrar}/>
        </Card>
    )
}