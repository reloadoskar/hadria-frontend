import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Card, CardHeader, Zoom, CardContent, Avatar, Grid, LinearProgress, Menu, MenuItem, Box, Divider } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import useStyles from '../hooks/useStyles'
import { getCompra, } from '../api'
import { 
    sumCantidad, 
    sumEmpaques, 
    sumImporte,
    sumStock,
    sumEmpStock,
    formatNumber, 
    calcCostoInventario, 
    calcVentasItem, 
    calcTotalPorCobrar, 
    calcComision } from '../Tools'
import moment from 'moment'

import ResumenProductos from './ResumenProductos'
import ResumenBig from './ResumenBig'
import ResumenVentas from './ResumenVentas'
import DetalleVentas from './DetalleVentas'
import DetalleGastos from './DetalleGastos'
import DetallePagos from './DetallePagos'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom in ref={ref} {...props} />;
});

export default function VerCompra({ compraId, isOpen, handleClose, cerrar }) {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const [data, setData] = useState({ compra: null, ventas: null })
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    useEffect(() => {
        if (compraId) {
            getCompra(compraId).then(res => {
                // console.log(res)
                setData({
                    compra: res.data.compra,
                    ventas: res.data.ventas,
                    ventasGroup: res.data.ventasGroup,
                    egresos: res.data.egresos,
                    cantComprado: sumCantidad(res.data.compra.items),
                    empComprado: sumEmpaques(res.data.compra.items),
                    cantVendido: sumCantidad(res.data.ventas),
                    empVendido: sumEmpaques(res.data.ventas),
                    totalVenta: sumImporte(res.data.ventas),
                    totalEgresos: sumImporte(res.data.egresos),
                    totalPagos: sumImporte(res.data.compra.pagos),
                    comision: calcComision(res.data.compra, res.data.ventas),
                    costoInventario: calcCostoInventario(res.data.compra.items),
                    porCobrar:  calcTotalPorCobrar(res.data.ventas)
                })
            })
        }
    }, [compraId])

    const closeDialog = () => {
        setData({compra: null, ventas: null})
        handleClose()
    }

    const showMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const handleClick = (action, compra) => {
        switch(action){
            case "cerrar":
                // closeCompra(compra).then( res => {
                    cerrar(compra).then(res => {
                    if(res.status === 'success'){
                        setAnchorEl(false)
                        enqueueSnackbar(res.message, {variant: res.status})

                        handleClose()
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

            {!data.compra || !data.ventas ?
                <LinearProgress variant="query"
                />
                :
                <React.Fragment>
                    <Box>
                    <AppBar className={classes.compraBar}>
                        <Toolbar >
                            <IconButton edge="start" onClick={handleClose}>
                                <CloseOutlinedIcon />
                            </IconButton>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography variant="h6">
                                        {data.compra.tipoCompra.tipo}:{data.compra.folio}:{data.compra.clave}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6" align="center">
                                        {data.compra.status}
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
                                    {data.compra.provedor.nombre.charAt(0)}
                                </Avatar>
                            }
                            title={data.compra.provedor.nombre}
                            subheader={"Llegó " + moment(data.compra.fecha).fromNow()}
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
                                        <MenuItem onClick={()=>handleClick('cerrar', data.compra._id)}>Cerrar</MenuItem>
                                        <MenuItem onClick={handleClick}>Guardar</MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleClick}>Simular</MenuItem>
                                    </Menu>
                                </div>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ResumenBig tipoCompra={data.compra.tipoCompra.tipo} data={data} formatNumber={formatNumber} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ResumenProductos 
                                        tipoCompra={data.compra.tipoCompra.tipo} 
                                        data={data} 
                                        calcVentasItem={calcVentasItem} 
                                        sumCantidad={sumCantidad} 
                                        sumEmpaques={sumEmpaques} 
                                        sumStock={sumStock} 
                                        sumEmpStock={sumEmpStock} 
                                        formatNumber={formatNumber} />                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <Box >
                                        <DetallePagos 
                                            pagos={data.compra.pagos}
                                            formatNumber={formatNumber}
                                            sumImporte={sumImporte}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <ResumenVentas 
                                        data={data.ventasGroup}
                                        sumImporte={sumImporte}
                                        sumEmpaques={sumEmpaques}
                                        sumCantidad={sumCantidad}
                                        formatNumber={formatNumber}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DetalleVentas 
                                        ventas = {data.ventas} 
                                        sumImporte={sumImporte}
                                        sumEmpaques={sumEmpaques}
                                        sumCantidad={sumCantidad}
                                        formatNumber={formatNumber}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DetalleGastos 
                                        gastos={data.egresos} 
                                        sumImporte={sumImporte}
                                        formatNumber={formatNumber}
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