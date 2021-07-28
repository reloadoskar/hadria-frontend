import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, Grid, TextField, MenuItem, Button, DialogActions, Divider } from '@material-ui/core'
import useProducts from '../productos/useProducts'
import useStyles from '../hooks/useStyles'
import {formatNumber, sumImporte} from '../Tools'
const Procesar = (props) => {
    const {produccion, insumos, open, close, crear} = props
    const classes = useStyles();
    const {products} = useProducts()
    const [productoSeleccionado, setProductoSeleccionado] = useState("")
    const [cantidadProducto, setCantidadProducto] = useState("")
    const [insumoSeleccionado, setInsumoSeleccionado] = useState("")
    const [cantidadInsumo, setCantidadInsumo] = useState("")
    const [productoProcesado, setProductoProcesado] = useState(null)
    const [insumosProcesados, setInsumosProcesados] = useState([])
    const [sumaImporteInsumos, setSumaImporteInsumos] = useState(0)
    useEffect(()=> {

        setSumaImporteInsumos(sumImporte(insumosProcesados))

    }, [insumosProcesados])
    const agregarInsumo = () => {
        var nInsumo = {
            insumo: insumoSeleccionado,
            cantidad: cantidadInsumo,
            importe: insumoSeleccionado.compraItem.costo * cantidadInsumo
        }
        var nInsumos = [nInsumo, ...insumosProcesados]
        insumoSeleccionado.disponible -= cantidadInsumo
        setInsumosProcesados(nInsumos)
        setCantidadInsumo("")
        setInsumoSeleccionado("")
    }
    const crearProducto = () => {
        var nProducto = {
            fecha: new Date().toISOString(),
            produccion: produccion,
            insumos: insumosProcesados,
            producto: productoSeleccionado,
            cantidad: cantidadProducto,
            costo: sumaImporteInsumos / cantidadProducto,
            importe: sumaImporteInsumos
        }
        setProductoProcesado(nProducto)
        setCantidadProducto("")
        setProductoSeleccionado("")
    }
    const handleChange = (field, value) => {
        switch(field){
            case 'cantidadProducto':
                return setCantidadProducto(value)
            case 'cantidadInsumo':
                if(value > insumoSeleccionado.disponible){
                    return setCantidadInsumo(insumoSeleccionado.disponible)     
                }
                if(value < 0){
                    return setCantidadInsumo(0)     
                }else{
                    return setCantidadInsumo(value)     
                }
            case 'insumoSeleccionado':
                setInsumoSeleccionado(value)
                setCantidadInsumo(0)
                return true
                
            case 'productoSeleccionado':
                return setProductoSeleccionado(value)
            default:
                return null
        }
    }

    const clearVariables = () => {
        insumosProcesados.forEach(insumo => {
            var disponible = parseInt(insumo.insumo.disponible)
            var cant = parseInt(insumo.cantidad)
            var ndisponible = disponible + cant

            insumo.insumo.disponible  = ndisponible 
        })
        setProductoSeleccionado("")
        setInsumoSeleccionado("")
        setCantidadInsumo(0)
        setInsumosProcesados([])
        setSumaImporteInsumos(0)
        setProductoProcesado(null)
        setCantidadProducto(0)

    }

    const handleClose = () => {
        clearVariables()
        close()
    }

    const handleRegistrar = () => {
        crear(productoProcesado)
        handleClose()
    }
    return(
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Procesar</DialogTitle>
            <DialogContent>
                {
                    insumos === null ?
                        <Typography>no hay nada</Typography>
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Grid container >
                                <Grid item xs={12}>
                                    
                                    <Typography align="center">
                                        ¿Qué ocupas para producir?
                                    </Typography>
                                    <TextField 
                                        id="insumo"
                                        label="Insumo"
                                        select 
                                        margin="normal"
                                        fullWidth
                                        value={insumoSeleccionado}
                                        onChange={(e) => handleChange('insumoSeleccionado', e.target.value )}
                                        variant="outlined">
                                        {
                                            insumos != null ? 
                                                insumos.map( (option, index) => {
                                                    if(option.disponible>0){
                                                        return (<MenuItem key={index} value={option}>
                                                                <Grid container >
                                                                    <Grid item xs={10}>{option.compraItem.producto.descripcion}</Grid>
                                                                    <Grid item xs={2}>{option.disponible}</Grid>
                                                                </Grid>
                                                            </MenuItem>)
                                                    }else{
                                                        return false
                                                    }
                                                })
                                                
                                            :
                                                null
                                        }
                                    </TextField>
                                    <TextField 
                                        id="cantidad"
                                        label="cantidad"
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        value={cantidadInsumo}
                                        onChange={(e)=> handleChange('cantidadInsumo', e.target.value) }
                                    />
                                    <Button variant="contained" color="primary" onClick={agregarInsumo} fullWidth disabled={ insumoSeleccionado !== "" && cantidadInsumo > 0  ? false : true}>
                                        Agregar
                                    </Button>
                                     
                                </Grid>

                                <Grid item xs={12}>
                                    {
                                        insumosProcesados.length === 0 ?
                                        null
                                        :
                                        <div>

                                    <Typography align="center">
                                        ¿Qué quieres producir?
                                    </Typography>
                                    <TextField 
                                        id="producto"
                                        label="Producto"
                                        select 
                                        margin="normal"
                                        fullWidth
                                        value={productoSeleccionado}
                                        onChange={(e) => handleChange('productoSeleccionado', e.target.value )}
                                        variant="outlined">
                                        {
                                            products != null ? 
                                            products.map( (option, index) => (
                                                <MenuItem key={index} value={option}>
                                                        <Grid container >
                                                            <Grid item xs={2}>{option.clave}</Grid>
                                                            <Grid item xs={10}>{option.descripcion}</Grid>
                                                        </Grid>
                                                    </MenuItem>
                                                ))
                                                :
                                                null
                                        }
                                    </TextField>
                                    <TextField
                                        id="cantidadProducto"
                                        label = "Cantidad"
                                        margin="normal"
                                        fullWidth
                                        type="number"
                                        value={cantidadProducto}
                                        variant="outlined"
                                        onChange={(e) => handleChange('cantidadProducto', e.target.value)}
                                        />
                                    <Button 
                                        className={productoSeleccionado !== "" && cantidadProducto > 0  ? classes.botonMagico : ""}
                                        variant="contained"
                                        color="primary"
                                        fullWidth 
                                        disabled={ productoSeleccionado !== "" && cantidadProducto > 0  ? false : true}
                                        onClick={crearProducto}>
                                        Producir
                                    </Button>
                                        </div>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                            <Grid item xs={8}>
                                <Grid container >
                                    <Grid item xs={12}>
                                        {
                                            insumosProcesados.length > 0 ?
                                            <div>
                                                <Typography variant="h5" align="center" children="Usaste:" />
                                                {
                                                    insumosProcesados.map( (op, i) => (
                                                        <React.Fragment key={i}>
                                                        <Grid container >
                                                            <Grid item xs={6}>
                                                                <Typography children={op.insumo.compraItem.producto.descripcion}/>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Typography align="right" children={op.cantidad + " x $" + op.importe/op.cantidad + " ="} />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Typography align="right" children={"$" + formatNumber(op.importe,2)} />
                                                            </Grid>
                                                        </Grid>
                                                        <Divider />
                                                        </React.Fragment>
                                                    ))
                                                }
                                                
                                                
                                            </div>
                                            :
                                            null
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            productoProcesado === null ?
                                                null
                                            :
                                            <div>
                                                <Typography align="center" variant="h5">Obtuviste:</Typography>
                                                <Grid container >
                                                    <Grid item xs={1}>
                                                        <Typography children={productoProcesado.cantidad} />
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography children={productoProcesado.producto.descripcion} />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography align="right" children={"Costo/u : $" + formatNumber(productoProcesado.costo,2)} />
                                                    </Grid>
                                                </Grid>                                            
                                                <Typography variant="h6" align="right" children={"Inversion Total: $" + formatNumber(sumaImporteInsumos,2)} />
                                            </div>

                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Grid>
                }
            </DialogContent>
            <DialogActions>
                {
                    productoProcesado === null ?
                    null
                    :
                    <div>
                        <Button 
                            onClick={clearVariables}
                            color="secondary"
                            >
                                cancelar
                        </Button>
                        <Button 
                            className={classes.botonMagico}
                            onClick={handleRegistrar}
                            variant="contained">
                            registrar
                        </Button>
                    </div>
                }

            </DialogActions>
        </Dialog>
    )
}

export default Procesar