import React, {useState, useEffect} from 'react';
import {saveEgreso, ticketEgreso} from '../api'
import { Dialog, DialogContent, DialogTitle, Typography, Grid, DialogActions, Button, TextField, MenuItem, Zoom } from '@material-ui/core';

import useCompras from '../compras/useCompras'
import useConceptos from '../hooks/useConceptos'
import useStyles from '../hooks/useStyles';
export default function EgresoDialog({ubicacion, fecha, open, close, showMessage}) {
    const initialData ={
        tipo: 'GASTO DE CAJA',
        concepto: '',
        compra: 1,
        descripcion: '',

        importe: 0,
    }
    const classes = useStyles()
    const Compra = useCompras() 
    const [values, setValues] = useState(initialData)
    const {conceptos} = useConceptos()
    const tipos = ["GASTO DE CAJA", "GASTO A COMPRA"] 
    const [guardando, setGuardando] = useState(false)
    useEffect(() => {
        Compra.getCompActivas()
    },[])
    function hasNull(target) {
        for (var member in target) {
            if (target[member] === null || target[member] === '')
                return true;
        }
        return false;
    }

    const handleChange = (type, value) => {
        switch(type){
            case 'importe':
                // if(value > saldoDisponible){
                //     showMessage("El importe es mayor al Saldo disponible.", "error")
                //     return setValues({...values, importe: ''})
                // }else{
                    setValues({...values, [type]: value})
                // }
                break;
            case 'descripcion':
                return setValues({...values, [type]: value.toUpperCase()})
                
            default:
                return setValues({...values, [type]: value})

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
        if( hasNull(values) ) {
            showMessage("Faltan datos", 'error')
            setGuardando(false)
        } 
        else{
            var egreso = {
                ubicacion: ubicacion._id,
                tipo: values.tipo,
                concepto: values.concepto,
                compra: values.compra,
                descripcion: values.descripcion,
                fecha: fecha,
                importe: values.importe, 
            }

            // console.log(egreso)
            
            saveEgreso(egreso).then(res => {
                setGuardando(false)
                showMessage(res.message, res.status)
                clearFields() 
                ticketEgreso(egreso)
                close('egresoDialog')
            })
        }
    }

    return (
        
        <Dialog 
            fullWidth={true}
            maxWidth="sm" 
            open={open} 
            onClose={() => handleClose('egresoDialog')} >

            <DialogTitle id="form-dialog-title">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" >Nuevo Egreso en:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justifyContent="flex-end">
                            <Typography variant="h6" >{ubicacion.nombre}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                {
                    guardando === true ?
                        <Zoom in={guardando}>
                            <Typography variant="h6" align="center">Guardando...</Typography>
                        </Zoom>
                        :
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
                                        <MenuItem key={index} value={option.concepto}>
                                            {option.concepto}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {values.tipo === "GASTO A COMPRA" ? 
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
                                        {Compra.compras.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option.folio}:{option.clave}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                :
                                null
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
                }

                    <DialogActions>
                        <Button className={classes.botonSimplon} onClick={() => handleClose('egresoDialog')} >
                            Cancel
                        </Button>
                        <Button className={classes.botonGenerico} type="submit" disabled={values.importe === 0 || guardando === true ? true : false }>
                            Registrar
                        </Button>
                    </DialogActions>
            </form>          
        </Dialog>
        
    );
}
