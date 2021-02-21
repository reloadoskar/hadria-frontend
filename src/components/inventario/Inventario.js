import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Divider, Typography, Container, Grid, Card, CardHeader, CardContent, LinearProgress, Button, TextField, MenuItem } from '@material-ui/core';

import useInventario from '../hooks/useInventario';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {sumStock, sumEmpStock, formatNumber} from "../Tools"
import useStyles from '../hooks/useStyles'
import {ticketInventario} from "../api"
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Mover from './Mover'
import useUbicacions from '../hooks/useUbicacions';
function Inventario() {
    const classes = useStyles()
    const select = ["FOLIO","PRODUCTOR","UBICACION"]
    const { enqueueSnackbar } = useSnackbar()
    const { invxubic, inventario, mover } = useInventario()
    const {ubicacions } = useUbicacions()
    const [orderBy, setOrderby] = useState('FOLIO')
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

    const [moverDialog, setMoverDialog] = useState(false)
    const handleChange = (value) =>{
        setOrderby(value)
    }
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
    const openMoverDialog = () => {
        setMoverDialog(true)
    }
    const closeMoverDialog = () =>{
        setMoverDialog(false)
    }
    return (

        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4" children="Inventario" paragraph />
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <TextField
                    disabled
                    select
                    fullWidth
                    id="orderBy"
                    label="Ordenar por:"
                    value={orderBy}
                    onChange={(e) => handleChange(e.target.value)}
                    >
                        {select.map((opt, i) => (
                            <MenuItem key={i} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button 
                                className={classes.botonGenerico}
                                endIcon={<CompareArrowsIcon />}
                                onClick={openMoverDialog}
                                fullWidth
                                >
                                Mover
                            </Button>
                            <Mover
                                open={moverDialog} 
                                close={closeMoverDialog}
                                inventario={invxubic} 
                                ubicacions={ubicacions}
                                mover={mover}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                className={classes.botonGenerico}
                                onClick={() => handleClick(inventario)}
                                endIcon={<ReceiptIcon />}
                            >
                                Imprimir
                            </Button>                    
                        </Grid>
                    </Grid>
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
                                sumStock(compra.items) === 0 ? null :
                                <Grid item xs={12} key={index}>
                                    <Card>
                                        <CardHeader 
                                        title={compra.folio+ " | " +compra.clave}  
                                        />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                {compra.items.map((item, i) => (
                                                    item.stock === 0 ? null : 
                                                        <Grid item xs={12} key={i}>
                                                            <Grid container spacing={1} alignItems="flex-end">
                                                                <Grid item xs={12}>
                                                                    <Typography 
                                                                        variant="h6"
                                                                        children={item.ubicacion.nombre}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <Typography
                                                                        children={item.producto.descripcion}
                                                                        />
                                                                </Grid>
                                                                <Grid item xs={6} md={3}>
                                                                    <Typography
                                                                        align="right"
                                                                        className={classes.sobreTexto}
                                                                        children={item.producto.empaque.abr}
                                                                        />
                                                                    <Typography
                                                                        align="right"                                                                        
                                                                        children={formatNumber(item.empaquesStock,1)}
                                                                        />
                                                                </Grid>
                                                                <Grid item xs={6} md={3}>
                                                                <Typography
                                                                        align="right"
                                                                        className={classes.sobreTexto}
                                                                        children={item.producto.unidad.abr}
                                                                        />
                                                                    <Typography
                                                                        align="right"
                                                                        children={formatNumber(item.stock,1)}
                                                                        />
                                                                </Grid>
                                                            </Grid>
                                                            <Divider />
                                                        </Grid>                                                    
                                                ))}
                                                <Grid item xs={12} md={6}>
                                                    <Typography align="center"
                                                        variant="h6"
                                                        children="Total"
                                                        />
                                                </Grid>
                                                <Grid item xs={6} md={3}>
                                                    <Typography className={classes.sobreTexto} variant="body2" align="right" children="Empaques" />
                                                    <Typography variant="h6"
                                                        align="right"
                                                        children={formatNumber(sumEmpStock(compra.items),1)}
                                                        />
                                                </Grid>
                                                <Grid item xs={6} md={3}>
                                                    <Typography className={classes.sobreTexto} variant="body2" align="right" children="Cantidad" />
                                                    <Typography variant="h6"
                                                        align="right"
                                                        children={formatNumber(sumStock(compra.items),1)}
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