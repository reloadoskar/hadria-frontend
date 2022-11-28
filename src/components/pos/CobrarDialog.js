import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid, DialogActions, Button, TextField, MenuItem, Zoom } from '@material-ui/core';
import useStyles from '../hooks/useStyles';

function ReprintDialog(props) {
    const { open, cancel, ok } = props

    const handleCancel = () => {
        cancel()
    }

    const handleOk = () => {
        ok()
        handleCancel()
    }
    return (
        <Dialog
            disableEscapeKeyDown
            maxWidth="xs"
            open={open}>
        
            <DialogTitle>Ticket</DialogTitle>
            <DialogContent>
                <Typography align="center"> ¿Desea imprimir copia del ticket? </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default function CobrarDialog({ open, total, close, guardarVenta, cliente, showMessage, guardando }) {
    const classes = useStyles()

    const [tipoPago, setTipoPago] = useState("CONTADO")
    const [efectivo, setEfectivo] = useState(total)
    const [cambio, setCambio] = useState(0)
    const [acuenta, setAcuenta] = useState(0)
    const [saldo, setSaldo] = useState(0)
    const [reprintDialog, setReprintDialog] = useState(false)
    
    useEffect(() => {
        if(total>0){
            setEfectivo(total)
        }
        
    },[total])

    const cancelReprint = () => {
        setReprintDialog(false)
    }

    const tipos = ['CONTADO', 'CRÉDITO']

    const handleClose = (dialog) => {
        clearFields()
        close()
    }

    const calculaCambio = (efe, total) => {
        if(efe >= total){
            return efe - total 
        }
    }
    
    const calculaSaldo = (acuenta, total) => {
        if(acuenta < total){
            return total - acuenta
        }
    }

    const handleChange = (type, value) => {
        switch(type){
            case 'acuenta':
                let saldo = calculaSaldo(value, total)
                setAcuenta(value)
                setSaldo(saldo)
                break
            case 'efectivo':
                if(value >= total){
                    let cambio = calculaCambio(value, total)
                    setCambio(cambio)
                }
                setEfectivo(value)
                break
                
            default:
                
        }
    }

    const checkIfTipoPagoIsOk = (tipo, e) => {
        if(e === 'CONTADO'){
            setTipoPago(e)
        }else{
            if(total > cliente.credito_disponible ){
                let diferencia = (cliente.credito_disponible - total) * -1
                showMessage("El crédito disponible para: "+cliente.nombre+" no es suficiente. Tendrá que dejar a cuenta: "+diferencia, 'warning')
                setTipoPago(e)
                handleChange('acuenta', (cliente.credito_disponible - total) * -1)
            }else{
                setSaldo(total)
                setTipoPago(e)
            }
        }
    }

    const clearFields = () => {
        setTipoPago("CONTADO")
        setEfectivo(0)
        setCambio(0)
        setAcuenta(0)
        setSaldo(0)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()      
        let venta = {
            tipoPago: tipoPago,
            efectivo: efectivo,
            cambio: cambio,
            acuenta: acuenta,
            saldo: saldo,
        }
        guardarVenta(venta)
        
    }

    return (
        <React.Fragment>
        <Dialog 
            fullWidth
            maxWidth="sm"
            open={open} onClose={() => handleClose('cobrarDialog')} aria-labelledby="form-dialog-title">

            <React.Fragment>
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">
                
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Cobrar</Typography>
                        </Grid>
                        <Grid item xs >
                            <Grid container justifyContent="flex-end">
                                <Typography variant="h6"  >$ {total}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogTitle>
                {
                    guardando === true ?
                        <Zoom in={guardando}>
                            <Typography variant="h6" align="center">Guardando...</Typography>
                        </Zoom>
                    :
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        id="tipoPago"
                                        select
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Tipo de pago"
                                        value={tipoPago}
                                        // onChange={(e) => handleChange('tipoPago', e.target.value)}
                                        onChange={(e) => checkIfTipoPagoIsOk('tipoPago', e.target.value)}
                                    >
                                        {tipos.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))} 
                                    </TextField>
                                </Grid>
                                {tipoPago === 'CONTADO' ?
                                <React.Fragment>

                                    <Grid item xs={12} md={4}>
                                        <TextField 
                                            id="efectivo"
                                            variant="outlined"
                                            label="Efectivo"
                                            required
                                            fullWidth
                                            autoFocus
                                            type="number"
                                            value={efectivo}
                                            onChange={(e) => handleChange('efectivo', e.target.value)}
                                            />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField 
                                            id="cambio"
                                            variant="outlined"
                                            label="Cambio"
                                            required
                                            type="number"
                                            fullWidth
                                            value={cambio}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            onChange={(e) => handleChange('cambio', e.target.value)}
                                            />
                                    </Grid>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    
                                    <Grid item xs={12} md={4}>
                                        <TextField 
                                            id="acuenta"
                                            variant="outlined"
                                            label="A cuenta"
                                            required
                                            fullWidth
                                            type="number"
                                            value={acuenta}
                                            onChange={(e) => handleChange('acuenta', e.target.value)}
                                            />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                    <TextField 
                                            id="saldo"
                                            variant="outlined"
                                            label="Saldo"
                                            required
                                            type="number"
                                            fullWidth
                                            value={saldo}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            onChange={(e) => handleChange('saldo', e.target.value)}
                                            />
                                    </Grid>

                                </React.Fragment>
                                }
                            </Grid>
                        </DialogContent>
                }
                <DialogActions>
                    <Button className={classes.botonSimplon} onClick={() => handleClose('cobrarDialog')} >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        className={ guardando ? classes.botonGenerico : classes.botonCosmico} 
                        disabled={guardando ? true : false}>
                        { guardando ? "Espere..." : "Registrar"}
                    </Button>
                </DialogActions>
            </form>
            </React.Fragment>    
        </Dialog>
        <ReprintDialog open={reprintDialog} cancel={cancelReprint} 
            // ok={printTicket} 
        />
        </React.Fragment>
    )
}
