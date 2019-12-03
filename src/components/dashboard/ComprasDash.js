import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, ListItem } from '@material-ui/core';

import useCompras from '../hooks/useCompras';

import VerCompra from './VerCompra'
export default function ComprasDash(){
    const {compras} = useCompras();
    const [compraSelected, setCompraSelected] = useState(null)
    const [verCompra, setVerCompra] = React.useState(false);

    const handleClose = () => {
        setVerCompra(false)
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
                {compras.length === 0 ?
                        <Typography variant="h6" align="center" gutterBottom>No hay Compras registradas.</Typography>
                    : 
                        compras.map( (compra, index) => (
                            <ListItem button key={index} onClick={()=> handleMenu('ver', compra._id)}>
                            <Grid key={index} container >
                                <Grid item xs>
                                    <Typography children={compra.clave} />
                                </Grid>
                                <Grid item xs>
                                    <Typography children={compra.tipoCompra.tipo} />
                                </Grid>
                                <Grid item xs>
                                    <Typography children={compra.ubicacion.nombre} />
                                </Grid>
                                <Grid item xs>
                                    <Typography children={compra.status.nombre} />
                                </Grid>
                                
                            </Grid>
                            </ListItem>
                        ))
                }
            </CardContent>
            <VerCompra compraId={compraSelected} isOpen={verCompra} handleClose={handleClose}/>
        </Card>
    )
}