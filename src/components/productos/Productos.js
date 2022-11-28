import React, { useState, useEffect } from 'react';
// COMPONENTES DE INTERFAZ // MATERIAL-UI
import { 
    MenuItem, 
    Grid, 
    Button, 
    TextField,
    } from '@material-ui/core';

// HOOKS
import { useProductos } from '../productos/ProductosContext'
import useStyles from '../hooks/useStyles';
import {useUnidades} from '../hooks/useUnidades'
import {useEmpaques} from '../hooks/useEmpaques'

// COMPONENTES EXTERNOS
import ProductoCreate from './ProductoCreate';
import Producto from './Producto';
import { useAuth } from '../auth/use_auth';

//COMPONENTE 
function Productos() {
    const {user} = useAuth()
    const { productos, loadProductos, findProductoBy } = useProductos()
    const [resultadoBusqueda, setResultado] = useState([])
    const classes = useStyles()
    const {unidades, loadUnidades} = useUnidades()
    const {empaques, loadEmpaques} = useEmpaques()
    const [openCreate, setOpenCreate] = useState(false)
    const fields = ["clave", "descripcion"]
    const [fieldSelected, setFieldSelected] = useState('descripcion')
    const [searchField, setSearchField] = useState('')

    useEffect(()=>{
        loadProductos(user)
        loadUnidades(user)
        loadEmpaques(user)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const crearProducto = () => {
        setOpenCreate(true)
    }
    function handleChange(field, value){
        switch(field)
        {
            case "field":
                return setFieldSelected(value)
            case "search":
                if(value=== ''){ 
                    setResultado([])
                }else{
                    setResultado(findProductoBy( fieldSelected, value.toUpperCase() ) )
                }
                return setSearchField(value)
            default: 
                return setSearchField(value)
        }
    }

    return (
        <React.Fragment>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Button className={classes.botonGenerico} onClick={() => crearProducto() }>+ nuevo producto</Button>
                    <ProductoCreate open={openCreate} close={() => setOpenCreate(false)} unemp={{unidades, empaques}}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="field"
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
                <Grid item container spacing={2} xs={12}>
                    { resultadoBusqueda.length > 0 ? 
                        resultadoBusqueda.map((producto, i) =>(
                            <Producto producto={producto} key={i} unemp={{unidades, empaques}}/>
                            ))
                        :
                        productos.map((producto, i) =>(
                            <Producto producto={producto} key={i} unemp={{unidades, empaques}}/>
                            ))
                    }
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Productos