import React, { useState, useContext } from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import useStyles from '../hooks/useStyles'
import { UbicacionContext } from '../ubicaciones/UbicacionContext';
import { EmpleadoContext } from './EmpleadoContext';
import { useAuth } from '../auth/use_auth';
import { useSnackbar } from 'notistack'
const nempleado = {
    nombre: '',
    area: "",
    level: "",
    edad: 0,
    sexo: '',
    direccion: "",
    telefono: "",
    email: "",
    instagram: "",
    facebook: "",
    password: "", 
    ubicacion: '',
    sueldo:0,
    periodo: ""
}
const areas = [
    {level: 2, area: "ADMINISTRACIÓN"},
    {level: 3, area: "ALMACÉN"},
    {level: 4, area: "CAJAS"},
    {level: 5, area: "GENERAL"},
]
const periodos = [
    "SEMANAL",
    "QUINCENAL",
    "MENSUAL",
]
const CrearEmpleado = ({open, close}) =>{
    const {user} = useAuth()
    const {empleados, addEmpleado} = useContext(EmpleadoContext)
    const { enqueueSnackbar } = useSnackbar()
  const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const classes = useStyles()
    const {ubicacions} = useContext(UbicacionContext)
    const [empleado, setEmpleado] = useState(nempleado)
    const [working, setWorking] = useState(false)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        setWorking(true)
        if(empleados.length <30){
            addEmpleado(user, empleado).then(res => {
                setEmpleado(nempleado)
                showMessage(res.message, res.status)
                close()      
                setWorking(false)          
            })
            .catch(err=>{
                showMessage(err.message, 'error')
                setWorking(false)
            })
        }else{
            showMessage('M&aacute;ximo de empleados alcanzado', 'error')
        }
    }

    const handleChange = (field, value) => {
        switch(field){
            case 'periodo':
                if(value==="SEMANAL"){
                    let smensual = empleado.sueldo * 4
                    setEmpleado({...empleado, sueldo: smensual, periodo: "MENSUAL"})
                }
                if(value==="QUINCENAL"){
                    let smensual = empleado.sueldo * 2
                    setEmpleado({...empleado, sueldo: smensual, periodo: "MENSUAL"})
                }
                setEmpleado({...empleado, periodo: value})
                break
            case 'area':
                return setEmpleado({...empleado, area: value, level: value.level})
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
                        <Grid item xs={12} sm={8}>
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
                        <Grid item xs={6} sm={2}>
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
                        <Grid item xs={6} sm={2}>
                            <TextField 
                                id="sexo"
                                select
                                fullWidth
                                label="Sexo"
                                variant="outlined"
                                value={empleado.sexo}
                                onChange={(e) => handleChange('sexo', e.target.value)}
                            >
                                <MenuItem key="h" value="H">HOMBRE</MenuItem>
                                <MenuItem key="m" value="M">MUJER</MenuItem>
                                <MenuItem key="o" value="O">LGBT+</MenuItem>
                            </TextField>

                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id="area"
                                fullWidth
                                select
                                label="Area"
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
                        <Grid item xs={8}>
                            <TextField 
                                id="sueldo"
                                fullWidth
                                label="Sueldo"
                                type="number"
                                variant="outlined"
                                value={empleado.sueldo}
                                onChange={(e) => handleChange('sueldo', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                id="periodo"
                                fullWidth
                                label="Periodo"
                                select
                                variant="outlined"
                                value={empleado.periodo}
                                onChange={(e) => handleChange('periodo', e.target.value)}
                            >
                                {periodos.map((periodo, i)=>(
                                    <MenuItem value={periodo} key={i}>{periodo}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="ubicacion"
                                select
                                fullWidth
                                label="Asigna una ubicación"
                                variant="outlined"
                                value={empleado.ubicacion}
                                onChange={(e) => handleChange('ubicacion', e.target.value)}
                                >
                                {ubicacions.map((ub, i)=>(
                                    <MenuItem key={i} value={ub}>
                                        {ub.nombre}
                                    </MenuItem>
                                ))

                                }
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
                    {!working ? <Button type="submit" className={classes.botonGenerico}>Registrar</Button> : <CircularProgress size={25} /> }
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CrearEmpleado