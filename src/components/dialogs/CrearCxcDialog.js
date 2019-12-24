import React, { useState } from 'react'
import moment from 'moment'
import {createCuentaPorCobrar} from '../api'
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogTitle, Grid, Typography, DialogContent, DialogActions, Button, TextField, MenuItem, IconButton } from '@material-ui/core';
import useClientes from '../hooks/useClientes'

import {
    DatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import MomentUtils from '@date-io/moment';
import "moment/locale/es";
const initialData = {
    open: false,
    ubicacion: '',
    cliente: '',
    importe: 0,
    referencia: '',
    fecha: ''
}
export default function CrearCxcDialog() {
    const {clientes} = useClientes()
    const [values, setValues] = useState(initialData)
    const [locale] = useState("es")
    const clearFields = () => {
        setValues(initialData)
    }

    const handleChange = (type, value) => {
        setValues({ ...values, [type]: value })
    }

    const handleClose = () => {
        clearFields()
        setValues({open: false})
    }

    const openDialog = () => {
        setValues({open: true})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("enviando...")
        var cuenta = {
            ubicacion: values.ubicacion,
            cliente: values.cliente,
            importe: values.importe,
            referencia: values.referencia,
            fecha: values.fecha
        }
        createCuentaPorCobrar(cuenta).then(res =>{
            // showMessage(res.message, res.status)
            handleClose()
            // clearFields()
        })
    }

    return (
        <React.Fragment>
            <IconButton onClick={(e) => openDialog()}>
                <AddIcon />
            </IconButton>
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={values.open}
            onClose={() => handleClose('cobroDialog')} >
            <DialogTitle>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Crear Cuenta por Cobrar:</Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
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
                                label="Selecciona una Cliente"
                                value={values.cliente}
                                onChange={(e) => handleChange('cliente', e.target.value)}
                            >
                                {clientes.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
                                <DatePicker
                                    value={values.fecha}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined" 
                                    format="DD/MM/YYYY"
                                    onChange={e => handleChange('fecha', e)}
                                />
                            </MuiPickersUtilsProvider>
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
        </React.Fragment>
    )
}