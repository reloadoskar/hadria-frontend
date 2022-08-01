import React, {useEffect, useState} from 'react'
import { useSnackbar } from 'notistack';
import { 
    Dialog,
    DialogContent,
    Grid, 
    Typography,
    Divider,
    DialogActions,
    IconButton, 
    // IconButton, 
} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';
import PollIcon from '@material-ui/icons/Poll';
import ReceiptIcon from '@material-ui/icons/Receipt';
import useStyles from '../hooks/useStyles'
import ConfirmDialog from '../compras/ConfirmDialog';

import { 
    existCorte, 
    ticketVenta,
    cancelVenta
} from '../api'
import {formatNumber, 
    // sumImporte
} from '../Tools'
import { useAuth } from '../auth/use_auth';

const Venta = ({open, close, venta, cancel}) => {
    const classes = useStyles()
    const auth = useAuth()
    const user = auth.user
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const [confirm, setConfirm] = useState(false)
    const [ventaLocal, setVentaLocal] = useState(null)
    useEffect(() => {
        setVentaLocal(venta)
        return ()=>{
            setVentaLocal(null)
        }
    },[venta])
    function rePrint(venta){
        ticketVenta(venta).then(res=>{
            showMessage(res.message, res.status)
        })
    }

    function openConfirm(){
        setConfirm(true)
    }
    function closeConfirm(){
        setConfirm(false)
    }
    function cancelarVenta(){
        if(ventaLocal.pagos.length > 0 ){
            showMessage('No se puede eliminar la venta, hay PAGOS registrados.', 'error')
        }else{
            showMessage("Cancelando...", "info")
            existCorte(ventaLocal.ubicacion._id, ventaLocal.fecha).then(res => {
                if (res.corte.length > 0) {
                    showMessage('No se puede eliminar la venta, el corte de caja esta CERRADO', 'error')
                }
                else {                    
                    cancelVenta(venta._id).then(res =>{
                        if(res.status === "error"){
                            showMessage(res.message, res.status)
                        }
                        else{
                            close()
                            showMessage(res.message, res.status)
                        }
                    })
                }
            })
        }
    }
    return (
        <Dialog open={open} onClose={close}>
            {ventaLocal === null ? null :
            <React.Fragment>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center">{ventaLocal.ubicacion.nombre } | {ventaLocal.fecha || null}</Typography>
                            <Typography>{ventaLocal.tipoPago} </Typography>
                            <Typography variant="h6">#{ventaLocal.folio} | {ventaLocal.cliente.nombre}</Typography>
                        </Grid>                                
                        {ventaLocal.items.length === 0 ? null :
                            <Grid item xs={12}>
                                <Grid container >
                                    <Grid item xs={6}>
                                        <Typography className={classes.textoMiniFacheron}>producto</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography className={classes.textoMiniFacheron} align="right">empaques</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography className={classes.textoMiniFacheron} align="right">cantidad</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography className={classes.textoMiniFacheron} align="right">precio</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography className={classes.textoMiniFacheron} align="right">importe</Typography>
                                    </Grid>
                                </Grid>
                                {ventaLocal.items.map((item, index) => (
                                    <Grid container key={index}>
                                        <Grid item xs={6}>
                                            <Typography>#{item.compra.folio} - {item.compraItem.producto.descripcion} {item.compraItem.clasificacion}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography align="right">
                                                {item.empaques}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align="right">
                                                {item.cantidad}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography align="right" children={formatNumber(item.precio,2)} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align="right" children={formatNumber(item.importe,2)} />
                                        </Grid>
                                        <Divider />
                                    </Grid>
                                ))}
                                <Divider />
                                <Grid container>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={1}>
                                        <Typography align="right">{formatNumber(ventaLocal.empaques,1)}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography align="right">{formatNumber(ventaLocal.cantidad,2)}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography align="right">${formatNumber(ventaLocal.importe,2)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>                        
                        }                        

                    </Grid>
                {/* 
                        {ventaLocal.acuenta > 0 ?
                            <Grid item xs={12}>
                                <Typography className={classes.textoMiniFacheron} align="right">Deja a cuenta:</Typography>
                                <Typography align="right">{formatNumber(ventaLocal.acuenta,2)}</Typography>
                            </Grid>
                            :
                            null
                        }
                        {ventaLocal.pagos.length === 0 ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center" children="Pagos:" />
                                {ventaLocal.pagos.map((pago, i) => (
                                    <Grid container key={i}>
                                        <Grid item xs={4}>
                                            <Typography>{pago.fecha}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>{pago.ubicacion.nombre}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography align="right">${formatNumber(pago.importe,2)}</Typography>                                                    
                                        </Grid>
                                    </Grid>
                                ))}
                                <Divider />
                                <Typography align="right" >{formatNumber(sumImporte(ventaLocal.pagos),2)}</Typography>                                   
                            </Grid>                   
                        }
                        {ventaLocal.tipoPago === "CRÉDITO" ?
                            <Grid item xs={12}>
                                <Typography className={classes.textoMiniFacheron} align="right">Saldo</Typography>
                                <Typography align="right">{formatNumber((ventaLocal.importe - ventaLocal.acuenta - sumImporte(ventaLocal.pagos)),2)}</Typography>
                            </Grid>
                            :
                            null
                        }
                    </Grid>
                */}
                <ConfirmDialog open={confirm} close={closeConfirm} onConfirm={cancelarVenta}/> 
                </DialogContent>
                <DialogActions>
                    <Typography component="div" align="right">

                        <IconButton onClick={()=>rePrint(ventaLocal)}>
                            <ReceiptIcon />
                        </IconButton>
                        {user.level > 2 ? null :
                            ventaLocal.tipoPago === "CANCELADO" ? null :
                                <IconButton onClick={()=>openConfirm()}>
                                    <BlockIcon />
                                </IconButton>
                        }
                        <IconButton onClick={close}>
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                </DialogActions>
            </React.Fragment>
            }
        </Dialog>
    )
}

export default Venta