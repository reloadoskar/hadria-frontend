import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import { Card, CardHeader, CardContent, Grid, TextField, CardActions, Button, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useUnidades from '../hooks/useUnidades'
import useStyles from '../hooks/useStyles'
const Unidades = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const {unidades, add, del} = useUnidades()
    const [values, setValues] = useState({unidad: '', abr: ''})
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    const handleChange = (field, value) => {
        setValues({...values, [field]: value})
    }

    const addUnidad = (values) => {
        add(values).then( res  => {
            showMessage(res.message, res.status)
            setValues({unidad: '', abr: ''})
        })
    }

    const delUnidad = (id, index) => {
        del(id, index).then( res => {
            showMessage(res.message, res.status)
        })
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="Agregar Unidad"></CardHeader>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="unidad"
                                            label="Nueva Unidad"
                                            fullWidth
                                            variant="outlined"
                                            value={values.unidad}
                                            onChange={(e) => handleChange('unidad', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="abr"
                                            label="Abreviación"
                                            fullWidth
                                            variant="outlined"
                                            value={values.abr}
                                            onChange={(e) => handleChange('abr', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button className={classes.botonGenerico} onClick={() => addUnidad(values)} disabled={ values.unidad === '' || values.abr === '' ? true : false}>Agregar</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="Unidades" />
                    <CardContent>
                        {unidades.length === 0 ?
                            <Typography variant="h6" align="center" children="No encontré unidades." />
                            :
                            <React.Fragment>
                                <Grid container spacin={2}>
                                    {unidades.map((el, index) => (                                        
                                        <Grid container key={index} spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography children={el.unidad + "(" + el.abr + ")"} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <IconButton align="right" children={<DeleteIcon />} onClick={() => delUnidad(el._id, index)} />
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </React.Fragment>
                        }
                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Unidades