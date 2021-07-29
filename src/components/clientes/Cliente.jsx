import React, {useState, useEffect} from 'react'
import { TextField, Grid, Card, CardContent, CardMedia, Typography, CardActions, IconButton } from '@material-ui/core'
import avatarh from '../../img/avatarH1.png'
import avatarm from '../../img/avatarM2.png'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../hooks/useStyles'
export default function Cliente({cliente, update}){
    const classes = useStyles()
    const [editMode, setEditMode] = useState(false)
    const [elCliente, setElCliente] = useState(false)
    useEffect(()=>{
        if(cliente){
            setElCliente(cliente)
        }
        return () => setElCliente(false)
    },[cliente])
    const handleChange = (type, value) => {
        switch (type) {
            default:
                setElCliente({...elCliente, [type]: value})
                break;
        }
    }
    const upd = (client) => {
        update(elCliente).then(res=>{
            setEditMode(false)
        })
    }
    return(
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardMedia
                    className={classes.media}
                    image={elCliente.sexo === 'M' ? avatarm : avatarh}
                />
                <CardContent>
                    {!editMode ? 
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" >{elCliente.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>{elCliente.tel1}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>{elCliente.email}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="right">l&iacute;mite {elCliente.limite_de_credito}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="right">Disponible {elCliente.credito_disponible}</Typography>
                            </Grid>
                        </Grid>                        
                        :
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elCliente.nombre}
                                    onChange={(e) => handleChange('nombre',e.target.value)}
                                />  
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="rfc"
                                    label="RFC"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elCliente.rfc}
                                    onChange={(e) => handleChange('rfc',e.target.value)}
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
                                    value={elCliente.direccion}
                                    onChange={(e) => handleChange('direccion',e.target.value)}
                                />  
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="telefono"
                                    label="Tel&eacute;fono"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elCliente.tel1}
                                    onChange={(e) => handleChange('tel1',e.target.value)}
                                /> 
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="email"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elCliente.email}
                                    onChange={(e) => handleChange('email',e.target.value)}
                                /> 
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="dias"
                                    label="Plazo de cr&eacute;dito"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elCliente.dias_de_credito}
                                    onChange={(e) => handleChange('dias_de_credito',e.target.value)}
                                /> 
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="limite"
                                    label="L&iacute;mite de cr&eacute;dito"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elCliente.limite_de_credito}
                                    onChange={(e) => handleChange('limite_de_credito',e.target.value)}
                                /> 
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="disponible"
                                    label="Cr&eacute;dito disponible"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elCliente.credito_disponible}
                                    onChange={(e) => handleChange('credito_disponible',e.target.value)}
                                /> 
                            </Grid>
                        </Grid>
                    }
                </CardContent>
                <CardActions>
                    {editMode ?
                        <React.Fragment>
                            <IconButton onClick={()=>upd(elCliente)}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton onClick={()=>setEditMode(false)}>
                                <CloseIcon />
                            </IconButton>
                        </React.Fragment>
                        :
                        <IconButton onClick={()=>setEditMode(true)}>
                            <EditIcon />
                        </IconButton>
                    }
                </CardActions>
            </Card>
        </Grid>
    )
}