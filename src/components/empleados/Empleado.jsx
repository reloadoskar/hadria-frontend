import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Grid, Typography, Card, CardContent, CardMedia, CardActions, IconButton, TextField, MenuItem } from '@material-ui/core'
import avatarh from '../../img/avatarH1.png'
import avatarm from '../../img/avatarM2.png'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../hooks/useStyles'
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

export default function Empleado({data, update, ubicacions}){
    const [empleado, setEmpleado] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const classes = useStyles()
    const areas = ["GOD", "SUPERVISOR DEL SISTEMA", "ADMINISTRADOR", "ALMACEN", "CAJAS", "GENERAL"]
    useEffect(()=>{
        if(data){
            setEmpleado(data)
        }
        return () => setEmpleado(false)
    },[data])
    const handleChange = (type, value) => {
        switch (type) {
            default:
                setEmpleado({...empleado, [type]: value})
                break;
        }
    }
    const actualizaEmpleado = (empleado) => {
        update(empleado).then(res=>{
            setEditMode(false)
        })
    }
    return empleado ?
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card>
                <CardMedia
                    className={classes.media}
                    image={empleado.sexo === 'H' ? avatarh : avatarm}
                />
                {!editMode ?
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <Typography variant="h6" >{empleado.nombre}</Typography>
                                <Typography variant="h6" className={classes.textoMiniFacheron} >{areas[empleado.level]}</Typography>                                
                            </Grid>
                            <Grid item xs={3}>
                                <Typography >{empleado.edad}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Link
                                    className={classes.link}
                                    to='#'
                                    onClick={(e) => {
                                        window.location = "tel:+"+empleado.telefono;
                                        e.preventDefault();
                                    }}
                                >
                                    <Typography align="right">{empleado.telefono} <PhoneIcon /></Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link
                                    className={classes.link}
                                    to='#'
                                    onClick={(e) => {
                                        window.location = "mailto:+"+empleado.email;
                                        e.preventDefault();
                                    }}
                                >
                                    <Typography align="right">{empleado.email} <MailIcon /></Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.textoMiniFacheron} align="center">Ubicaci&oacute;n:</Typography>
                                <Typography align="center">{empleado.ubicacion.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.textoMiniFacheron} align="right">Sueldo:</Typography>
                                <Typography align="right">${empleado.sueldo}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    :
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <TextField
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={empleado.nombre}
                                    onChange={(e) => handleChange('nombre',e.target.value)}
                                />   
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="edad"
                                    label="Edad"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={empleado.edad}
                                    onChange={(e) => handleChange('edad',e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="direccion"
                                    label="Direcci&oacute;n"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={empleado.direccion}
                                    onChange={(e) => handleChange('direccion',e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="telefono"
                                    label="Tel&eacute;fono"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={empleado.telefono}
                                    onChange={(e) => handleChange('telefono',e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="email"
                                    type="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={empleado.email}
                                    onChange={(e) => handleChange('email',e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="ubicacion"
                                    select
                                    label="Ubicaci&oacute;n"
                                    type="Object"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={empleado.ubicacion}
                                    onChange={(e) => handleChange('ubicacion',e.target.value)}
                                >
                                    {ubicacions.map((ubicacion, i)=>(
                                        <MenuItem value={ubicacion} key={i}>
                                            {ubicacion.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="sueldo"
                                    label="Sueldo"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={empleado.sueldo}
                                    onChange={(e) => handleChange('sueldo',e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                }
                <CardActions>
                    {editMode ?
                        <Typography component="div" align="center">
                            <IconButton 
                                onClick={()=>actualizaEmpleado(empleado)}
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton onClick={()=>setEditMode(false)} >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                        :
                        <IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton>
                    }                    
                </CardActions>
            </Card>
        </Grid>
        :
        null
}