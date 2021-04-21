import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, TextField, MenuItem, Grid, DialogActions, Button } from '@material-ui/core'

const AddInsumo = ( (props, ref) => {
    const {agregar, showMessage, items, open, close} = props
    const [cantidad, setCantidad] = useState(0)
    const [item, setItem] = useState("")

    const hide = () => {
        setCantidad(0)
        setItem('')
        close()
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
                                items.map( (option, index) => (
                                    <MenuItem key={index} value={option}>
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