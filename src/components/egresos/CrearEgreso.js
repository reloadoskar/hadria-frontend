import React, {useState, useEffect} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle,  Grid, TextField, MenuItem, Button, Zoom, Typography } from '@material-ui/core'
import {saveEgreso, ticketEgreso} from '../api'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
import useCompras from '../compras/useCompras'
const hoy = moment().format("YYYY-MM-DD")
const init = {
    compra: 1,
    ubicacion: "",
    fecha: hoy,
    descripcion: "",
    importe: "",
    saldo:0,
    tipoPago: "EFECTIVO",
    concepto: "",
    tipo: "GASTO DE CAJA"
}
export default function CrearEgreso(props) {
    const {open, close, ubicacions, disponible, mensaje} = props
    const Compra = useCompras() 
    const tipos = ["GASTO DE CAJA", "GASTO A COMPRA"] 
    const classes = useStyles()
    const [egreso, setEgreso] = useState(init)
    const [guardando, setGuardando] = useState(false)
    useEffect(() => {
        Compra.getCompDash()
    },[])
    const resetFields = () => {
        setEgreso(init)
    }
    const handleClose = () => {
        resetFields()
        close()
    }
    const handleChange = (field, value) => {
        switch(field){
            case "descripcion":
                return setEgreso({...egreso, [field]: value.toUpperCase()})
            case "importe":
                if(value > disponible){
                    mensaje("Cantidad no disponoble", 'error')
                    return (setEgreso({...egreso, [field]: disponible}))
                }else{
                    return setEgreso({...egreso, [field]: value})
                }
            default:
                return setEgreso({...egreso, [field]: value})
        }
    }
    const handleRegistrar = () => {
        setGuardando(true)
        saveEgreso(egreso).then(res=>{
            setGuardando(false)
            mensaje(res.message, res.status)
            ticketEgreso(egreso)
            handleClose()
        })
    }
    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth="sm"
        >
            <DialogTitle>Crear Egreso</DialogTitle>
            {
                guardando === true ? 
                    <Zoom in={guardando}>
                        <Typography variant="h5" align="center">Guardando...</Typography>
                    </Zoom>
                :
                    <DialogContent>
                        <Grid container spacing={2}>
                                <TextField
                                    id="tipo"
                                    select
                                    required
                                    fullWidth
                                    value={egreso.tipo}
                                    onChange={(e) => handleChange('tipo', e.target.value)}
                                    >
                                    {tipos.map((op,i) =>(
                                        <MenuItem key={i} value={op}>
                                            {op}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {egreso.tipo === "GASTO A COMPRA" ? 
                                    <TextField
                                        id="compra"
                                        label="Selecciona una compra"
                                        select
                                        fullWidth
                                        value={egreso.compra}
                                        onChange={(e) => handleChange('compra', e.target.value)}
                                        >
                                        {Compra.compras.map((option, index) => (
                                            <MenuItem key={index} value={option._id}>
                                                {option.folio}:{option.clave}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                        :
                                        null
                                    }
                                <TextField
                                    id="ubicacion"
                                    label="Selecciona una Ubicación"
                                    select
                                    required
                                    fullWidth
                                    value={egreso.ubicacion}
                                    onChange={(e) => handleChange('ubicacion', e.target.value)}
                                >
                                    {ubicacions.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField 
                                    id="fecha"
                                    label="Fecha"
                                    type="date"
                                    fullWidth
                                    value={egreso.fecha}
                                    onChange={(e) => handleChange('fecha', e.target.value)}
                                />
                                <TextField 
                                    id="descripcion"
                                    label="Descripción"
                                    fullWidth
                                    value={egreso.descripcion}
                                    onChange={(e) => handleChange('descripcion', e.target.value)}
                                />
                                <TextField 
                                    id="importe"
                                    label="Importe"
                                    type="number"
                                    fullWidth
                                    value={egreso.importe}
                                    onChange={(e) => handleChange('importe', e.target.value)}
                                />

                        </Grid>
                    </DialogContent>
            }
            <DialogActions>
                <Button 
                    onClick={handleClose}
                >
                    cancelar
                </Button>
                <Button 
                    className={classes.botonGenerico}
                    disabled = {egreso.importe === "" || egreso.ubicacion === "" || egreso.fecha === "" || guardando===true ? true : false }
                    onClick={handleRegistrar}
                    variant="contained">
                    registrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}