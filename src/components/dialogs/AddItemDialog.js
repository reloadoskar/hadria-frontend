import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Button, TextField } from '@material-ui/core';

const calclulaImporte = (cant, prec) => {
    return cant * prec
}

export default function AddItemDialog({item, isOpen, close, showMessage, add }) {
    const initData = {
        precio: item.item.producto.precio1,
        item: item,
        cantidad: '',
        empaques: '',
        importe: '',
    }
    const [values, setValues] = useState(initData)

    const handleClose = (dialog) => {
        close(dialog)
    }

    const calculaEmpaques = (emp, stock, cant) => {
        let unit = 0
        let calc = 0

        unit = parseFloat(stock) / parseFloat(emp) 

        calc = parseFloat(cant) / unit
        return calc
    }

    const handleChange = (field, value) => {
        const stock = item.item.stock
        let imp = 0
        let emp = 0
        switch(field){
            case 'cantidad':
                if(value <= 0){
                    return setValues({...values, [field]: ''})
                }
                if(value > stock){
                    var message = "Solo hay " +stock + " disponibles."
                    showMessage(message, 'warning' )
                    return setValues({...values, [field]: '', empaques: '', importe: ''})
                }
                imp = calclulaImporte(value, values.precio)
                emp = calculaEmpaques(item.item.empaquesStock, stock, value)
                return setValues({ ...values, [field]: value, empaques: emp, importe: imp})
            
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
        e.preventDefault()
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
                    <Grid item xs={6}>
                        <Typography variant="h6" >{item.item.producto.descripcion}</Typography>
                        <Typography variant="subtitle2" >Disponible: {item.item.stock}</Typography>
                    </Grid>

                </Grid>
            </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <TextField 
                                    id="cantidad"
                                    label="Cantidad"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                    value={values.cantidad}
                                    onChange={(e) => handleChange('cantidad', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField 
                                    id="empaques"
                                    label="Empaques"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={values.empaques}
                                    onChange={(e) => handleChange('empaques', e.target.value)}
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
                        <Button onClick={() => handleClose('addItemDialog')} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={values.importe > 0 ? false : true }>
                            Registrar
                        </Button>
                    </DialogActions>
                </form>

        </Dialog>
    )
}