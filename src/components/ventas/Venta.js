import React, {useState} from 'react'
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';
// import EditIcon from '@material-ui/icons/Edit';
import ReceiptIcon from '@material-ui/icons/Receipt';
import useStyles from '../hooks/useStyles'
import { 
    Dialog,
    DialogTitle,
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
    const {open, close, venta, edit, cancel} = props
    const classes = useStyles()
    const showMessage = props.showMessage
    const [confirm, setConfirm] = useState(false)

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
            <DialogTitle disableTypography>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6">Venta</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right">
                            <IconButton onClick={()=>rePrint(venta)}>
                                <ReceiptIcon />
                            </IconButton>
                            {venta.tipoPago === "CANCELADO" ? null :
                                <IconButton onClick={()=>openConfirm()}>
                                    <BlockIcon />
                                </IconButton>
                            }
                            <IconButton>
                                <CloseIcon onClick={close}/>
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent>
                { !venta ? null :
                <Grid container spacing={2}>            
                    <Grid item xs={12}>
                        <Typography>{venta.ubicacion.nombre}</Typography>
                        <Typography variant="h6">#{venta.folio} | {venta.cliente.nombre}</Typography>
                        <Typography>{venta.tipoPago} - {venta.fecha}</Typography>
                    </Grid>                                
                    {venta.items.length === 0 ? null :
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center" >Items:</Typography>
                            {venta.items.map((item, index) => (
                                <Grid container key={index}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>{item.producto.descripcion}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography align="right">
                                            {item.empaques}/{item.cantidad} x {item.precio}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography align="right" children={formatNumber(item.importe,2)} />
                                    </Grid>
                                    <Divider />
                                </Grid>
                            ))}
                            <Divider />
                            <Typography align="right">${formatNumber(venta.importe,2)}</Typography>
                        </Grid>                        
                    }

                    {venta.pagos.length === 0 ? null :
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center" children="Pagos:" />
                            {venta.pagos.map((pago, i) => (
                                <Grid container kay={i}>
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
                            <Typography align="right" >{formatNumber(sumImporte(venta.pagos),2)}</Typography>                                   
                        </Grid>                   
                    }

                    <Grid item xs={12}>
                        <Typography variant="h6" align="right">Saldo</Typography>
                        <Typography align="right">{formatNumber((venta.importe - sumImporte(venta.pagos)),2)}</Typography>
                    </Grid>
                </Grid>
                }
            </DialogContent>
            <DialogActions>
                <Button className={classes.botonSimplon} onClick={close}>salir</Button>
            </DialogActions>
            <ConfirmDialog open={confirm} close={closeConfirm} onConfirm={cancelarVenta}/>
        </Dialog>
    )
}

export default Venta