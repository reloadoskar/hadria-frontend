import React, { useState } from 'react'
import {saveIngreso} from '../api'
import { Dialog, DialogTitle, Grid, Typography, DialogContent, DialogActions, Button, MenuItem, TextField } from '@material-ui/core';
import useStyles from '../hooks/useStyles';

export default function IngresoDialog({ubicacion, fecha, isOpen, close, showMessage, addToSaldo}){
const initialData = {
    concepto: 'INGRESO A CAJA',
    descripcion: '',
    importe: 0
}
const classes = useStyles()
const conceptos = ["INGRESO A CAJA", "OTRO"]
const [values, setValues] = useState(initialData) 
const [loading, setLoading] = useState(false)
const handleChange = (field, value) => {
    switch (field) {
        case 'descripcion':
            setValues({...values, [field]: value.toUpperCase()})
            break;
    
        default:
            setValues({...values, [field]: value})
            break;
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
    e.preventDefault()
    close('ingresoDialog')
    let ingreso = {
        fecha: fecha,
        ubicacion: ubicacion,
        concepto: values.concepto,
        descripcion: values.descripcion,
        importe: values.importe,
    }
    setLoading(true)
    saveIngreso(ingreso).then(res => {
        showMessage(res.message, res.status)
        setLoading(false)
        addToSaldo(ingreso.importe)
        clearFields()
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
                    <Grid item xs={12}>
                        <TextField 
                            id="importe"
                            fullWidth
                            label="Importe"
                            variant="outlined"
                            type="number"
                            required
                            value={values.importe}
                            onChange={(e) => handleChange('importe', e.target.value)}
                        />
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={classes.botonSimplon} onClick={() => handleClose('ingresoDialog')} >Cancelar</Button>
                <Button className={classes.botonGenerico} type="submit" disabled={values.importe > 0 || loading !== true   ? false : true }>Registrar</Button>
            </DialogActions>
        </form>
    </Dialog>
)
}