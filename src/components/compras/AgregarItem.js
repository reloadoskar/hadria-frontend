import React, { useState } from 'react'
import { 
    Button,
    Grid, 
    TextField, 
    MenuItem, 
} from '@material-ui/core';
// import SaveIcon from '@material-ui/icons/Save';
import CrearProducto from '../productos/CrearProducto'
import ListaItems from './ListaItems'
import {objectIsNull} from '../Tools'
import useStyles from '../hooks/useStyles'
export default function AgregarItem(props){
    const { crearItem, showMessage, products, openP, items } = props 
    const classes = useStyles();

    const [producto, setProducto] = useState("")
    
    const [values, setValues] = useState({
        // producto: '',
        provedor: '',
        cantidad: '',
        empaques: '',
        costo: '',
        importe: '',
        checked: false
    })

    const clearFields = () => {
        setValues({producto: '', provedor: '', cantidad: '', empaques: '', costo: '', importe: '', checked: false})
    }

    const handleChange = (field, value) => {
        var imp = 0
        switch(field){
            case 'producto':
                return setProducto(value)
                // return setValues({...values, producto: value, costo: value.costo})
            case 'cantidad':
                imp = value * values.costo
                return setValues({...values, cantidad: value, importe: imp})
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
            producto: producto,
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
            crearItem(item)
            clearFields()
            showMessage("Se agregó un producto", 'success')
        }

    }

    const openDialogProducto = () => {
        openP()
    }
    return (
        
            <form onSubmit={handleSubmit}>                    
                
                    <Grid container spacing={2} alignItems="center">                                
                        <Grid item xs={12}>
                            <TextField
                                id="producto"
                                label="Selecciona un Producto"
                                select
                                required
                                fullWidth
                                autoFocus
                                value={producto}
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
                                <MenuItem onClick={(e) => openDialogProducto(e)} value="">Nuevo...</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <TextField
                                id="empaques"
                                label={ producto.empaque !== undefined ? producto.empaque.empaque : "Empaques"}
                                margin="normal"
                                type="number"
                                required
                                value={values.empaques}
                                onChange={(e) => handleChange('empaques', e.target.value )}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        
                        <Grid item xs={6} sm={2}>
                            <TextField
                                id="cantidad"
                                label={ producto.unidad !== undefined ? producto.unidad.unidad : "Unidad"}
                                margin="normal"
                                type="number"
                                required
                                value={values.cantidad}
                                onChange={(e) => handleChange('cantidad', e.target.value )}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        

                        <Grid item xs={6} sm={2}>
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
                        
                        <Grid item xs={6} sm={2}>
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
                        <Grid item xs>
                            <Grid container justifyContent="flex-end">
                                <Button className={classes.botonGenerico} fullWidth type="submit" variant="contained" color="primary">
                                    Agregar
                                </Button>
                            </Grid>
                        </Grid>   
                        <Grid item xs={12}>
                            { items.length === 0 ?
                                null
                            :
                                <ListaItems {...props} />
                            }
                        </Grid>                 
                    </Grid>
                    
                    <CrearProducto {...props} open={props.dialogP} close={props.closeP}  />
            </form>

    )
}