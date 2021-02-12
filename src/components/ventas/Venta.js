import React from 'react'
// import BlockIcon from '@material-ui/icons/Block';
// import EditIcon from '@material-ui/icons/Edit';
// import ReceiptIcon from '@material-ui/icons/Receipt';
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
    // IconButton, 
} from '@material-ui/core';

import { 
    existCorte, 
    ticketVenta 
} from '../api'
import {formatNumber} from '../Tools'
const Venta = (props) => {
    const {open, close, venta, cancel} = props
    const classes = useStyles()
    const showMessage = props.showMessage
        
    const onDelete = (venta) => {
        existCorte(venta.ubicacion._id, venta.fecha).then(res => {
            if (res.corte.length > 0) {
                showMessage('No se puede eliminar la venta, el corte de caja esta CERRADO', 'error')
            }
            else {
                cancel(venta._id).then(res => {
                    close()
                    return showMessage(res.message, res.status)
                })
            }
        })
    }
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Venta</DialogTitle>
            <DialogContent>
                { !venta ? null :
                <Grid container spacing={2}>            
                    <Grid item xs={12}>
                        <Typography variant="h6">#{venta.folio} | {venta.cliente.nombre}</Typography>
                        <Typography>{venta.tipoPago} - {venta.fecha}</Typography>
                    </Grid>
                                
                    {/* <Grid item xs={12}>
                        <Typography align="right">SALDO:</Typography>
                        <Typography align="right">${formatNumber(venta.saldo,2)}</Typography>
                    </Grid> */}
                                
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
                        </Grid>
                            
                            
                            }

                            <Grid item xs={12}>
                                <Typography align="right">${formatNumber(venta.importe,2)}</Typography>
                            </Grid>

                            {venta.pagos.length === 0 ? null :
                                <Grid container spacing={2}>
                                    <Typography variant="h6" align="center" children="PAGOS:" />
                                    {
                                        venta.pagos.map((pago, i) => (
                                            <Grid container kay={i}>
                                                <Grid item xs={12}>
                                                    {pago.fecha} - {pago.ubicacion.nombre} - ${formatNumber(pago.importe,2)}
                                                </Grid>
                                            </Grid>
                                        ))
                                    }                                        
                                </Grid>
                            }
                        </Grid>                   
                    }
            </DialogContent>
            <DialogActions>
                <Button className={classes.botonMagico} onClick={()=>onDelete(venta)}>Eliminar</Button>
                <Button className={classes.botonGenerico} onClick={close}>salir</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Venta