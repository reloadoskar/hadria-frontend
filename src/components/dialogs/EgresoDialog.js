import React, {useState} from 'react';
import {saveEgreso} from '../api'
import { Dialog, DialogContent, DialogTitle, Typography, Grid, DialogActions, Button, TextField, MenuItem } from '@material-ui/core';

import useCompras from '../hooks/useCompras'
export default function EgresoDialog({ubicacion, fecha, isOpen, close, showMessage, subFromSaldo, saldoDisponible}) {
    const initialData ={
        tipo: 'GASTO DE CAJA',
        concepto: '',
        compra: 1,
        descripcion: '',

        importe: 0,
    }
    const {compras} = useCompras() 
    const [values, setValues] = useState(initialData)
    const conceptos = ["SUELDOS", "SERVICIOS", "FLETE", "TRASPALEOS"] 
    const tipos = ["GASTO DE CAJA", "GASTO A COMPRA"] 
    
    function hasNull(target) {
        for (var member in target) {
            if (target[member] === null || target[member] === '')
                return true;
        }
        return false;
    }

    const handleChange = (type, value) => {
        if(type === 'importe'){
            if(value > saldoDisponible){
                showMessage("El importe es mayor al Saldo disponible.", "error")
                setValues({...values, importe: ''})
                return false
            }
        }
        setValues({...values, [type]: value})
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
        if( hasNull(values) ) {
            showMessage("Faltan datos", 'error')
        } 
        else{
            var egreso = {
                ubicacion: ubicacion,
                tipo: values.tipo,
                concepto: values.concepto,
                compra: values.compra,
                descripcion: values.descripcion,
                fecha: fecha,
                importe: values.importe,
            }

            // console.log(egreso)
            
            saveEgreso(egreso).then(res => {
                showMessage(res.message, res.status)
                subFromSaldo(egreso.importe)
                clearFields()
                close('egresoDialog')
            })
        }
    }

    return (
        
        <Dialog 
            fullWidth={true}
            maxWidth="sm" 
            open={isOpen} 
            onClose={() => handleClose('egresoDialog')} >

            <DialogTitle id="form-dialog-title">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Nuevo Egreso en:</Typography>
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
                                    id="tipo"
                                    label="Tipo"
                                    variant="outlined"
                                    autoFocus
                                    select
                                    required
                                    fullWidth
                                    value={values.tipo}
                                    onChange={(e) => handleChange('tipo', e.target.value)}
                                >
                                    {tipos.map((option, index) =>(
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
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
                                    {conceptos.map((option, index) =>(
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {values.tipo === "GASTO A COMPRA" && 
                                <Grid item xs={12}>
                                    <TextField
                                    id="compra"
                                    label="Selecciona una compra"
                                    variant="outlined"
                                    select
                                    fullWidth
                                    value={values.compra}
                                    onChange={(e) => handleChange('compra', e.target.value)}
                                    >
                                        {compras.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option.clave}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            }
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
                        <Button onClick={() => handleClose('egresoDialog')} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={values.importe > 0 ? false : true }>
                            Registrar
                        </Button>
                    </DialogActions>
            </form>          
        </Dialog>
        
    );
}
