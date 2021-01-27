import React from 'react';
import { useSnackbar } from 'notistack';
import { Divider, IconButton, Typography, Container, Grid, Card, CardHeader, CardContent, LinearProgress } from '@material-ui/core';

import useInventario from './hooks/useInventario';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {sumStock, sumEmpStock} from "./Tools"

import {ticketInventario} from "./api"
function Inventario() {
    const { enqueueSnackbar } = useSnackbar()
    const { inventario } = useInventario();
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const handleClick = () =>{
        ticketInventario(inventario).then(res =>{
            if(res.status === 'error'){
                showMessage(res.message, res.status)
            }
            else{
                showMessage("Se imprimió el inventario", "success")
            }
        })
    }
    return (

        <Container maxWidth="lg">
            <Grid container >
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" children="Inventario" paragraph />
                </Grid>
                <Grid item xs={12} md={6}>
                    Imprimir
                    <IconButton onClick={() => handleClick(inventario)}>
                        <ReceiptIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={3}>

                {
                    inventario === null ?
                        <LinearProgress variant="query" />
                        :
                        inventario.compras.length === 0 ?
                            <Typography variant="h6" align="center" gutterBottom>No se encontró información.</Typography>
                            :
                            inventario.compras.map((compra, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card>
                                        <CardHeader 
                                        title={compra.folio+ " | " +compra.clave}  
                                        subheader={compra.ubicacion.nombre}
                                        />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                {compra.items.map((item, i) => (//{
                                                    // if(item.stock > 0){
                                                    //     return(
                                                    item.stock > 0 ? 
                                                        <Grid item xs={12} key={i}>
                                                            <Grid container >
                                                                <Grid item xs={8}>
                                                                    <Typography
                                                                        children={item.producto.descripcion}
                                                                        />
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Typography
                                                                        align="right"
                                                                        children={item.empaquesStock + " " + item.producto.empaque.abr}
                                                                        />
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Typography
                                                                        align="right"
                                                                        children={item.stock + " " + item.producto.unidad.abr}
                                                                        />
                                                                </Grid>
                                                            </Grid>
                                                            <Divider />
                                                        </Grid>
                                                    :
                                                    null
                                                        //)
                                                    //} 
                                                    
                                                )//}

                                                )}
                                                <Grid item xs={8}>
                                                    <Typography align="right"
                                                        variant="h6"
                                                        children="Total:"
                                                        />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="h6"
                                                        align="right"
                                                        children={sumEmpStock(compra.items)}
                                                        />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="h6"
                                                        align="right"
                                                        children={sumStock(compra.items)}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))

                }
            </Grid>
        </Container>

    )
}

export default Inventario