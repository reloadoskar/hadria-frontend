import React from 'react';

import { IconButton, Typography, Container, Grid, Card, CardHeader, CardContent, LinearProgress } from '@material-ui/core';

import useInventario from './hooks/useInventario';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {sumStock, sumEmpStock} from "./Tools"


function Inventario() {
    const { inventario } = useInventario();

    const handleClick = () =>{
        
    }
    return (

        <Container maxWidth="lg">
            <Grid container >
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" children="Inventario" paragraph />
                </Grid>
                <Grid item xs={12} md={6}>
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
                        inventario.length === 0 ?
                            <Typography variant="h6" align="center" gutterBottom>No se encontró información.</Typography>
                            :
                            inventario.map((compra, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card>
                                        <CardHeader title={compra.folio+ " | " +compra.clave} subheader={compra.ubicacion.nombre} />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={8}>
                                                    <Typography variant="body2" children="Descripción" />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="body2" children="Empaques" />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="body2" children="Cantidad" />
                                                </Grid>



                                                {compra.items.map((item, i) => (//{
                                                    // if(item.stock > 0){
                                                    //     return(
                                                    item.stock > 0 ? 
                                                        <React.Fragment key={i}>
                                                            <Grid item md={8}>
                                                                <Typography
                                                                    children={item.producto.descripcion}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Typography
                                                                    children={item.empaquesStock}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Typography
                                                                    children={item.stock}
                                                                />
                                                            </Grid>
                                                        </React.Fragment>
                                                    :
                                                    null
                                                        //)
                                                    //} 
                                                    
                                                )//}

                                                )}
                                                <Grid item md={8}>
                                                    <Typography align="right"
                                                        variant="h6"
                                                        children="Total:"
                                                        />
                                                </Grid>
                                                <Grid item md={2}>
                                                    <Typography variant="h6"
                                                        children={sumStock(compra.items)}
                                                        />
                                                </Grid>
                                                <Grid item md={2}>
                                                    <Typography variant="h6"
                                                        children={sumEmpStock(compra.items)}
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