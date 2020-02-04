import React, {useState} from 'react';

import {savePagoACuentaPorPagar} from '../api'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid, DialogActions, Button, TextField, MenuItem } from '@material-ui/core';


export default function PagarDialog({cuentas, ubicacion, isOpen, close, showMessage, saldoDisponible, subFromSaldo, fecha}) {
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const [values, setValues] = useState({
        cuentaPorPagar: '',
        tipoPago: 'EFECTIVO',
        importe: '',
        referencia: '',
    })

    const handleChange = (type, value) => {
        if(type === 'importe'){
            if(value > saldoDisponible){
                showMessage("El importe es mayor al Saldo disponible.", "error")
                setValues({...values, importe: ''})
                return false
            }
            if(value > values.cuentaPorPagar.saldo){
                showMessage("El importe es mayor al saldo de la cuenta.", "warning")
                setValues({...values, importe: ''})
                return false
            }

        }

        setValues({...values, [type]: value})
    }

    const handleClose = (dialog) => {
        setValues({...values, cuentaPorPagar: '', importe: '', referencia: ''})
        close(dialog)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        var pago = {
            ubicacion: ubicacion,
            cuenta: values.cuentaPorPagar,
            tipoPago: values.tipoPago,
            importe: values.importe,
            referencia: values.referencia,
            fecha: fecha
        }
        savePagoACuentaPorPagar(pago).then(res =>{
            showMessage(res.message, res.status)
            close('pagarDialog')
            subFromSaldo(pago.importe)
            setValues({
                cuentaPorPagar: '',
                tipoPago: 'EFECTIVO',
                importe: '',
            })
        })
    }

    return (
        
        <Dialog 
            fullWidth={true}
            maxWidth="sm" 
            open={isOpen} 
            onClose={() => handleClose('pagarDialog')} >

            <React.Fragment>
            <form onSubmit={handleSubmit}>
                
                <DialogTitle id="form-dialog-title">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Nuevo Pago en:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="flex-end">
                            <Typography variant="h6" >{ubicacion.nombre}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="cuentaPorPagar"
                                select
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                                label="Selecciona una Cuenta por Pagar"
                                value={values.cuentaPorPagar}
                                onChange={(e) => handleChange('cuentaPorPagar', e.target.value)}
                            >
                                {cuentas.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        <Grid container >
                                            <Grid item xs={6}>
                                                <Typography>{option.provedor.nombre} {option.folio}:{option.clave}</Typography>                                                
                                            </Grid>
                                            <Grid item xs={6}>
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
                    <Button onClick={() => handleClose('pagarDialog')} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Registrar
                    </Button>
                </DialogActions>
            </form>
            </React.Fragment>             
        </Dialog>
        
    );
}
