import React, { useState } from 'react'
import {saveIngreso} from '../api'
import { Dialog, DialogTitle, Grid, Typography, DialogContent, DialogActions, Button, MenuItem, TextField } from '@material-ui/core';

export default function IngresoDialog({ubicacion, fecha, isOpen, close, showMessage, addToSaldo}){
const initialData = {
    concepto: 'INGRESO A CAJA',
    descripcion: '',
    importe: 0
}
const conceptos = ["INGRESO A CAJA", "OTRO"]
const [values, setValues] = useState(initialData) 

const handleChange = (field, value) => {
    setValues({...values, [field]: value})
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
    let ingreso = {
        fecha: fecha,
        ubicacion: ubicacion,
        concepto: values.concepto,
        descripcion: values.descripcion,
        importe: values.importe,
    }
    console.log(ingreso)

    saveIngreso(ingreso).then(res => {
        showMessage(res.message, res.status)
        addToSaldo(ingreso.importe)
        clearFields()
        close('ingresoDialog')
    })

}
return (
    <Dialog
    fullWidth={true}
    maxWidth="sm" 
    open={isOpen} 
    onClose={() => handleClose('ingresoDialog')} >
        <DialogTitle id="form-dialog-ingreso">
        <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Nuevo Ingreso en:</Typography>
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
                            id="concepto"
                            label="Concepto"
                            variant="outlined"
                            autoFocus
                            select
                            required
                            fullWidth
                            value={values.concepto}
                            onChange={(e) => handleChange('concepto', e.target.value)}
                        >
                            {conceptos.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))} 
                        </TextField>                        
                    </Grid>
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
                    <Grid item xs={6}>
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
                <Button onClick={() => handleClose('ingresoDialog')} color="secondary">Cancelar</Button>
                <Button type="submit" variant="contained" color="primary" disabled={values.importe > 0 ? false : true }>Registrar</Button>
            </DialogActions>
        </form>
    </Dialog>
)
}