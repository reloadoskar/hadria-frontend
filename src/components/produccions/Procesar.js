import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, Grid, TextField, MenuItem, Button, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'
import useProducts from '../hooks/useProducts'
import {formatNumber, sumImporte} from '../Tools'
const Procesar = (props) => {
    const {insumos, open, close, showMessage} = props
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
        setInsumosProcesados(nInsumos)
        setCantidadInsumo("")
        setInsumoSeleccionado("")
    }
    const crearProducto = () => {
        var nProducto = {
            insumos: insumosProcesados,
            producto: productoSeleccionado,
            cantidad: cantidadProducto,
            costo: sumaImporteInsumos / cantidadProducto 
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
                }else{
                    return setCantidadInsumo(value)     
                }
            case 'insumoSeleccionado':
                return setInsumoSeleccionado(value)    
            case 'productoSeleccionado':
                return setProductoSeleccionado(value)
            default:
                return null
        }
    }

    const clearVariables = () => {
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
        var nProducto = productoProcesado
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
                                                insumos.map( (option, index) => (
                                                    <MenuItem key={index} value={option}>
                                                        <Grid container >
                                                            <Grid item xs={10}>{option.compraItem.producto.descripcion}</Grid>
                                                            <Grid item xs={2}>{option.disponible}</Grid>
                                                        </Grid>
                                                    </MenuItem>
                                                ))
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
                                    <Button variant="contained" onClick={agregarInsumo} fullWidth>
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
                                    <Button fullWidth onClick={crearProducto}>
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
                                                <Typography variant="h5" children="Usaste:" />
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Inusmo</TableCell>
                                                            <TableCell align="right">Cantidad</TableCell>
                                                            <TableCell align="right">Importe</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            insumosProcesados.map( (op, i) => (
                                                                <TableRow key={i}>
                                                                    <TableCell>{op.insumo.compraItem.producto.descripcion}</TableCell>
                                                                    <TableCell align="right">{op.cantidad}</TableCell>
                                                                    <TableCell align="right">{op.importe}</TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                        <TableRow>
                                                            <TableCell colSpan={2}>
                                                                Total:
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography align="right" children={formatNumber(sumaImporteInsumos,2)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
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
                                                <Typography variant="h5">Producido</Typography>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Producto</TableCell>
                                                            <TableCell align="right">Cantidad.</TableCell>
                                                            <TableCell align="right">Costo producción</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        
                                                                <TableRow >
                                                                    <TableCell>{productoProcesado.producto.descripcion}</TableCell>
                                                                    <TableCell align="right">{productoProcesado.cantidad}</TableCell>
                                                                    <TableCell align="right">{formatNumber(productoProcesado.costo,2)}</TableCell>
                                                                </TableRow>
                                                        
                                                    </TableBody>
                                                </Table>
                                            </div>

                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            productoProcesado === null ?
                                            null
                                            :
                                            <div>
                                                <Button 
                                                    onClick={clearVariables}
                                                    variant="contained">
                                                        cancelar
                                                </Button>
                                                <Button 
                                                    onClick={handleRegistrar}
                                                    variant="contained">
                                                    registrar
                                                </Button>
                                            </div>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Grid>
                }
            </DialogContent>
        </Dialog>
    )
}

export default Procesar