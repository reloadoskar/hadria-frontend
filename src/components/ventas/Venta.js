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
    // Table, 
    // TableHead, 
    // TableRow, 
    // TableCell, 
    // TableBody, 
    // Box, 
} from '@material-ui/core';

import { 
    cancelVenta, 
    // existCorte, 
    // ticketVenta 
} from '../api'
import {formatNumber} from '../Tools'
const Venta = (props) => {
    const {open, close} = props
    const classes = useStyles()
    const venta = props.data[0]
    const showMessage = props.showMessage

    // const handleClick = (action, venta) => {
    //     switch (action) {
    //         case 'edit':
    //             return showMessage('No disponoble por el momento', 'error')
    //         case 'delete':
    //             existCorte(venta.ubicacion._id, venta.fecha).then(res => {
    //                 if (res.corte.length > 0) {
    //                     showMessage('No se puede eliminar la venta, el corte de caja esta CERRADO', 'error')
    //                 }
    //                 else {
    //                     deleteVenta(venta._id).then(res => {
    //                         return showMessage(res.message, res.status)
    //                     })
    //                 }
    //             })
    //             break
    //         case 'reprint':
    //             return ticketVenta(venta)
    //         default:
    //             return null
    //     }
    // }

    const deleteVenta = (id) => {
        return cancelVenta(id)
    }
        
    const onDelete = (venta) => {
        close()
        deleteVenta(venta._id).then(res => {
            return showMessage(res.message, res.status)
        })  
    }
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Venta</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {
                        venta ?
                            <Grid container spacing={2}>
                                
                                <Grid item xs={12}>
                                    <Typography className={classes.sobreTexto}>{venta.tipoPago}</Typography>
                                    <Typography variant="h6">{venta.folio} | {venta.cliente.nombre}</Typography>
                                </Grid>
                                
                                {/* <Grid item xs={12}>
                                    <Typography align="right">SALDO:</Typography>
                                    <Typography align="right">${formatNumber(venta.saldo,2)}</Typography>
                                </Grid> */}
                                
                                {venta.items.length === 0 ?
                                    null
                                :
                                    <div>
                                        <Typography variant="h6" align="center" >Items:</Typography>
                                    {
                                        venta.items.map((item, index) => (
                                            <Grid container key={index}>
                                                <Grid item xs={12}>
                                                    <Typography>{item.producto.descripcion}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography align="right">
                                                        {item.empaques}/{item.cantidad} x {item.precio}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography align="right" children={formatNumber(item.importe,2)} />
                                                </Grid>
                                                <Divider />
                                            </Grid>
                                            ))                                                    
                                    }
                                    </div>

                                }

                                <Grid item xs={12}>
                                    <Typography align="right">${formatNumber(venta.importe,2)}</Typography>
                                </Grid>

                                {venta.pagos.length === 0 ?
                                    null
                                :
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
                        :
                            null                     

                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={classes.botonMagico} onClick={()=>onDelete(venta)}>Eliminar</Button>
                <Button className={classes.botonGenerico}>salir</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Venta