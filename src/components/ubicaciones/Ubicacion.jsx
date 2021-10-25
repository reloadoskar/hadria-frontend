import React, { useEffect, useState } from 'react'
import { Grid, Typography, IconButton, TextField, MenuItem } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export default function Ubicacion({ubicacion, update}){
    const [editMode, setEditMode] = useState(false)
    const [laUbic, setLaubic] = useState(false)
    const tipos = ["SUCURSAL", "ADMINISTRACIÓN", "BANCO", "BODEGA/ALMACÉN"]
    const classes = useStyles()

    useEffect(()=>{
        if(ubicacion){
            setLaubic(ubicacion)
        }
        return () => setLaubic(false)
    },[ubicacion])

    const handleChange = (type, value) => {
        switch (type) {
            default:
                setLaubic({...laUbic, [type]: value})
                break;
        }
    }

    const updUbic = (ubic) => {
        update(ubic).then(res=>{
            setEditMode(false)
        })
    }
    return laUbic ?
        <Grid item xs={12} container>
            <Grid item xs={12} sm={5}>
                {editMode ? 
                    <React.Fragment>
                        <TextField
                            fullWidth
                            id="nombre"
                            label="Nombre"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={laUbic.nombre}
                            onChange={(e) => handleChange('nombre',e.target.value)}
                        />
                        <TextField
                            fullWidth
                            select
                            id="tipo"
                            label="Tipo de ubicaci&oacute;"
                            value={laUbic.tipo}
                            onChange={(e) => handleChange('tipo',e.target.value)}
                        >
                            {tipos.map((tipo,i) =>(
                                <MenuItem key={i} value={tipo} >
                                    {tipo}
                                </MenuItem>
                            ))}
                        </TextField>
                    </React.Fragment>
                :
                <React.Fragment>
                    <Typography className={classes.textoMiniFacheron}>
                        {laUbic.tipo}
                    </Typography>
                    <Typography >
                        {laUbic.nombre}
                    </Typography>
                </React.Fragment>
            }
            </Grid>
        

            <Grid item xs={12} sm={5}>
                {editMode ? 
                    <React.Fragment>
                        <TextField
                            fullWidth
                            id="direccion"
                            label="Direcci&oacute;n"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={laUbic.direccion}
                            onChange={(e) => handleChange('direccion',e.target.value)}
                        />
                        <TextField
                            fullWidth
                            id="telefono"
                            label="Tel&eacute;fono"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={laUbic.telefono}
                            onChange={(e) => handleChange('telefono',e.target.value)}
                        />
                    </React.Fragment>
                :
                <React.Fragment>
                    <Typography className={classes.textoMiniFacheron} align="right" >
                        Direcci&oacute;n:
                    </Typography> 
                    <Typography align="right" >
                        {laUbic.direccion}
                    </Typography>
                    <Typography className={classes.textoMiniFacheron} align="right" >
                        Tel&eacute;fono:
                    </Typography>
                    <Typography align="right" >
                        {laUbic.telefono}
                    </Typography>
                </React.Fragment>
            }  
            </Grid>
        <Grid item xs={12} sm={2}>
            {editMode ?
                <Typography component="div" align="center">
                    <IconButton onClick={()=>updUbic(laUbic)}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={()=>setEditMode(false)} >
                        <CloseIcon />
                    </IconButton>

                </Typography>
                :
                <Typography component="div" align="center">
                    <IconButton
                        size="small"
                        onClick={() => setEditMode(true)}
                        >
                        <EditIcon />
                    </IconButton>
                </Typography>
            }
        </Grid>
        </Grid>

    :
        null
        
}