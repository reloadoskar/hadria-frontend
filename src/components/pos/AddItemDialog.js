import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Button, TextField } from '@material-ui/core';
import useStyles from '../hooks/useStyles';
import {formatNumber} from '../Tools'
const calclulaImporte = (cant, prec) => {
    return cant * prec
}

export default function AddItemDialog({item, isOpen, close, showMessage, add }) {
    const classes = useStyles()
    const initData = {
        precio: '',
        item: item,
        cantidad: '',
        empaques: '',
        importe: '',
    }
    const [values, setValues] = useState(initData)

    const handleClose = (dialog) => {
        close(dialog)
    }

    const handleChange = (field, value) => {
        let stock = item.item.stock
        let empStock = item.item.empaquesStock
        let imp = 0
        // let emp = 0
        switch(field){
            case 'cantidad':
                if(value <= 0){
                    return setValues({...values, [field]: ''})
                }
                if(value > stock){
                    let message = "Solo hay " +stock + " disponibles."
                    showMessage(message, 'warning' )
                    return setValues({...values, [field]: '', empaques: '', importe: ''})
                }
                imp = calclulaImporte(value, values.precio)
                // emp = calculaEmpaques(item.item.empaquesStock, stock, value)
                return setValues({ ...values, [field]: value, importe: imp})
            case 'empaques':
                if(value > empStock){
                    let message = "Solo hay " +empStock + " disponibles."
                    showMessage(message, 'warning' )
                    return setValues({...values, [field]: '', empaques: '', importe: ''})
                }
                return setValues({...values, [field]: value})
            case 'precio':
                imp = calclulaImporte(values.cantidad, value)
                return setValues({ ...values, [field]: value, importe: imp })

            default:
                return setValues({...values, [field]: value})
        }
    }

    const subStock = (i) => {
        let item = i.item
        // console.log(i)
        item.stock -= values.cantidad
        item.empaquesStock -= values.empaques
        setValues({...values, item: item})
    }

    const handleSubmit = (e) => {
        // e.preventDefault()
        let newItem = {
            selected: item,
            compra: item.compraId,
            item: item.item._id,
            producto: item.item.producto,
            cantidad: values.cantidad,
            empaques: values.empaques,
            precio: values.precio,
            importe: values.importe,
        }
        // console.log(newItem)
        add(newItem)
        subStock(newItem.selected)
        close('addItemDialog')
    }

    return(
        <Dialog
            fullWidth={true}
            maxWidth="sm" 
            open={isOpen} 
            onClose={() => handleClose('addItemDialog')} >
            <DialogTitle id="dialog-add">
                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" >{item.item.producto.descripcion}</Typography>
    <Typography variant="subtitle2" >Disponible: {formatNumber(item.item.empaquesStock)}/{formatNumber(item.item.stock,2)} 
                        {/* {item.item.producto.unidad.abr} */}
                        </Typography>                        
                    </Grid>

                </Grid>
            </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <TextField 
                                    id="empaques"
                                    label="Empaques"
                                    variant="outlined"
                                    autoFocus
                                    required
                                    fullWidth
                                    value={values.empaques}
                                    onChange={(e) => handleChange('empaques', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField 
                                    id="cantidad"
                                    label="Cantidad"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={values.cantidad}
                                    onChange={(e) => handleChange('cantidad', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField 
                                    id="precio"
                                    label="Precio"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={values.precio}
                                    onChange={(e) => handleChange('precio', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField 
                                    id="importe"
                                    label="Importe"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={values.importe}
                                    onChange={(e) => handleChange('importe', e.target.value)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.botonSimplon} onClick={() => handleClose('addItemDialog')} >
                            Cancelar
                        </Button>
                        <Button className={classes.botonGenerico} type="submit" 
                        // disabled={values.cantidad > 0 ? false : true }
                        >
                            Agregar
                        </Button>
                    </DialogActions>
                </form>

        </Dialog>
    )
}