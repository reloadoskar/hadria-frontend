import React, {useEffect, useState} from 'react';

import {ticketPago} from '../api'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid, DialogActions, Button, TextField, MenuItem } from '@material-ui/core';
import { formatNumber } from '../Tools';
import useStyles from '../hooks/useStyles';


export default function PagarDialog({cuentas, pagar, ubicacion, isOpen, close, showMessage, saldoDisponible, subFromSaldo, fecha}) {
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const classes = useStyles()
    const [values, setValues] = useState({
        cuenta: '',
        tipoPago: 'EFECTIVO',
        importe: '',
        referencia: '',
    })
    const [subCuentas, setSubCuentas] = useState([])
    useEffect(()=> {
        if(cuentas){
            cuentas.forEach(cliente => {
                cliente.cuentas.forEach(c => {
                    var cts = subCuentas
                    var ncta = { 
                        _id: c._id,
                        nombre: cliente.nombre, 
                        provedor: cliente._id,
                        concepto: c.concepto +"-"+c.compra.folio+":"+c.compra.clave , 
                        saldo: c.saldo}
                    cts.push(ncta)
                    setSubCuentas( cts )  
                })
            })
        }
        return () => setSubCuentas([])
    }, [cuentas, subCuentas])

    const handleChange = (type, value) => {
        if(type === 'importe'){
            if(value > saldoDisponible){
                showMessage("El importe es mayor al Saldo disponible.", "error")
                setValues({...values, importe: 0})
                return false
            }
            if(value > values.cuenta.saldo){
                showMessage("El importe es mayor al saldo de la cuenta.", "warning")
                setValues({...values, importe: ''})
                return false
            }

        }
        setValues({...values, [type]: value})
    }

    const handleClose = (dialog) => {
        setValues({...values, cuenta: '', importe: '', referencia: ''})
        close(dialog)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        var pago = {
            ubicacion: ubicacion,
            cuenta: values.cuenta,
            tipoPago: values.tipoPago,
            importe: values.importe,
            referencia: values.referencia,
            fecha: fecha
        }
        close('pagarDialog')
        pagar(pago).then(res =>{
            showMessage(res.message, res.status)
            subFromSaldo(pago.importe)
            setValues({
                cuenta: '',
                tipoPago: 'EFECTIVO',
                importe: '',
            })
            ticketPago(pago).then(res => {
                if(res.status === 'warning'){
                    showMessage(res.message, res.status)
                }
            })
        })
    }

    return (
        
        <Dialog 
            fullWidth={true}
            maxWidth="sm" 
            open={isOpen} 
            onClose={() => handleClose('pagarDialog')} >
                {
                    cuentas.length > 0 &&
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
                                    select
                                    id="cuenta"
                                    variant="outlined"
                                    autoFocus
                                    required
                                    fullWidth
                                    label="Selecciona una Cuenta por Pagar"
                                    value={values.cuenta}
                                    onChange={(e) => handleChange('cuenta', e.target.value)}
                                >
                                    {subCuentas.map((cta) => {
                                        
                                                return (
                                                    <MenuItem key={cta._id} value={cta}>                                                
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <Typography>{cta.nombre} - {cta.concepto}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right">$ {formatNumber(cta.saldo)}</Typography>
                                                            </Grid>
                                                        </Grid>                           
                                                    </MenuItem>
                                                    ) 

                                    })} 
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
                                        disabled={values.compra !== null ? false : true}
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
                        <Button className={classes.botonSimplon} onClick={() => handleClose('pagarDialog')}>
                            Cancel
                        </Button>
                        <Button className={classes.botonGenerico} type="submit" disabled={values.importe !== 0 ? false : true}>
                            Registrar
                        </Button>
                    </DialogActions>
                </form>
                }

        </Dialog>
        
    );
}
