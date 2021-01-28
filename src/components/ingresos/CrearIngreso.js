import React, {useState} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle,  Grid, TextField, MenuItem, Button, Typography, Zoom } from '@material-ui/core'
import moment from 'moment'
import useStyles from '../hooks/useStyles'

const hoy = moment().format("YYYY-MM-DD")
const init = {
    ubicacion: "",
    fecha: hoy,
    descripcion: "",
    importe: "",
    tipoPago: "EFECTIVO",
    concepto: "INGRESO"
}
export default function CrearIngreso(props) {
    const {open, close, crear, ubicacions, mensaje} = props
    const classes = useStyles()
    const [ingreso, setIngreso] = useState(init)
    const [guardando, setGuardando] = useState(false)
    const resetFields = () => {
        setIngreso(init)
    }
    const handleClose = () => {
        resetFields()
        close()
    }
    const handleChange = (field, value) => {
        switch(field){
            default:
                return setIngreso({...ingreso, [field]: value})
        }
    }
    const handleRegistrar = () => {
        setGuardando(true)
        crear(ingreso).then(res=>{
            mensaje(res.message, res.status)
            setIngreso(init)
            setGuardando(false)
            close()
        })
    }
    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth="sm"
        >
            <DialogTitle>Crear Ingreso</DialogTitle>
            {
                guardando === true ?
                    <Zoom in={guardando}>
                        <Typography align="center" variant="h5">Guardando...</Typography>
                    </Zoom>
                :
                    <DialogContent>
                        {/* <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="concepto"
                                    label="Selecciona una opción"
                                    select
                                    required
                                    fullWidth
                                    value={ingreso.concepto}
                                    onChange={(e) => handleChange('concepto', e.target.value)}
                                >
                                    <MenuItem value="INGRESO">
                                        INGRESO EN CAJA
                                    </MenuItem>
                                    <MenuItem value="PRESTAMO">
                                        PRESTAMO 
                                    </MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                            {
                            ingreso.concepto === "INGRESO" ? */}
                            <Grid container sapacing={2} >
                                <Grid item xs={12}>
                                    <TextField
                                        id="ubicacion"
                                        label="Selecciona una Ubicación"
                                        select
                                        required
                                        fullWidth
                                        value={ingreso.ubicacion}                                
                                        onChange={(e) => handleChange('ubicacion', e.target.value)}
                                    >
                                        {ubicacions.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        id="fecha"
                                        label="Fecha"
                                        type="date"
                                        fullWidth
                                        value={ingreso.fecha}
                                        onChange={(e) => handleChange('fecha', e.target.value)}
                                    />
                                    </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        id="descripcion"
                                        label="Descripción"
                                        fullWidth
                                        value={ingreso.descripcion.toUpperCase()}
                                        onChange={(e) => handleChange('descripcion', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        id="importe"
                                        label="Importe"
                                        type="number"
                                        fullWidth
                                        value={ingreso.importe}
                                        onChange={(e) => handleChange('importe', e.target.value)}
                                    />
                                </Grid>

                            </Grid>
                            {/* :
                            null
                            } */}
                    </DialogContent>
            }

            <DialogActions>
                <Button 
                    onClick={handleClose}
                    color="secondary"
                >
                    cancelar
                </Button>
                <Button 
                    className={classes.botonMagico}
                    disabled = {ingreso.importe === "" || ingreso.ubicacion === "" || ingreso.fecha === "" || guardando === true ? true : false }
                    onClick={handleRegistrar}
                    variant="contained">
                    registrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}