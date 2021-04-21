import React, { useState } from 'react'
import {ticketCobranza} from '../api'

import { Dialog, DialogTitle, Grid, Typography, DialogContent, DialogActions, Button, TextField, MenuItem, LinearProgress, Zoom } from '@material-ui/core';
import moment from 'moment'
import {sumSaldo, formatNumber} from '../Tools'
import useStyles from '../hooks/useStyles';

const init = {
    fecha: moment().format("YYYY-MM-DD"),
    ubicacion: '',
    cuenta: '',
    tipoPago: '',
    importe: 0,
    cambio: 0,
    referencia: 'PAGO EN CAJA',
}
export default function Cobro({ cuentas, ubicacions, open, close, showMessage, save }) {
    const classess = useStyles()
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const [cobro, setCobro] = useState(init)
    const [cobrando, setCobrando] = useState(false)
    // const [reprint] = useState(true)
    
    const clearFields = () => {
        setCobro(init)
    }

    const handleChange = (type, value) => {
        switch(type){
            case 'importe':
                if(value < 0){
                    return setCobro({ ...cobro, [type]: 0, cambio: 0 })
                }
                if (value > sumSaldo(cobro.cuenta.cuentas)) {
                    // showMessage("El importe es mayor al saldo de la cuenta.", "warning")
                    setCobro({ ...cobro, importe: value, cambio: value - sumSaldo(cobro.cuenta.cuentas) })
                    return false
                }else{
                    return setCobro({ ...cobro, [type]: value, cambio: 0 })
                }
            default:
                return setCobro({ ...cobro, [type]: value })

        }
         

    }

    const handleClose = (dialog) => {
        clearFields()
        close(dialog)
    }

    const handleSubmit = (e) => {
        setCobrando(true)
        e.preventDefault()
        var pago = {
            ubicacion: cobro.ubicacion,
            cuenta: cobro.cuenta,
            tipoPago: cobro.tipoPago,
            importe: cobro.importe - cobro.cambio,
            referencia: cobro.referencia,
            fecha: cobro.fecha
           
        }
        save(pago).then(res=>{
            showMessage(res.message, res.status)
            setCobro(init)
            ticketCobranza(pago)
            setCobrando(false)
            close('cobroDialog')
        })
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={open}
            onClose={() => handleClose('cobroDialog')} >
            <DialogTitle>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Cobrar</Typography>
                    </Grid>
                    
                </Grid>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                {
                    cobrando === true ? 
                        <Zoom in={cobrando}>
                            <Typography variant="h5" align="center">Cobrando...</Typography>
                        </Zoom>
                        :

                    <DialogContent>
                        {
                            cuentas === null ?
                                <LinearProgress variant="query" />
                                :
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
                                    value={cobro.cuenta}
                                    onChange={(e) => handleChange('cuenta', e.target.value)}
                                    >
                                    {cuentas.map((cliente, index) => {
                                        return cliente.cuentas.length > 0 ?
                                            <MenuItem key={index} value={cliente}>
                                                <Grid container >
                                                    <Grid item xs={6}>
                                                        <Typography>{cliente.nombre}</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Grid container justify="flex-end">
                                                            <Typography>${formatNumber(sumSaldo(cliente.cuentas))}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </MenuItem>
                                            :null
                                        }
                                    )}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="fecha"
                                    type="date"
                                    label="fecha"
                                    fullWidth
                                    value={cobro.fecha}
                                    onChange={(e) => handleChange('fecha', e.target.value)}
                                    />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="ubicacion"
                                    select
                                    variant="outlined"
                                    autoFocus
                                    required
                                    fullWidth
                                    label="Selecciona una Ubicación"
                                    value={cobro.ubicacion}
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
                                    id="tipoPago"
                                    select
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Tipo de pago"
                                    value={cobro.tipoPago}
                                    onChange={(e) => handleChange('tipoPago', e.target.value)}
                                    >
                                    {tipos.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {
                                cobro.cuenta !== '' ?
                                    <Grid item xs={12}>
                                        <TextField
                                            id="importe"
                                            variant="outlined"
                                            label="Importe"
                                            required
                                            fullWidth
                                            type="number"
                                            value={cobro.importe}
                                            onChange={(e) => handleChange('importe', e.target.value)}
                                            />
                                    </Grid>
                                : null
                            }            
                            {
                            cobro.cambio > 0 ?
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h6" children={"Cambio: " + formatNumber(cobro.cambio)} color="secondary" />
                                </Grid>
                                : null
                            }
                            {cobro.tipoPago !== 'EFECTIVO' &&
                                <Grid item xs={12}>
                                    <TextField
                                        id="referencia"
                                        label="referencia"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={cobro.referencia}
                                        onChange={(e) => handleChange('referencia', e.target.value)}
                                        />
                                </Grid>
                            }                        

                        </Grid>
                    }
                    </DialogContent>
                }
                <DialogActions>
                    <Button className={classess.botonSimplon} onClick={() => handleClose('cobroDialog')} >
                        Cancel
                    </Button>
                    <Button className={classess.botonGenerico} type="submit" disabled={cobro.importe > 0 && cobrando === false ? false : true}>
                        Registrar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}