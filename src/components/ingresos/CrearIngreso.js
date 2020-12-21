import React, {useState} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle,  Grid, TextField, MenuItem, Button } from '@material-ui/core'
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
        mensaje("Guardando...", "info")
        handleClose()
        crear(ingreso).then(res=>{
            mensaje(res.message, res.status)
        })
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
        >
            <DialogTitle>Crear Ingreso</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>

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
                        <TextField 
                            id="fecha"
                            label="Fecha"
                            type="date"
                            fullWidth
                            value={ingreso.fecha}
                            onChange={(e) => handleChange('fecha', e.target.value)}
                        />
                        <TextField 
                            id="descripcion"
                            label="Descripción"
                            fullWidth
                            value={ingreso.descripcion.toUpperCase()}
                            onChange={(e) => handleChange('descripcion', e.target.value)}
                        />
                        <TextField 
                            id="importe"
                            label="Importe"
                            type="number"
                            fullWidth
                            value={ingreso.importe}
                            onChange={(e) => handleChange('importe', e.target.value)}
                        />

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose}
                    color="secondary"
                >
                    cancelar
                </Button>
                <Button 
                    className={classes.botonMagico}
                    disabled = {ingreso.importe === "" || ingreso.ubicacion === "" || ingreso.fecha === "" ? true : false }
                    onClick={handleRegistrar}
                    variant="contained">
                    registrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}