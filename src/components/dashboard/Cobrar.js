import React, { useState } from 'react'

import {savePagoACuentaPorCobrar, ticketCobranza} from '../api'

import { Dialog, DialogTitle, Grid, Typography, DialogContent, DialogActions, Button, TextField, MenuItem } from '@material-ui/core';
import useUbicacions from '../hooks/useUbicacions'
const initialData = {
    cliente: '',
    ubicacion: '',
    cuenta: '',
    importe: 0,
    referencia: '',
    tipoPago: 'EFECTIVO'
}
export default function Cobrar({ cuentas=[], isOpen=false, close, showMessage, addToSaldo }) {
    
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const {ubicacions} = useUbicacions()
    const [values, setValues] = useState(initialData)
    const [reprint] = useState(true)
    
    const clearFields = () => {
        setValues(initialData)
    }

    const handleChange = (type, value) => {
        if (type === 'importe') {
            if (value > values.cuenta.saldo) {
                showMessage("El importe es mayor al saldo de la cuenta.", "warning")
                setValues({ ...values, importe: '' })
                return false
            }
        }

        setValues({ ...values, [type]: value })
    }

    const handleClose = (dialog) => {
        clearFields()
        close(dialog)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("enviando...")
        var pago = {
            ubicacion: values.ubicacion,
            cuenta: values.cuenta,
            tipoPago: values.tipoPago,
            importe: values.importe,
            referencia: values.referencia,
           
        }
        savePagoACuentaPorCobrar(pago).then(res =>{
            showMessage(res.message, res.status)
            close('cobroDialog')
            //updateSaldoCuenta() FALTA
            addToSaldo(pago.importe)
            clearFields()
            ticketCobranza(pago)
            if(reprint){
                ticketCobranza(pago)
            }
        })
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={() => handleClose('cobroDialog')} >
            <DialogTitle>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Cobrar</Typography>
                    </Grid>
                    
                </Grid>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="ubicacion"
                                select
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                                label="Selecciona una Ubicación"
                                value={values.ubicacion}
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
                                id="cuenta"
                                select
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                                label="Selecciona una Cuenta por Cobrar"
                                value={values.cuenta}
                                onChange={(e) => handleChange('cuenta', e.target.value)}
                            >
                                {cuentas.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        <Grid container >
                                            <Grid item xs={4}>
                                                <Typography>{option.cliente.nombre}</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography color="textSecondary">{option.fecha}</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Grid container justify="flex-end">
                                                    <Typography>${option.saldo}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="tipoPago"
                                select
                                variant="outlined"
                                required
                                fullWidth
                                label="Tipo de pago"
                                value={values.tipoPago}
                                onChange={(e) => handleChange('tipoPago', e.target.value)}
                            >
                                {tipos.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="importe"
                                variant="outlined"
                                label="Importe"
                                required
                                fullWidth
                                type="number"
                                value={values.importe}
                                onChange={(e) => handleChange('importe', e.target.value)}
                            />
                        </Grid>
                        {values.tipoPago !== 'EFECTIVO' &&
                            <Grid item xs={12}>
                                <TextField
                                    id="referencia"
                                    label="referencia"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={values.referencia}
                                    onChange={(e) => handleChange('referencia', e.target.value)}
                                />
                            </Grid>
                        }

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('cobroDialog')} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={values.importe > 0 ? false : true}>
                        Registrar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}