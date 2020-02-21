import React, { useState } from 'react'
import { saveRetiro } from '../api'
import { Dialog, DialogTitle, Grid, Typography, DialogContent, DialogActions, Button, MenuItem, TextField } from '@material-ui/core';
import useUbicacions from '../hooks/useUbicacions';

export default function EgresoDialog({ ubicacion, fecha, isOpen, close, showMessage, subFromSaldo }) {
    const initialData = {
        descripcion: '',
        importe: 0,
        ubicacionReceptora: ''
    }
    const [values, setValues] = useState(initialData)
    const {ubicacions} = useUbicacions()

    const handleChange = (field, value) => {
        setValues({ ...values, [field]: value })
    }

    const handleClose = (dialog) => {
        clearFields()
        close(dialog)
    }

    const clearFields = () => {
        setValues(initialData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let retiro = {
            fecha: fecha,
            ubicacion: ubicacion,
            descripcion: values.descripcion,
            ubicacionReceptora: values.ubicacionReceptora,
            importe: values.importe,
        }

        saveRetiro(retiro).then(res => {
            showMessage(res.message, res.status)
            subFromSaldo(retiro.importe)
            clearFields()
            close('retiroDialog')
        })

    }
    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={isOpen}
            onClose={() => handleClose('retiroDialog')} >
            <DialogTitle id="form-dialog-retiro">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Retiro de caja:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="flex-end">
                            <Typography variant="h6" >{ubicacion.nombre}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                id="descripcion"
                                label="Descripción"
                                variant="outlined"
                                required
                                fullWidth
                                value={values.descripcion}
                                onChange={(e) => handleChange('descripcion', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                id="ubicacion"
                                label="Recibe:"
                                variant="outlined"
                                required
                                fullWidth
                                value={values.ubicacionReceptora}
                                onChange={(e) => handleChange('ubicacionReceptora', e.target.value)}
                            >
                                {ubicacions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option.nombre}
                                    </MenuItem>
                                ))} 
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="importe"
                                label="Importe"
                                variant="outlined"
                                type="number"
                                required
                                fullWidth
                                value={values.importe}
                                onChange={(e) => handleChange('importe', e.target.value)}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('retiroDialog')} color="secondary">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary" disabled={values.importe > 0 ? false : true}>Retirar</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}