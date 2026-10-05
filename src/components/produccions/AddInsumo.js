import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, TextField, MenuItem, Grid, DialogActions, Button } from '@material-ui/core'

const AddInsumo = ( (props, ref) => {
    const {agregar, showMessage, items, open, close, searchItems, loadMoreItems, hasMoreItems, loadingItems} = props
    const [cantidad, setCantidad] = useState(0)
    const [item, setItem] = useState("")
    const [query, setQuery] = useState('')

    const hide = () => {
        setCantidad(0)
        setItem('')
        setQuery('')
        close()
    }

    const buscar = () => {
        setItem('')
        setCantidad(0)
        return searchItems(query)
    }

    const handleChange = (field, value) => {
        switch(field){
            case 'cantidad':     
                if(value < 0){
                    showMessage("En serio?, números negativos?, :P", "error")
                    return setCantidad(0)
                }
                if(value > item.stock){
                    showMessage("Sólo hay "+item.stock+" Disponible.", "warning")
                    return setCantidad(item.stock)
                }
                return setCantidad(value)           
            case 'item':
                setCantidad(value.stock)
                return setItem(value)
            default:
                return null
        }
    } 

    const handleAgregar = () => {
        var newInsumo = {
            fecha: new Date().toISOString(),
            compraItem: item,
            producto: item.producto,
            cantidad: cantidad,
            importe: item.costo * cantidad
        }

        // console.log(newInsumo)
        agregar(newInsumo)

        hide()
    }
    return(
        <Dialog open={open} onClose={hide} fullWidth maxWidth="md">
            <DialogTitle>Agregar Insumo</DialogTitle>
            <DialogContent>
                {
                    items === null  ?
                        <Typography align="center">No hay productos qué mostrar.</Typography>
                        :
                <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <TextField
                            label="Buscar producto, compra o clasificación"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    e.preventDefault()
                                    buscar()
                                }
                            }}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={buscar} disabled={loadingItems} fullWidth>
                            {loadingItems ? 'Buscando...' : 'Buscar'}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={9}>
                        <TextField 
                            id="item"
                            label="Producto"
                            select 
                            margin="normal"
                            fullWidth
                            value={item}
                            onChange={(e) => handleChange('item', e.target.value )}
                            variant="outlined">
                            {
                                items != null ? 
                                items.map( (option) => (
                                    <MenuItem key={option._id} value={option}>
                                            <Grid container >
                                                <Grid item xs={1}>{option.compra.clave}</Grid>
                                                <Grid item xs={10}>{option.producto.descripcion}</Grid>
                                                <Grid item xs={1}>{option.stock}</Grid>
                                            </Grid>
                                        </MenuItem>
                                    ))
                                    :
                                null
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="cantidad"
                            label="Cantidad"
                            margin="normal"
                            type="number"
                            required
                            value={cantidad}
                            onChange={(e) => handleChange('cantidad', e.target.value )}
                            fullWidth
                            variant="outlined"
                            />
                    </Grid>
                </Grid>
                {hasMoreItems ?
                    <Typography align="center" component="div">
                        <Button onClick={loadMoreItems} disabled={loadingItems}>
                            {loadingItems ? 'Cargando...' : 'Cargar más resultados'}
                        </Button>
                    </Typography>
                    : null}
                </React.Fragment>
                }
            </DialogContent>
            <DialogActions>
                <Button 
                    color="primary" 
                    onClick={handleAgregar}
                    disabled={cantidad <= 0 || item === "" ? true : false}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
})

export default AddInsumo