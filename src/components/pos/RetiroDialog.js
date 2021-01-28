import React, { useState } from 'react'
import { saveRetiro } from '../api'
import { Dialog, DialogTitle, Grid, Typography, DialogContent, DialogActions, Button, MenuItem, TextField, Zoom } from '@material-ui/core';
import useUbicacions from '../hooks/useUbicacions';
import useStyles from '../hooks/useStyles';

export default function EgresoDialog({ ubicacion, fecha, isOpen, close, showMessage, subFromSaldo }) {
    const classess = useStyles()
    const initialData = {
        descripcion: '',
        importe: 0,
        ubicacionReceptora: ''
    }
    const [values, setValues] = useState(initialData)
    const {ubicacions} = useUbicacions()
    const [guardando, setGuardando] = useState(false)

    const handleChange = (field, value) => {
        switch(field){
            case 'descripcion':
                return setValues({ ...values, [field]: value.toUpperCase()})
            default:
                return setValues({ ...values, [field]: value })
        }
    }

    const handleClose = (dialog) => {
        clearFields()
        close(dialog)
    }

    const clearFields = () => {
        setValues(initialData)
    }

    const handleSubmit = (e) => {
        setGuardando(true)
        e.preventDefault()
        let retiro = {
            fecha: fecha,
            ubicacion: ubicacion,
            descripcion: values.descripcion,
            ubicacionReceptora: values.ubicacionReceptora,
            importe: values.importe,
        }

        saveRetiro(retiro).then(res => {
            setGuardando(false)
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
            }
                <DialogActions>
                    <Button className={classess.botonSimplon} onClick={() => handleClose('retiroDialog')} >Cancelar</Button>
                    <Button className={classess.botonGenerico} type="submit" disabled={values.importe === 0 || guardando === true ? true : false}>Retirar</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}