import React, { useState, useContext, useEffect } from 'react'
import Pesadas from './Pesadas'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography, TextField, Button } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import { formatNumber } from '../Tools'
import { UbicacionContext } from '../ubicaciones/UbicacionContext'
import { useInventario } from './InventarioContext'
import { PesadasContext } from './PesadasContext'
import { useSnackbar } from 'notistack'
import moment from 'moment'
import { useAuth } from '../auth/use_auth'
const init = {
    origen: '',
    fecha: moment().format('YYYY-MM-DD'),
    origensel: '',
    destino: '',
    clasificacion: "LINEA",
    itemsel: '',
    itemselcantidad: 0,
    itemselempaques: '',
    comentario: ''
}
export default function Mover({ open, close, inventario }) {
    const {user} = useAuth()
    const classes = useStyles()
    const { lista, tara, ttara, bruto, neto, clearLista} = useContext(PesadasContext)
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const [movimiento, setMovimiento] = useState(init)
    // const [pesadas, setPesadas] = useState([])
    const { ubicacions } = useContext(UbicacionContext)
    const { moverInventario} = useInventario()
    const [guardando, setGuardando] = useState(false)
    const [clasificacions] = useState([
        "LINEA",
        "MAYOREO",
        "MENUDEO",
        "CASCADO"
    ])

    useEffect(()=>{
        setMovimiento({...movimiento,
            itemselcantidad: neto.toFixed(2),
            // itemselcantidad: formatNumber(neto,2),
            itemselempaques: lista.length
        })
    },[lista, neto]) // eslint-disable-line react-hooks/exhaustive-deps
    const handleChange = (field, value) => {
        switch (field) {
            case "origen":
                setMovimiento({ ...movimiento, origen: value._id, origensel: value })
                break;
            case "itemselcantidad":
                if (parseFloat(value) > movimiento.itemsel.stock) {
                    setMovimiento({ ...movimiento, itemselcantidad: 0 })
                } else {
                    setMovimiento({ ...movimiento, itemselcantidad: value })
                }
                break
            case "itemselempaques":
                if (value > movimiento.itemsel.empaquesStock) {
                    setMovimiento({ ...movimiento, itemselempaques: '' })
                } else {
                    setMovimiento({ ...movimiento, itemselempaques: value })
                }
                break
            case "comentario":
                setMovimiento({...movimiento, comentario: value.toUpperCase()})
                break
            default:
                setMovimiento({ ...movimiento, [field]: value })
                break;
        }
    }
    
    const handleReset = () => {
        setMovimiento(init)
        clearLista()
    }
    const validar = (mov) => {
        var valid = false
        if (mov.origen === '') { return valid }
        if (mov.destino === '') { return valid }
        if (mov.itemselcantidad <= 0) { return valid }
        if (mov.itemselempaques <= 0) { return valid }
        else { valid = true }
        return valid
    }
    const handleClose = () => {
        handleReset()
        return close()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setGuardando(true)
        movimiento.pesadas=lista
        movimiento.tara=tara
        movimiento.ttara=ttara
        movimiento.bruto=bruto
        movimiento.neto=neto
        if (validar(movimiento)) {
            moverInventario(user, movimiento)
            .then(res => {
                showMessage(res.message,res.status)
                setGuardando(false)
                clearLista()                
                handleClose()
            })
            .catch(err=>{
                showMessage(err.message, 'error')
                setGuardando(false)
            })
        } else {
            setGuardando(false)
        }
        return false
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Mover inventario</DialogTitle>
            <DialogContent>
                {guardando === true ?
                    <Typography variant="h6" align="center" >Guardando...</Typography>
                    :
                    inventario !== null ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    id="origen"
                                    label="Origen"
                                    fullWidth
                                    variant="outlined"
                                    value={movimiento.origensel}
                                    onChange={(e) => handleChange('origen', e.target.value)}
                                >
                                    <MenuItem value=""></MenuItem>
                                    {inventario.map((option, index) => (

                                        <MenuItem key={index} value={option}>
                                            {option.ubicacion.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="destino"
                                    select
                                    label="Destino"
                                    fullWidth
                                    variant="outlined"
                                    value={movimiento.destino}
                                    onChange={(e) => handleChange('destino', e.target.value)}
                                >
                                    {ubicacions.filter(ub=>ub.tipo === "SUCURSAL").map((ub, i) => (
                                        <MenuItem key={i} value={ub}>
                                            {ub.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {movimiento.origen === '' ?
                                null
                                :
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="itemsel"
                                            select
                                            label="Selecciona un producto"
                                            fullWidth
                                            variant="outlined"
                                            value={movimiento.itemsel}
                                            onChange={(e) => handleChange('itemsel', e.target.value)}
                                        >
                                            {movimiento.origensel.items.filter(i => i.stock >= 1 && i.empaquesStock >= 0.5).map((itm, i) => (
                                                <MenuItem key={i} value={itm}>
                                                    <Grid container >
                                                        <Grid item xs={12} sm={6}>
                                                            #{itm.compra.folio} - {itm.producto.descripcion} {itm.clasificacion}
                                                        </Grid>
                                                        <Grid item xs={12} sm={3}>
                                                            <Typography variant="body2" align="right">
                                                                {itm.producto.empaque.abr}: {formatNumber(itm.empaquesStock, 2)}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={3}>
                                                            <Typography variant="body2" align="right">
                                                                {itm.producto.unidad.abr}: {formatNumber(itm.stock, 2)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </MenuItem>
                                            ))
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="clasificacion"
                                            label="Clasificaci&oacute;n"
                                            select
                                            fullWidth
                                            variant="outlined"
                                            value={movimiento.clasificacion}
                                            onChange={(e) => handleChange('clasificacion', e.target.value)}
                                            >
                                            {clasificacions.map((opt,i)=>(
                                                <MenuItem value={opt} key={i}>
                                                    {opt}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            }
                            {movimiento.itemsel === '' ?
                                null
                                :
                                <React.Fragment>
                                    <Grid item xs={12} md={4}>
                                        <Pesadas item={movimiento.itemsel}/>
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <TextField
                                            id="itemselempaques"
                                            label={movimiento.itemsel === '' ? "Empaques" : movimiento.itemsel.producto.empaque.abr}
                                            type="number"
                                            fullWidth
                                            required
                                            variant="outlined"
                                            value={movimiento.itemselempaques}
                                            onChange={(e) => handleChange('itemselempaques', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <TextField
                                            id="itemselcantidad"
                                            label={movimiento.itemsel === '' ? "Unidades" : movimiento.itemsel.producto.unidad.abr}
                                            fullWidth
                                            required
                                            type="number"
                                            variant="outlined"
                                            value={movimiento.itemselcantidad}
                                            onChange={(e) => handleChange('itemselcantidad', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            id="comentario"
                                            label="Comentario"
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            value={movimiento.comentario}
                                            onChange={(e) => handleChange('comentario', e.target.value)}
                                        />
                                    </Grid>
                                </React.Fragment>
                            }
                        </Grid>
                        :
                        null
                }
            </DialogContent>
            <DialogActions>
                <Button className={classes.botonSimplon} onClick={handleReset}>Empezar de nuevo</Button>
                <Button
                    disabled={guardando === true ? true : false}
                    onClick={handleSubmit}
                    className={classes.botonCosmico}
                >Mover</Button>
            </DialogActions>
        </Dialog>
    )
}