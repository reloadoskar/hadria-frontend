import React from 'react';

import { SnackbarProvider } from 'notistack';
import { Typography, Container, Grid, Card, CardHeader, CardContent, } from '@material-ui/core';

import useInventario from './hooks/useInventario';


function Inventario() {
    const {inventario} = useInventario([]);
    // const { isShowing, toggle } = useModal();

    return (
        
            <Container maxWidth="lg">
                <Typography variant="h4" children="Inventario" paragraph/>
                <Grid container spacing={3}>

                    {
                        inventario === null ?
                            null
                        :
                    
                        inventario.length === 0 ?
                        <Typography variant="h6" align="center" gutterBottom>No se encontró información.</Typography>
                    :
                        inventario.map( (compra, index) => (
                            <Grid item xs={12} key={index}>
                                <Card>
                                <CardHeader title={compra.clave} subheader={compra.ubicacion.nombre}/>
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
                                    {compra.items.map( (item, i) => {
                                        if(item.stock !== 0){
                                            return (
                                            <React.Fragment key={i}>
                                                <Grid item md={8}>
                                                    <Typography
                                                        children={item.producto.descripcion}
                                                        />
                                                </Grid>
                                                <Grid item  xs={2}>
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
                                            )

                                        }
                                        
                                    } )}
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