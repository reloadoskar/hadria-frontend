import React, {useEffect, useState} from 'react'
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';
// import EditIcon from '@material-ui/icons/Edit';
import ReceiptIcon from '@material-ui/icons/Receipt';
import useStyles from '../hooks/useStyles'
import { 
    Dialog,
    DialogContent,
    Grid, 
    Typography,
    Divider,
    DialogActions,
    Button,
    IconButton, 
    // IconButton, 
} from '@material-ui/core';

import { 
    existCorte, 
    ticketVenta 
} from '../api'
import {formatNumber, sumImporte} from '../Tools'
import ConfirmDialog from '../compras/ConfirmDialog';
const Venta = (props) => {
    const {open, close, venta, cancel} = props
    const classes = useStyles()
    const showMessage = props.showMessage
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
        if(venta.pagos.length > 0 ){
            showMessage('No se puede eliminar la venta, hay PAGOS registrados.', 'error')
        }else{
            close()
            showMessage("Cancelando...", "info")
            existCorte(venta.ubicacion._id, venta.fecha).then(res => {
                if (res.corte.length > 0) {
                    showMessage('No se puede eliminar la venta, el corte de caja esta CERRADO', 'error')
                }
                else {
                    
                    cancel(venta._id).then(res => {
                        if(res.status === "error"){
                            showMessage(res.message, res.status)
                        }
                        else{
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
                            <Typography align="center">{ventaLocal.ubicacion.nombre} | {ventaLocal.fecha}</Typography>
                            <Typography>{ventaLocal.tipoPago} </Typography>
                            <Typography variant="h6">#{ventaLocal.folio} | {ventaLocal.cliente.nombre}</Typography>
                        </Grid>                                
                        {ventaLocal.items.length === 0 ? null :
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center" >Items:</Typography>
                                {ventaLocal.items.map((item, index) => (
                                    <Grid container key={index}>
                                        <Grid item xs={12} sm={8}>
                                            <Typography>{item.producto.descripcion}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Typography align="right">
                                                {item.empaques}/{item.cantidad} x {item.precio}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Typography align="right" children={formatNumber(item.importe,2)} />
                                        </Grid>
                                        <Divider />
                                    </Grid>
                                ))}
                                <Divider />
                                <Typography align="right">${formatNumber(ventaLocal.importe,2)}</Typography>
                            </Grid>                        
                        }                        
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
                </DialogContent>
                <DialogActions>
                    <Typography component="div" align="right">
                        <IconButton onClick={()=>rePrint(ventaLocal)}>
                            <ReceiptIcon />
                        </IconButton>
                        {ventaLocal.tipoPago === "CANCELADO" ? null :
                            <IconButton onClick={()=>openConfirm()}>
                                <BlockIcon />
                            </IconButton>
                        }
                        <IconButton onClick={close}>
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                </DialogActions>
                <ConfirmDialog open={confirm} close={closeConfirm} onConfirm={cancelarVenta}/>
            </React.Fragment>
            }
        </Dialog>
    )
}

export default Venta