import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, ListItem, LinearProgress, 
    // IconButton 
} from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
import useCompras from '../hooks/useCompras';
import {sumStock, sumEmpStock, formatNumber} from '../Tools'
import VerCompra from './VerCompra'
import CrearCompra from '../compras/CrearCompra'
import { useSnackbar } from 'notistack';
export default function ComprasDash(){
    const {compras, addCompra, cerrar, updating} = useCompras();
    const [compraSelected, setCompraSelected] = useState(null)
    const [verCompra, setVerCompra] = React.useState(false);
    const [showDialog, setShowDialog] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const closeDialog = () => {
        setShowDialog(false)
    }
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

    // const openDialog = () => {
    //     setShowDialog(true)
    // }
    return (
        <Card>
            <CardHeader title="Compras" 
            />
            <CardContent>                
                {
                    compras === null ?
                        <LinearProgress variant="query" />
                    :

                    compras.length === 0 ?
                        <Typography variant="h6" align="center" gutterBottom>No hay Compras registradas.</Typography>
                    : 
                        // null
                        compras.map( (compra, index) => (
                            updating === true ?
                                <LinearProgress key={index} variant="query" />
                            :
                            <ListItem button key={index} onClick={()=> handleMenu('ver', compra._id)}>
                            <Grid key={index} container >
                                <Grid item xs={6} md={6}>
                                    <Typography variant="h5">{compra.folio + ":" +compra.clave}</Typography>
                                    <Typography variant="body2">{compra.ubicacion.nombre} | {compra.tipoCompra.tipo}</Typography>
                                </Grid>
                                <Grid item xs={6} md>
                                    <Typography align="right" children={compra.status} />
                                    <Typography variant="body2" align="right" children="Unidades / Empaques" />
                                    <Typography variant="h5" align="right" children={formatNumber(sumStock(compra.items),2) + " | " + formatNumber(sumEmpStock(compra.items))} />
                                </Grid>
                            </Grid>
                            </ListItem>
                        ))
                }
            </CardContent>
            <VerCompra compraId={compraSelected} isOpen={verCompra} handleClose={handleClose} cerrar={cerrar}/>
            <CrearCompra
                fullWidth
                open={showDialog}
                close={closeDialog}
                showMessage={showMessage}
                addCompra={addCompra}
            />
        </Card>
    )
}