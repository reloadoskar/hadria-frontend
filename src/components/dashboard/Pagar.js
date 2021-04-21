import React, { useState} from 'react';
import {ticketPago} from '../api'
import { formatNumber} from '../Tools'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid, DialogActions, Button, TextField, MenuItem, Zoom } from '@material-ui/core';

import moment from 'moment'
import useStyles from '../hooks/useStyles';

const init = {
    fecha: moment().format("YYYY-MM-DD"),
    ubicacion: '',
    provedor: '',
    cuentaPorPagar: '',
    tipoPago: 'EFECTIVO',
    importe: 0,
    referencia: '',
}
export default function Pagar({ubicacions=[], cuentas, open, close, showMessage, disponible, save }) {
    const classess = useStyles()
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const [pago, setPago] = useState(init)
    const [pagando, setPagando] = useState(false)

    const handleChange = (type, value) => {
        switch(type){
            case 'importe':
            //     if(value > disponible){
            //         showMessage("El importe es mayor al Saldo disponible.", "error")
            //         setPago({...pago, importe: 0})
            //         return false
            //     }
                if(value > pago.cuentaPorPagar.saldo){
                    showMessage("El importe es mayor al saldo de la cuenta.", "warning")
                    return setPago({...pago, importe: 0})
            //         return false
                }else{
                    return setPago({...pago, importe: value})
                }
            case 'provedor':
                return setPago({...pago, provedor: value})
            default:
                setPago({...pago, [type]: value})
        }
    }

    const handleClose = (dialog) => {
        setPago(init)
        close(dialog)
    }



    const handleSubmit = (e) => {
        setPagando(true)
        e.preventDefault()
        var npago = {
            ubicacion: pago.ubicacion,
            provedor: pago.provedor,
            cuenta: pago.cuentaPorPagar,
            tipoPago: pago.tipoPago,
            importe: pago.importe,
            referencia: pago.referencia,
            fecha: pago.fecha
        }
        save(npago).then(res =>{
            showMessage(res.message, res.status)
            setPago(init)
            setPagando(false)
            //subFromSaldo(pago.importe)
            ticketPago(pago)
            close('pagarDialog')
        })
    }

    return (
        
        <Dialog 
            fullWidth={true}
            maxWidth="sm" 
            open={open} 
            onClose={() => handleClose('pagarDialog')} >

            <React.Fragment>
            <form onSubmit={handleSubmit}>
                
                <DialogTitle id="form-dialog-title">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Pagar</Typography>
                    </Grid>
                </Grid>
                </DialogTitle>

                {pagando === true ? 
                    <Zoom in={pagando}>
                        <DialogContent>
                            <Typography variant = "h5" align="center">Pagando...</Typography>
                        </DialogContent>
                    </Zoom>
                    :
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="provedor"
                                    select
                                    variant="outlined"
                                    autoFocus
                                    required
                                    fullWidth
                                    label="Selecciona un Proveedor"
                                    value={pago.provedor}
                                    onChange={(e) => handleChange('provedor', e.target.value)}
                                >
                                    {cuentas.map((provedor, index) => (
                                            
                                        <MenuItem key={index} value={provedor}>
                                            <Grid container >
                                                <Grid item xs={12}>
                                                    <Typography>{provedor.nombre}</Typography>
                                                </Grid>
                                            </Grid>
                                        </MenuItem>

                                    ))} 
                                </TextField>
                            </Grid>
                            {
                                pago.provedor !== '' ?
                                    <Grid item xs={12}>
                                        <TextField
                                            id="cuentaPorPagar"
                                            label="Selecciona una cuenta"
                                            select
                                            variant="outlined"
                                            required
                                            fullWidth
                                            value={pago.cuentaPorPagar}
                                            onChange={(e) => handleChange('cuentaPorPagar', e.target.value)}
                                        >
                                            {
                                                pago.provedor.cuentas.map((cta,index)=>(
                                                    <MenuItem key={index} value={cta}>
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                <Typography>{cta.concepto} {cta.compra.folio}:{cta.compra.clave}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right">{formatNumber(cta.saldo)}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                : null
                            }

                            {
                                pago.cuentaPorPagar !== '' ?
                                    <React.Fragment>
                                        <Grid item xs={12}>
                                <TextField
                                    id="ubicacion"
                                    select
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Selecciona una Ubicación"
                                    value={pago.ubicacion}
                                    onChange={(e) => handleChange('ubicacion', e.target.value)}
                                >
                                    {ubicacions.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>

                                <TextField
                                    id="fecha"
                                    type="date"
                                    label="fecha"
                                    fullWidth
                                    value={pago.fecha}
                                    onChange={(e) => handleChange('fecha', e.target.value)}
                                />

                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    id="tipoPago"
                                    select
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Tipo de pago"
                                    value={pago.tipoPago}
                                    onChange={(e) => handleChange('tipoPago', e.target.value)}
                                >
                                    {tipos.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))} 
                                </TextField>
                            </Grid>



                                <Grid item xs={12}>
                                    <TextField 
                                        id="importe"
                                        variant="outlined"
                                        label="Importe"
                                        required
                                        fullWidth
                                        type="number"
                                        value={pago.importe}
                                        onChange={(e) => handleChange('importe', e.target.value)}
                                        />
                                </Grid>
                                {pago.tipoPago !== 'EFECTIVO' &&
                                    <Grid item xs={12}>
                                        <TextField 
                                            id="referencia"
                                            label="referencia"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            value={pago.referencia}
                                            onChange={(e) => handleChange('referencia', e.target.value)}
                                            />
                                    </Grid>
                                }
                                    </React.Fragment>
                                : null
                            }
                        </Grid>
                    </DialogContent>
                }
                    <DialogActions>
                        <Button className={classess.botonSimplon} onClick={() => handleClose('pagarDialog')} >
                            Cancel
                        </Button>
                        <Button className={classess.botonGenerico} type="submit" disabled={pago.importe > 0 && pagando === false ? false : true}>
                            Registrar
                        </Button>
                    </DialogActions>

            </form>
            </React.Fragment>             
        </Dialog>
        
    );
}
