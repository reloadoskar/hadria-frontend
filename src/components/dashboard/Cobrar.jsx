import React, {useState} from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography, Zoom, MenuItem, DialogActions } from '@material-ui/core'
import moment from 'moment'
import {formatNumber} from '../Tools'
import useStyles from '../hooks/useStyles'
import {ticketCobranza} from '../api'
const init = {
    fecha: moment().format("YYYY-MM-DD"),
    ubicacion: '',
    cuenta: '',
    tipoPago: 'EFECTIVO',
    importe: 0,
    referencia: '',
}

export default function Cobrar({open, close, cuentas, ubicacions, showMessage, cobrar}){
    const [guardando, setGuardando] = useState(false)
    const [cobro, setCobro] = useState(init)
    const tipos = ['EFECTIVO', 'DEPÓSITO', 'TRANSFERENCIA', 'CODI']
    const classes = useStyles()
    const handleChange = (field, value) => { 
        switch(field){
            case 'importe': 
                if(value > cobro.cuenta.saldo){
                    setCobro({...cobro, [field]: cobro.cuenta.saldo, cambio: value- cobro.cuenta.saldo, efectivo: value})
                }else{
                    setCobro({...cobro, [field]: value, cambio: null, efectivo: null})
                }
                break
            default: setCobro({...cobro, [field]: value})
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setGuardando(true)
        cobrar(cobro).then(res => {
            showMessage(res.message, res.status)
            setGuardando(false)
            setCobro(init)
            ticketCobranza(cobro).then(res=>{
                if(res.status === 'warning'){
                    showMessage(res.message, res.status)
                }else{
                    ticketCobranza(cobro)
                }
                close('cobroDialog')
            })
            close()
        })
        .catch(err=>{
            setGuardando(false)
            showMessage("No se pudo guardar el cobro "+err, 'error')
        })
    }
    return(
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={open}
            onClose={() => close()} >
                <DialogTitle >
                    Cobranza
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    {guardando ?  
                        <Zoom in={guardando}>
                            <Typography variant="h5" align="center">Guardando...</Typography>
                        </Zoom>
                        :
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="ubicacion"
                                        select
                                        variant="outlined"
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

                                <Grid item xs={6}>
                                    {cobro.efectivo ? 
                                        <Typography>Efectivo: {cobro.efectivo }</Typography> : null}
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
                                    {cobro.cambio ?
                                        <Typography>Cambio: {cobro.cambio}</Typography>
                                     : null}
                                </Grid>

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
                        </DialogContent>
                    }
                    <DialogActions>
                        <Button className={classes.botonSimplon} onClick={() => close()} >
                            Cancel
                        </Button>
                        <Button className={classes.botonGenerico} type="submit" disabled={cobro.importe === 0 || guardando === true ? true : false}>
                            Registrar
                        </Button>
                    </DialogActions>
                </form>
        </Dialog>
    )
}