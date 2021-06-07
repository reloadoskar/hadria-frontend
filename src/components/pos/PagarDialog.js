import React, { useState} from 'react';

import {ticketPago} from '../api'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid, DialogActions, Button, TextField, MenuItem, Zoom } from '@material-ui/core';
import { formatNumber } from '../Tools';
import useStyles from '../hooks/useStyles';


export default function PagarDialog({cuentas, pagar, ubicacion, isOpen, close, showMessage, fecha}) {
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const classes = useStyles()
    const [values, setValues] = useState({
        provedor: '',
        cuenta: '',
        tipoPago: 'EFECTIVO',
        importe: '',
        referencia: '',
    })
    const [guardando, setGuardando] = useState(false)
    const handleChange = (type, value) => {
        switch(type){
            case 'importe':             
                if(value > values.cuenta.saldo){
                    showMessage("El importe es mayor al saldo de la cuenta.", "warning")
                    setValues({...values, importe: 0})
                    return false
                }else{
                    return setValues({...values, [type]: value})    
                }

            default:
                return setValues({...values, [type]: value})
        }        
    }

    const handleClose = (dialog) => {
        setValues({...values, cuenta: '', importe: '', referencia: ''})
        close(dialog)
    }



    const handleSubmit = (e) => {
        setGuardando(true)
        e.preventDefault()
        var pago = {
            provedor: values.provedor,
            ubicacion: ubicacion,
            cuenta: values.cuenta,
            tipoPago: values.tipoPago,
            importe: values.importe,
            referencia: values.referencia,
            fecha: fecha
        }
        pagar(pago).then(res =>{
            setGuardando(false)
            showMessage(res.message, res.status)
            setValues({
                provedor: '',
                cuenta: '',
                tipoPago: 'EFECTIVO',
                importe: '',
            })
            ticketPago(pago).then(res => {
                if(res.status === 'warning'){
                    showMessage(res.message, res.status)
                }
            })
            close('pagarDialog')
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
                    {
                        guardando === true ?
                            <Zoom in={guardando}>
                                <Typography variant="h5" align="center">Guardando...</Typography>
                            </Zoom>
                            :
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            id="provedor"
                                            variant="outlined"
                                            autoFocus
                                            required
                                            fullWidth
                                            label="Selecciona una Proveedor"
                                            value={values.provedor}
                                            onChange={(e) => handleChange('provedor', e.target.value)}
                                        >
                                            {cuentas.map((cta, i) => {
                                                if(cta.cuentas.length > 0){
                                                    return (
                                                        <MenuItem key={i} value={cta}>                                                
                                                            <Grid container>
                                                                <Grid item xs={6}>
                                                                    <Typography>{cta.nombre}</Typography>
                                                                </Grid>                                        
                                                            </Grid>                           
                                                        </MenuItem>
                                                    )
                                                }else{
                                                    return false
                                                }
                                            })} 
                                        </TextField>
                                    </Grid>
                                    {
                                    values.provedor !== '' ?
                                        <Grid item xs={12}>
                                            <TextField
                                                id="cuenta"
                                                label="Selecciona una cuenta"
                                                select
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={values.cuenta}
                                                onChange={(e) => handleChange('cuenta', e.target.value)}
                                            >
                                                {
                                                    values.provedor.cuentas.map((cta,index)=>(
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
                    }
                    <DialogActions>
                        <Button className={classes.botonSimplon} onClick={() => handleClose('pagarDialog')}>
                            Cancel
                        </Button>
                        <Button className={classes.botonGenerico} type="submit" disabled={values.importe === 0 || guardando === true ? true : false}>
                            Registrar
                        </Button>
                    </DialogActions>
                </form>
                }

        </Dialog>
        
    );
}
