import React, { useState, useEffect } from 'react'

import {ticketCobranza} from '../api'

import { Dialog, DialogTitle, Grid, Typography, DialogContent, DialogActions, Button, TextField, MenuItem, Zoom } from '@material-ui/core';
import useStyles from '../hooks/useStyles';
import {formatNumber} from '../Tools'
const initialData = {
    // cliente: '',
    cuenta: '',
    importe: 0,
    referencia: '',
    tipoPago: 'EFECTIVO'
}
export default function CobroDialog(props) {
    const { ubicacion, isOpen, close, showMessage, fecha, cobrar } = props
    const [cuentas, setCuentas] = useState(null)
    useEffect(()=>{
        setCuentas(props.cuentas)
    }, [props.cuentas])
    const classes = useStyles()
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const [values, setValues] = useState(initialData)
    // const [reprint] = useState(true)
    const [guardando, setGuardando] = useState(false)

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
        setGuardando(true)
        e.preventDefault()
        var pago = {
            ubicacion: ubicacion._id[0]._id,
            cuenta: values.cuenta,
            tipoPago: values.tipoPago,
            importe: values.importe,
            referencia: values.referencia,
            fecha: fecha
        }
        console.log(pago)
        cobrar(pago).then(res =>{
            setGuardando(false)
            showMessage(res.message, res.status)
            //updateSaldoCuenta() FALTA
            // addToSaldo(pago.importe)
            setValues(initialData)
            ticketCobranza(pago).then(res=>{
                if(res.status === 'warning'){
                    showMessage(res.message, res.status)
                }else{
                    ticketCobranza(pago)
                }
                close('cobroDialog')
            })
        })
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={() => handleClose('cobroDialog')} >
                {cuentas === null ? null :
                    <React.Fragment>
                        <DialogTitle>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" >Cobranza en:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container justify="flex-end">
                                        <Typography variant="h6" >{ubicacion.nombre}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogTitle>

                        <form onSubmit={handleSubmit}>
                        { guardando === true ?
                            <Zoom in={guardando}>
                                <Typography variant="h5" align="center">Guardando...</Typography>
                            </Zoom>
                            :
                            <DialogContent>
                                <Grid container spacing={2}>
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
                                            {cuentas.map((cta, i) => (
                                                <MenuItem key={i} value={cta}>
                                                    <Grid container >
                                                        <Grid item xs={4}>
                                                            <Typography>{cta.venta.cliente.nombre}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography>#{cta.venta.folio}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography align="right">${formatNumber(cta.saldo)}</Typography>
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
                        }
                            <DialogActions>
                                <Button className={classes.botonSimplon} onClick={() => handleClose('cobroDialog')} >
                                    Cancel
                                </Button>
                                <Button className={classes.botonGenerico} type="submit" disabled={values.importe === 0 || guardando === true ? true : false}>
                                    Registrar
                                </Button>
                            </DialogActions>
                        </form>
                    </React.Fragment>
                }
        </Dialog>
    )
}