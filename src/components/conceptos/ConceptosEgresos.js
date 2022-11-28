import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import {useConceptos} from '../hooks/useConceptos'
import { Card, CardHeader, Grid, TextField, CardContent, CardActions, Button, Typography, IconButton, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../hooks/useStyles'
import { useAuth } from '../auth/use_auth';

const ConceptosEgresos = () => {
    const {user} = useAuth()
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles()
    const {conceptos, add, del} = useConceptos()
    const [concepto, setConcepto] = useState('')
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    const [trabajando, setTrabajando] = useState(false)

    const handleChange = (value) => {
        setConcepto(value.toUpperCase())
    }

    const addConcepto = (concepto) => {
        var obj = {
            concepto: concepto
        }
        add(user, obj).then( res  => {
            showMessage(res.message, res.status)
            setTrabajando(false)
            setConcepto('')
        }).catch(err=>{
            showMessage(err.message,'error')
            setTrabajando(false)
        })
    }

    const delConcepto = (id, index) => {
        setTrabajando(true)
        del(user, id, index)
            .then( res => {
                setTrabajando(false)
                showMessage(res.message, res.status)
            }).catch(err=>{
                setTrabajando(false)
                showMessage(err.message, 'error')
            })
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card >
                    <CardHeader title="Agregar Concepto"></CardHeader>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md>
                                <TextField
                                    label="Nuevo Concepto"
                                    fullWidth
                                    variant="outlined"
                                    value={concepto}
                                    onChange={(e) => handleChange(e.target.value)}
                                ></TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                {!trabajando ? <Button className={classes.botonGenerico} onClick={() => addConcepto(concepto)} disabled={concepto === '' ? true : false}>Agregar</Button> : <CircularProgress size={30} /> }
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="Conceptos" />
                    <CardContent>
                        {conceptos.length === 0 ?
                            <Typography variant="h6" align="center" children="No encontré conceptos." />
                            :
                            <React.Fragment>
                                <Grid container spacin={2}>
                                    {conceptos.map((el, index) => (
                                        <Grid container key={index} spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography children={el.concepto} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                {!trabajando ?
                                                    <IconButton align="right" children={<DeleteIcon />} onClick={() => delConcepto(el._id, index)} />
                                                    : <CircularProgress size={30} />
                                                }
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </React.Fragment>
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ConceptosEgresos