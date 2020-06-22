import React, {useState} from 'react';
import {saveVenta, ticketVenta, ticketSalida} from '../api'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid, DialogActions, Button, TextField, MenuItem } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import useClientes from '../hooks/useClientes'

function ReprintDialog(props) {
    const { open, cancel, ok } = props

    const handleCancel = () => {
        cancel()
       // return false
    }

    const handleOk = () => {
        ok()
        handleCancel()
        //return true
    }
    return (
        <Dialog
            disableBackdropClick
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

export default function PosCobrarDialog({ valuesToSave, isOpen, close, showMessage, addToSaldo, resetVenta }) {
    const {clientes} = useClientes()
    const [venta, setVenta] = useState(null)
    const [reprintDialog, setReprintDialog] = useState(false)
    const [loading, setLoading] = useState(true)

    const cancelReprint = () => {
        setReprintDialog(false)
        resetVenta()
    }

    const initialData = {
        cliente: '',
        tipoPago: 'CONTADO',
        efectivo: 0,
        cambio: 0,
        acuenta: 0,
        saldo: 0,
    }

    const [values, setValues] = useState(initialData)
    const tipos = ['CONTADO', 'CRÉDITO']

    const handleClose = (dialog) => {
        clearFields()
        close(dialog)
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
            case 'cliente':
                return setValues({...values, [type]: value, tipoPago: 'CONTADO', efectivo: valuesToSave.total, saldo: valuesToSave.total})
            case 'acuenta':
                let saldo = calculaSaldo(value, valuesToSave.total)
                return setValues({...values, [type]: value, saldo: saldo})
            case 'efectivo':
                if(value >= valuesToSave.total){
                    setLoading(false)
                }
                let cambio = calculaCambio(value, valuesToSave.total)
                return setValues({...values, [type]: value, cambio: cambio})
                
            default:
                return setValues({...values, [type]: value })
        }
    }

    const checkIfTipoPagoIsOk = (tipo, e) => {
        if(e === 'CONTADO'){
            handleChange(tipo, e)
        }else{
            if(valuesToSave.total > values.cliente.credito_disponible ){
                showMessage("El crédito disponible para: "+values.cliente.nombre+" no es suficiente.", 'warning')
                handleChange(tipo, 'CONTADO')
            }else{
                handleChange(tipo, e)
            }
        }
    }

    const clearFields = () => {
        setValues(initialData)
    }

    const updateCLientCredit = () => {
        let cliente = values.cliente

        cliente.credito_disponible -= values.saldo
        setValues({...values, cliente: cliente})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const venta = {
            ubicacion: valuesToSave.ubicacion,
            fecha: valuesToSave.fecha,
            cliente: values.cliente,
            tipoPago: values.tipoPago,
            total: valuesToSave.total,
            items: valuesToSave.itemsToSave,
            efectivo: values.efectivo,
            cambio: values.cambio,
            acuenta: values.acuenta,
            saldo: values.saldo,
        }
        setVenta(venta)
        saveVenta(venta)
            .then(res => {
                setVenta(res.venta)
                if(venta.tipoPago === 'CRÉDITO'){
                    updateCLientCredit()
                    addToSaldo(venta.acuenta)
                }else{
                    addToSaldo(venta.total)
                }
                showMessage(res.message, res.status)
                clearFields()
                ticketSalida(res.venta)
                ticketVenta(res.venta).then(res=> {
                    if(res.status === 'warning'){
                        showMessage(res.message, res.status)
                        resetVenta()
                    }else{
                        setReprintDialog(true)
                    }
                })
                // rePrintTicket()
                close('cobrarDialog')
                setLoading(true)
            })
    }

    // const rePrintTicket = () =>{
    //     setReprintDialog(true)
    // }

    const printTicket = () => {
        ticketVenta(venta)
        resetVenta()
    }

    const handleKeyPress = (e) => {
        if(e.key === "r" || e.key === "R"){
            
            handleSubmit(e)
        }
    }

    return (
        <React.Fragment>
        <Dialog 
            onKeyPress={(e) => handleKeyPress(e)}
            open={isOpen} onClose={() => handleClose('cobrarDialog')} aria-labelledby="form-dialog-title">

        {valuesToSave.itemsToSave.length > 0 && 
            <React.Fragment>
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">
                
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" >Cobrar</Typography>
                        </Grid>
                        <Grid item xs >
                            <Grid container justify="flex-end">
                                <Typography variant="h6"  >$ {valuesToSave.total}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="cliente"
                                select
                                variant="outlined"
                                autoFocus
                                required
                                fullWidth
                                label="Cliente"
                                value={values.cliente}
                                onChange={(e) => handleChange('cliente', e.target.value)}
                            >
                                {clientes.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        <Grid container >
                                            <Grid item xs={6}>
                                                {option.nombre}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container justify="flex-end">
                                                    {
                                                        option.credito_disponible >= valuesToSave.total 
                                                        ?
                                                            <Typography color="primary" >
                                                                <AssignmentTurnedInIcon />
                                                            </Typography>
                                                        :
                                                            <Typography color="secondary" >Crédito no disponible</Typography>
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                ))} 
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                id="tipoPago"
                                select
                                variant="outlined"
                                required
                                fullWidth
                                label="Tipo de pago"
                                value={values.tipoPago}
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
                        {values.tipoPago === 'CONTADO' ?
                        <React.Fragment>

                            <Grid item xs={12} md={4}>
                                <TextField 
                                    id="efectivo"
                                    variant="outlined"
                                    label="Efectivo"
                                    required
                                    fullWidth
                                    type="number"
                                    value={values.efectivo}
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
                                    value={values.cambio}
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
                                    value={values.acuenta}
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
                                    value={values.saldo}
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
                <DialogActions>
                    <Button onClick={() => handleClose('cobrarDialog')} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        Registrar (r)
                    </Button>
                </DialogActions>
            </form>
            </React.Fragment>    
        }         
        </Dialog>
        <ReprintDialog open={reprintDialog} cancel={cancelReprint} ok={printTicket} />
        </React.Fragment>
        
    );
}
