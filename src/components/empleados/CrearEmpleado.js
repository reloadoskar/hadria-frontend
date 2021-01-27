import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import useStyles from '../hooks/useStyles'
const nempleado = {
    nombre: '',
    area: "",
    edad: 0,
    direccion: "",
    telefono: "0123456789",
    email: "",
    instagram: "",
    facebook: "",
    password: ""
}
const areas = [
    {level: 1, area: "ADMINISTRACIÓN"},
    {level: 2, area: "ALMACÉN"},
    {level: 3, area: "AUX. GENERAL"},
]
const CrearEmpleado = (props) =>{
    const {open, close, crear} = props
    const classes = useStyles()
    const [empleado, setEmpleado] = useState(nempleado)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        crear(empleado)
        setEmpleado(nempleado)
        close()
    }

    const handleChange = (field, value) => {
        switch(field){
            case 'nombre':
                return setEmpleado({...empleado, nombre: value.toUpperCase()})
            case 'direccion':
                return setEmpleado({...empleado, direccion: value.toUpperCase()})
            default:
                return setEmpleado({...empleado, [field]: value })
        }
    }
    return(
        <Dialog open={open} onClose={close}>
            <DialogTitle>Crear Empleado</DialogTitle>
            <form onSubmit={(e) => handleSubmit(e)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField 
                                id="nombre"
                                fullWidth
                                label="Nombre"
                                type="text"
                                variant="outlined"
                                value={empleado.nombre}
                                onChange={(e) => handleChange('nombre', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField 
                                id="edad"
                                fullWidth
                                label="Edad"
                                placeholder="18+"
                                type="number"
                                variant="outlined"
                                value={empleado.edad}
                                onChange={(e) => handleChange('edad', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="area"
                                fullWidth
                                select
                                label="Area"
                                type="text"
                                variant="outlined"
                                value={empleado.area}
                                onChange={(e) => handleChange('area', e.target.value)}
                            >
                                {areas.map((op,i) => (
                                    <MenuItem key={i} value={op}>
                                        {op.area}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="direccion"
                                fullWidth
                                label="Direccion"
                                placeholder="Av. Siempre Viva 123, Springfield, CA."
                                type="text"
                                variant="outlined"
                                value={empleado.direccion}
                                onChange={(e) => handleChange('direccion', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="telefono"
                                fullWidth
                                label="Teléfono (10 Dígitos)"
                                type="text"
                                variant="outlined"
                                value={empleado.telefono}
                                onChange={(e) => handleChange('telefono', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="email"
                                fullWidth
                                label="Correo Electrónico"
                                type="email"
                                variant="outlined"
                                value={empleado.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="password"
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={empleado.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="flex-end">
                                <Grid item xs={1}>
                                    <InstagramIcon />
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        id="instagram"
                                        fullWidth
                                        label="instagram.com/"
                                        type="text"
                                        variant="outlined"
                                        value={empleado.instagram}
                                        onChange={(e) => handleChange('instagram', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="flex-end">
                                <Grid item xs={1}>
                                    <FacebookIcon />
                                </Grid>
                                <Grid item xs>
                                    <TextField 
                                        id="facebook"
                                        fullWidth
                                        label="facebook.com/"
                                        type="text"
                                        variant="outlined"
                                        value={empleado.facebook}
                                        onChange={(e) => handleChange('facebook', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.botonSimplon} onClick={close}>Cancelar</Button>
                    <Button type="submit" className={classes.botonGenerico}>Registrar</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CrearEmpleado