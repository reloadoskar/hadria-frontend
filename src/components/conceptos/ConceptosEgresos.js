import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import useConceptos from '../hooks/useConceptos'
import { Card, CardHeader, Grid, TextField, CardContent, CardActions, Button, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ConceptosEgresos = () => {
    const { enqueueSnackbar } = useSnackbar()
    const {conceptos, add, del} = useConceptos()
    const [concepto, setConcepto] = useState('')
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    const handleChange = (value) => {
        setConcepto(value)
    }

    const addConcepto = (concepto) => {
        var obj = {
            concepto: concepto
        }
        add(obj).then( res  => {
            showMessage(res.message, res.status)
            setConcepto('')
        })
    }

    const delConcepto = (id, index) => {
        del(id, index).then( res => {
            showMessage(res.message, res.status)
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
                        <Grid container justify="flex-end">
                            <Grid item xs={12}>
                                <Button variant="contained" size="small" onClick={() => addConcepto(concepto)} disabled={concepto === '' ? true : false}>Agregar</Button>
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
                                                <IconButton align="right" children={<DeleteIcon />} onClick={() => delConcepto(el._id, index)} />
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