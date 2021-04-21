import React, { useState } from 'react'
import { Dialog, DialogTitle, Button, DialogContent, DialogActions, Grid, TextField, MenuItem } from '@material-ui/core';
// import SaveIcon from '@material-ui/icons/Save';

// import useProducts from '../hooks/useProducts'
// import useProvedors from '../hooks/useProvedors'
import {objectIsNull} from '../Tools'
// import CrearProducto from '../productos/CrearProducto';

export default function CompraAddItemsDialog(props){
    const { open, handleClose, addItemToList, showMessage , products, provedors } = props
    // const {products, 
    //     // add
    // } = useProducts()
    // const {provedors} = useProvedors()
    // const [dialogProducto, setDialogProducto] = useState(false)
    const [values, setValues] = useState({
        producto: '',
        provedor: '',
        cantidad: '',
        empaques: '',
        costo: '',
        importe: '',
        checked: false
    })
    // const openDialogProducto = () => {
    //     setDialogProducto(true)
    // }
    // const closeDialogProducto = () => {
    //     setDialogProducto(false)
    // }

    const clearFields = () => {
        setValues({producto: '', provedor: '', cantidad: '', empaques: '', costo: '', importe: '', checked: false})
    }

    const handleChange = (field, value) => {
        var imp = 0
        switch(field){
            case 'producto':
                return setValues({...values, producto: value, costo: value.costo})
            case 'cantidad':
                imp = value * values.costo
                return setValues({...values, cantidad: value, empaques: value, importe: imp})
            case 'costo':
                imp = value * values.cantidad
                return setValues({...values, costo: value, importe: imp})
            default:
                return setValues({...values, [field]: value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let item = {
            producto: values.producto,
            cantidad: values.cantidad,
            stock: values.cantidad,
            empaques: values.empaques,
            costo: values.costo,
            importe: values.importe,
        }
                
        if(objectIsNull(item)){
            showMessage("Faltan datos.", 'error')
            return false
        }else{
            addItemToList(item)
            clearFields()
            showMessage("Se agregó un producto", 'success')
        }

    }
    return (
        <div>
            {
                products === null || provedors === null ?
                    null
                :

                    <Dialog
                        fullWidth={true}
                        maxWidth="md"
                        open={open}
                        onClose={() => handleClose('addItemDialog')} >

                        <DialogTitle>
                            Agregar productos:
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={2}>
                                {/* Select: Producto return Object producto*/}
                                <Grid item xs={4}>
                                    <TextField
                                        id="producto"
                                        label="Selecciona un Producto"
                                        select
                                        required
                                        fullWidth
                                        autoFocus
                                        value={values.producto}
                                        onChange={(e) => handleChange('producto', e.target.value )}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {
                                            products.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option.clave} - {option.descripcion}
                                                </MenuItem>
                                            ))
                                        }
                                        
                                    </TextField>
                                </Grid>
                                {/* Input: Cantidad */}
                                <Grid item xs={2}>
                                    <TextField
                                        id="cantidad"
                                        label="Cantidad"
                                        margin="normal"
                                        type="number"
                                        required
                                        value={values.cantidad}
                                        onChange={(e) => handleChange('cantidad', e.target.value )}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                {/* Input: Empaques */}
                                <Grid item xs={2}>
                                    <TextField
                                        id="empaques"
                                        label="Empaques"
                                        margin="normal"
                                        type="number"
                                        required
                                        value={values.empaques}
                                        onChange={(e) => handleChange('empaques', e.target.value )}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                {/* Input: Costo */}
                                <Grid item xs={2}>
                                    <TextField
                                        id="costo"
                                        label="Costo"
                                        margin="normal"
                                        type="number"
                                        required
                                        value={values.costo}
                                        onChange={(e) => handleChange( 'costo', e.target.value )}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                {/* Input:  Importe readOnly */}
                                <Grid item xs={2}>
                                    <TextField
                                        id="importe"
                                        label="Importe"
                                        margin="normal"
                                        type="number"
                                        value={values.importe}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => handleClose("addItemDialog")} color="primary">
                                Salir
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Agregar
                            </Button>
                        </DialogActions>
                        </form>
                    </Dialog>
            }
            
        </div>
    )
}