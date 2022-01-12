import React, { useState, useContext } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid, TextField, Button, MenuItem } from '@material-ui/core';
import useStyles from '../hooks/useStyles'
import { useSnackbar } from 'notistack'
import { ProductoContext } from './ProductoContext'
const initProducto = {
    clave: '',
    descripcion: '',
    costo: '',
    unidad: '',
    empaque: '',
    precio1: '',
    precio2: '',
    precio3: '',
    existeDescripcion: false,
    existeClave: false,
}
export default function ProductoCreate({ open, close, unemp }) {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

    const { addProducto } = useContext(ProductoContext)
    const [producto, setProducto] = useState(initProducto)
    const [guardando, setGuardando] = useState(false)

    const handleChange = (field, value) => {
        switch (field) {
            case "clave":
                setProducto({ ...producto, [field]: value.substring(0,4).toUpperCase() })
                break;
            case "unidad":
                setProducto({ ...producto, [field]: value })
                break;
            case "empaque":
                setProducto({ ...producto, [field]: value })
                break;

            default:
                setProducto({ ...producto, [field]: value.toUpperCase() })
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setGuardando(true)
        addProducto(producto).then(res => {
            showMessage(res.message, res.status)
            setGuardando(false)
            close()
            setProducto(initProducto)
        })
    }
    return (
        <Dialog fullWidth open={open} onClose={close}>
            <DialogTitle>Nuevo Producto</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <TextField
                                autoFocus
                                required
                                id="descripcion"
                                label="Descripción"
                                fullWidth
                                variant="outlined"
                                value={producto.descripcion}
                                onChange={(e) => handleChange('descripcion', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                required
                                id="clave"
                                label="Clave"
                                fullWidth
                                variant="outlined"
                                value={producto.clave}
                                onChange={(e) => handleChange('clave', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                select
                                id="unidad"
                                label="Unidad"
                                variant="outlined"
                                value={producto.unidad}
                                onChange={(e) => handleChange('unidad', e.target.value)}
                            >
                                {unemp.unidades.map((el, index) => (
                                    <MenuItem key={index} value={el}>{el.unidad + "(" + el.abr + ")"}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                required
                                id="empaque"
                                label="Empaque"
                                variant="outlined"
                                value={producto.empaque}
                                onChange={(e) => handleChange('empaque', e.target.value)}
                            >
                                {unemp.empaques.map((el, index) => (
                                    <MenuItem key={index} value={el}>{el.empaque}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="costo"
                                label="Costo"
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={producto.costo}
                                onChange={(e) => handleChange('costo', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="precio1"
                                label="Precio de Lista"
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={producto.precio1}
                                onChange={(e) => handleChange('precio1', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="precio2"
                                label="Precio de Mayoreo"
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={producto.precio2}
                                onChange={(e) => handleChange('precio2', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="precio3"
                                label="Precio Especial"
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={producto.precio3}
                                onChange={(e) => handleChange('precio3', e.target.value)}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button className={classes.botonSimplon} onClick={close}>cancelar</Button>
                    <Button
                        disabled={guardando ? true : false}
                        className={classes.botonGenerico} onClick={(e) => handleSubmit(e)}>Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}