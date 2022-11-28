import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { Grid, Typography, IconButton, TextField, MenuItem, CircularProgress } from '@material-ui/core'
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from '../auth/use_auth';
import { useProductos } from './ProductosContext';
export default function Producto({ producto, unemp }) {
    const { user } = useAuth()
    const { editProducto } = useProductos()
    const classes = useStyles()
    const [editMode, setEditMode] = useState(false)
    const [elProd, setElProd] = useState(false)
    const [guardando, setGuardando] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    useEffect(() => {
        if (producto) {
            setElProd(producto)
        }
        return () => setElProd(false)
    }, [producto])

    const handleChange = (type, value) => {
        switch (type) {
            default:
                setElProd({ ...elProd, [type]: value })
                break;
        }
    }
    const updProd = () => {
        setGuardando(true)
        editProducto(user, elProd).then(res => {
            showMessage(res.message, res.status)
            setEditMode(false)
            setGuardando(false)
        }).catch(err => {
            setGuardando(false)
            showMessage(err.message, 'error')
        })
    }
    return elProd ?
        <Grid item xs={12} container className={classes.paperContorno}>
            {!editMode ?
                <React.Fragment>
                    <Grid item xs={12} sm={4} >
                        <Typography className={classes.textoMiniFacheron} >{elProd.clave} </Typography>
                        <Typography>{elProd.descripcion}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={1} ><Typography className={classes.textoMiniFacheron} children="costo: " align="right" /><Typography align="right" children={"$" + formatNumber(elProd.costo, 1)} /></Grid>
                    <Grid item xs={12} sm={2} ><Typography className={classes.textoMiniFacheron} children="Precio de lista: " align="right" /><Typography align="right" children={"$" + formatNumber(elProd.precio1, 1)} /></Grid>
                    <Grid item xs={12} sm={2} ><Typography className={classes.textoMiniFacheron} children="Precio Mayoreo: " align="right" /><Typography align="right" children={"$" + formatNumber(elProd.precio2, 1)} /></Grid>
                    <Grid item xs={12} sm={2} ><Typography className={classes.textoMiniFacheron} children="Precio Super Mayoreo" align="right" /><Typography align="right" children={"$" + formatNumber(elProd.precio3, 1)} /></Grid>
                    <Grid item xs={12} sm={1} >
                        <Typography component="div" align="center">
                            <IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton>
                        </Typography>
                    </Grid>
                </React.Fragment>
                :
                <Grid container >
                    <Grid item container xs={11} spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="clave"
                                label="Clave"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={elProd.clave}
                                onChange={(e) => handleChange('clave', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={9} >
                            <TextField
                                fullWidth
                                id="descripcion"
                                label="Descripci&oacute;n"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={elProd.descripcion}
                                onChange={(e) => handleChange('descripcion', e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                select
                                id="unidad"
                                label="Unidad"
                                type="text"
                                value={elProd.unidad || ""}
                                onChange={(e) => handleChange('unidad', e.target.value)}
                            >
                                {/* <MenuItem value={elProd.unidad || ""} >{elProd.unidad.unidad}</MenuItem> */}
                                {unemp.unidades.map((unidad, i) => (
                                    <MenuItem key={i} value={unidad}>
                                        {unidad.unidad}/{unidad.abr}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                select
                                id="empaque"
                                label="Empaque"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={elProd.empaque || ""}
                                onChange={(e) => handleChange('empaque', e.target.value)}
                            >
                                {/* <MenuItem value={elProd.empaque} >{elProd.empaque.empaque}</MenuItem> */}
                                {unemp.empaques.map((empaque, i) => (
                                    <MenuItem key={i} value={empaque}>
                                        {empaque.empaque}/{empaque.abr}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={3} >
                            <TextField
                                fullWidth
                                id="costo"
                                label="Costo"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={elProd.costo}
                                onChange={(e) => handleChange('costo', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="precio1"
                                label="Precio de lista"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={elProd.precio1}
                                onChange={(e) => handleChange('precio1', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="precio2"
                                label="Precio Mayoreo"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={elProd.precio2}
                                onChange={(e) => handleChange('precio2', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="precio3"
                                label="Precio Super Mayoreo"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={elProd.precio3}
                                onChange={(e) => handleChange('precio3', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                
                    <Grid item xs={1}>
                        <Typography component="div" align="center">
                            <IconButton
                                size="small"
                                onClick={() => updProd(elProd._id)}
                            >
                                {!guardando ? <CheckIcon /> : <CircularProgress size={30} />}
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => setEditMode(false)} >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>
            }
        </Grid>
        : null
}