import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Card, CardHeader, Zoom, CardContent, Avatar, Grid, LinearProgress, Menu, MenuItem, Box, Divider } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ResumenVentas from './ResumenVentas'
import DetalleGastos from './DetalleGastos'
import DetalleInsumos from './DetalleInsumos'
import Insumos from './Insumos'

import useStyles from '../hooks/useStyles'
import { getProduccion, closeProduccion } from '../api'
import { 
    sumCantidad, 
    sumEmpaques, 
    sumImporte,
    // sumStock,
    // sumEmpStock,
    // formatNumber, 
    calcCostoInventario, 
    // calcVentasItem, 
    calcTotalPorCobrar, 
    // calcComision 
} from '../Tools'

import moment from 'moment'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom in ref={ref} {...props} />;
});

export default function VerProduccion(props) {
    const {produccion, isOpen, handleClose} = props
    const [data, setData] = useState({
        produccion: null,
        insumos: null,
        inventario: null,
        ventas: null,
        egresos: null,
    })

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (produccion) {
            getProduccion(produccion).then(res => {
                // console.log(res)
                setData({
                    produccion: res.produccion,
                    insumos: res.produccion.insumos,
                    inventario: res.produccion.items,
                    ventas: res.produccion.ventas,
                    egresos: res.produccion.egresos,
                    cantProduccido: sumCantidad(res.produccion.items),
                    empProduccido: sumEmpaques(res.produccion.items),
                    cantVendido: sumCantidad(res.produccion.ventas),
                    empVendido: sumEmpaques(res.produccion.ventas),
                    totalVenta: sumImporte(res.produccion.ventas),
                    totalEgresos: sumImporte(res.produccion.egresos),
                    costoInventario: calcCostoInventario(res.produccion.items),
                    porCobrar: calcTotalPorCobrar(res.produccion.ventas)
                })
            })
        }
    }, [produccion])

    const closeDialog = () => {
        setData({produccion: null, ventas: null})
        handleClose()
    }

    const showMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const enviarMensaje = (mensaje, tipo) =>{
        enqueueSnackbar(mensaje, {variant: tipo})
    }

    const handleClick = (action, produccion) => {
        switch(action){
            case "cerrar":
                closeProduccion(produccion).then( res => {
                    if(res.status === 'success'){
                        enqueueSnackbar(res.message, {variant: res.status})
                    }else{
                        enqueueSnackbar(res.message, {variant: 'error'})
                    }
                })
            break
            default:
                enqueueSnackbar('No disponible en esta versión', {variant: 'error'})
            break
        }
    }
    return (
        <Dialog
            fullScreen
            scroll="body"
            open={isOpen}
            TransitionComponent={Transition}
            onClose={closeDialog}>

            {!data.produccion && !data.ventas ?
                <LinearProgress variant="query"
                />
                :
                <React.Fragment>
                    <Box>
                    <AppBar className={classes.produccionBar}>
                        <Toolbar >
                            <IconButton edge="start" onClick={handleClose}>
                                <CloseOutlinedIcon />
                            </IconButton>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography variant="h6">
                                        {data.produccion.folio}: {data.produccion.clave}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6" align="center">
                                        {data.produccion.status}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    </Box>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {data.produccion.clave.charAt(0)}
                                </Avatar>
                            }
                            title={data.produccion.clave}
                            subheader={"Creado el: " + moment(data.produccion.fecha).format("YYYY-MM-DD")}
                            action={
                                <div>
                                    <IconButton aria-label="Opciones" onClick={showMenu}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu 
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={closeMenu}
                                    >
                                        <MenuItem onClick={()=>handleClick('cerrar', data.produccion._id)}>Cerrar</MenuItem>
                                        <MenuItem onClick={handleClick}>Guardar</MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleClick}>Simular</MenuItem>
                                    </Menu>
                                </div>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={2}>

                                <Grid item xs={6} >
                                    <Insumos produccion={data.produccion} enviarMensaje={enviarMensaje}/>
                                </Grid>


                                <Grid item xs={12}>
                                    <DetalleInsumos />
                                </Grid>
                                <Grid item xs={12}>
                                                                       
                                </Grid>
                                <Grid item xs={12}>
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <ResumenVentas 
                                        data={data.ventas}

                                    />
                                </Grid>            
                                <Grid item xs={12}>
                                    <DetalleGastos 
                                        gastos={data.egresos} 

                                    />                                     
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </React.Fragment>
            }

        </Dialog>
    )
}