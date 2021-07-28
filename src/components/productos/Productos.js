import React, { useState } from 'react';
// COMPONENTES DE INTERFAZ // MATERIAL-UI
import { 
    MenuItem, 
    Grid, 
    Button, 
    TextField,
    Card, 
    CardContent } from '@material-ui/core';

// HOOKS
import useProducts from './useProducts';
import { useSnackbar } from 'notistack';
import useStyles from '../hooks/useStyles';
import {searchBy} from '../Tools'

// COMPONENTES EXTERNOS
import CrearProducto from './CrearProducto';
import Producto from './Producto';

//COMPONENTE 
function Productos() {
    const classes = useStyles()
    const { products, addProduct, updateProducto } = useProducts()
    const [dialog, setDialog] = useState(false)
    const fields = ["clave", "descripcion"]
    const [fieldSelected, setFieldSelected] = useState('descripcion')
    const [searchField, setSearchField] = useState('')
    const [resultado, setResultado] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    const showDialog = () => {
        setDialog(true)
    }

    const closeDialog = () => {
        setDialog(false)
    }

    function addProducto(producto) {
        showMessage("Agregando...", "info")
        closeDialog()
        addProduct(producto).then(res => {
            showMessage(res.message, res.status)
        })
    }

    function handleChange(field, value){
        switch(field)
        {
            case "field":
                return setFieldSelected(value)
            case "search":
                setResultado( searchBy(fieldSelected, value.toUpperCase(), products) )
                return setSearchField(value)
            default: 
                return setSearchField(value)
        }
    }

    return (
        <React.Fragment>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={8}>
                    <Button fullWidth className={classes.botonGenerico} onClick={showDialog}>Agregar</Button>
                    <CrearProducto addProduct={addProducto} open={dialog} close={closeDialog} search={searchBy} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        label="Buscar por:"
                        select 
                        value={fieldSelected}
                        onChange={(e) => handleChange('field', e.target.value)}
                        >
                            {fields.map((el, index) => (
                                <MenuItem key={index} value={el}>{el}</MenuItem>
                                ))}
                    </TextField> 
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        variant="outlined"
                        label="Ingrese un texto de b&uacute;squeda." 
                        value={searchField} 
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    {resultado.length === 0 ?
                        null
                        :
                        resultado.map((producto, i) =>(
                            <Producto producto={producto} update={updateProducto} key={i} />
                        ))
                    }                
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Productos