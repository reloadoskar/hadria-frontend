import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import { Card, CardHeader, CardContent, Grid, CardActions, TextField, Button, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {useEmpaques} from '../hooks/useEmpaques'
import useStyles from '../hooks/useStyles'
import { useAuth } from '../auth/use_auth';
const Empaques = () => {
    const {user} = useAuth()
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const { empaques, add, del } = useEmpaques()
    const [values, setValues] = useState({ empaque: '', abr: '' })
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    const handleChange = (field, value) => {
        setValues({ ...values, [field]: value })
    }

    const addEmpaque = (empaque) => {
        add(user, empaque).then( res  => {
            showMessage(res.message, res.status)
            setValues({empaque: '', abr: ''})
        })
        .catch(err=>{
            showMessage(err.message, 'error')
        })
    }

    const delEmpaque = (id, index) => {
        del(user, id, index).then( res => {
            showMessage(res.message, res.status)
        }).catch(err=>{
            showMessage(err.message, 'error')
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="Empaques"></CardHeader>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="empaque"
                                            label="Nuevo Empaque"
                                            fullWidth
                                            variant="outlined"
                                            value={values.empaque}
                                            onChange={(e) => handleChange('empaque', e.target.value)}
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
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button className={classes.botonGenerico} onClick={() => addEmpaque(values)} disabled={values.empaque === '' || values.abr === '' ? true : false}>Agregar</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="Empaques" />
                    <CardContent>
                        {empaques.length === 0 ?
                            <Typography variant="h6" align="center" children="No encontré empaques." />
                            :
                            <React.Fragment>
                                <Grid container spacin={2}>
                                    {empaques.map((el, index) => (
                                        <Grid container key={index} spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography children={el.empaque + "(" + el.abr + ")"} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <IconButton align="right" children={<DeleteIcon />} onClick={() => delEmpaque(el._id, index)} />
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

export default Empaques