import React, {useState, useEffect} from 'react'
import { Grid, Box, Typography, Card, CardContent, IconButton, TextField, MenuItem } from '@material-ui/core'
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useUnidades from '../hooks/useUnidades'
import useEmpaques from '../hooks/useEmpaques'
export default function Producto({producto, update}){
    const classes = useStyles()
    const [editMode, setEditMode] = useState(false)
    const [elProd, setElProd] = useState(false)
    const Unidad = useUnidades()
    const Empaque = useEmpaques()
    useEffect(()=>{
        if(producto){
            setElProd(producto)
        }
        return () => setElProd(false)
    },[producto])

    const handleChange = (type, value) => {
        switch (type) {
            default:
                setElProd({...elProd, [type]: value})
                break;
        }
    }
    const updProd = (prod) => {
        update(prod, elProd).then(res=>{
            setEditMode(false)
        })
    }
    return elProd ?
        <Card>
            <CardContent>
                <Grid item xs={12} container >
                    {!editMode ? 
                        <React.Fragment>
                            <Grid item xs={12} sm={4} ><Typography children={elProd.clave+"-"+elProd.descripcion} /></Grid>
                            <Grid item xs={12} sm={1} ><Typography className={classes.textoMiniFacheron} children="costo: " align="right" /><Typography align="right" children={"$"+formatNumber(elProd.costo,1)} /></Grid>
                            <Grid item xs={12} sm={2} ><Typography className={classes.textoMiniFacheron} children="Precio de lista: " align="right" /><Typography align="right" children={"$"+formatNumber(elProd.precio1,1)} /></Grid>
                            <Grid item xs={12} sm={2} ><Typography className={classes.textoMiniFacheron} children="Precio Mayoreo: " align="right" /><Typography align="right" children={"$"+formatNumber(elProd.precio2,1)} /></Grid>
                            <Grid item xs={12} sm={2} ><Typography className={classes.textoMiniFacheron} children="Precio Super Mayoreo" align="right" /><Typography align="right" children={"$"+formatNumber(elProd.precio3,1)} /></Grid>
                            <Grid item xs={12} sm={1} >
                                <Typography component="div" align="center">
                                    <IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton>
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    :
                    <React.Fragment>
                        <Grid item xs={12} sm={4} >
                            <Grid item xs={12} container>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="descripcion"
                                        label="Descripci&oacute;n"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={elProd.descripcion}
                                        onChange={(e) => handleChange('descripcion',e.target.value)}
                                    />    
                                </Grid>
                                
                                <Grid item xs={4} sm={4} >
                                    <TextField
                                        fullWidth
                                        id="clave"
                                        label="Clave"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={elProd.clave}
                                        onChange={(e) => handleChange('clave',e.target.value)}
                                    />    
                                </Grid>

                                <Grid item xs={4} sm={4} >
                                    <TextField
                                        fullWidth
                                        select
                                        id="unidad"
                                        label="Unidad"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={elProd.unidad}
                                        onChange={(e) => handleChange('unidad',e.target.value)}
                                    >
                                        {Unidad.unidades.map((unidad,i)=>(
                                            <MenuItem key={i} value={unidad}>
                                            {unidad.unidad}/{unidad.abr}
                                            </MenuItem>
                                        ))}
                                    </TextField>    
                                </Grid>
                                
                                <Grid item xs={4} sm={4} >
                                    <TextField
                                        fullWidth
                                        select
                                        id="empaque"
                                        label="Empaque"
                                        type="text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={elProd.empaque}
                                        onChange={(e) => handleChange('empaque',e.target.value)}
                                    >
                                        {Empaque.empaques.map((empaque,i)=>(
                                            <MenuItem key={i} value={empaque}>
                                            {empaque.empaque}/{empaque.abr}
                                            </MenuItem>
                                        ))}
                                    </TextField>    
                                </Grid>
                            </Grid>
                        </Grid>                        

                        <Grid item xs={12} sm={1} >
                            <TextField
                                fullWidth
                                id="costo"
                                label="Costo"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={elProd.costo}
                                onChange={(e) => handleChange('costo',e.target.value)}
                            /> 
                        </Grid>
                            <Grid item xs={12} sm={2} >
                                <TextField
                                    fullWidth
                                    id="precio1"
                                    label="Precio de lista"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elProd.precio1}
                                    onChange={(e) => handleChange('precio1',e.target.value)}
                                /> 
                            </Grid>
                            <Grid item xs={12} sm={2} >
                                <TextField
                                    fullWidth
                                    id="precio2"
                                    label="Precio Mayoreo"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elProd.precio2}
                                    onChange={(e) => handleChange('precio2',e.target.value)}
                                /> 
                            </Grid>
                            <Grid item xs={12} sm={2} >
                            <TextField
                                    fullWidth
                                    id="precio3"
                                    label="Precio Super Mayoreo"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={elProd.precio3}
                                    onChange={(e) => handleChange('precio3',e.target.value)}
                                /> 
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Typography component="div" align="center">
                                    <IconButton 
                                        onClick={()=>updProd(elProd._id)}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton onClick={()=>setEditMode(false)} >
                                        <CloseIcon />
                                    </IconButton>
                                </Typography>
                            </Grid>
                    </React.Fragment>
                    }
                </Grid>
            </CardContent>
        </Card>
    :
    null
}