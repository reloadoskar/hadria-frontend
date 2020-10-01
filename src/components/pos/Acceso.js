import React  from 'react'
import moment from 'moment'

import useStyles from '../hooks/useStyles'

import { MenuItem, Button, Grid, Card, CardHeader, CardContent, TextField, CardActions, } from '@material-ui/core';

import useUbicacions from '../hooks/useUbicacions'

export default function PosAcceso({values, checkCorte, handleChange}){
    const classes = useStyles();
    const {ubicacions} = useUbicacions();
    const handleSubmit = (e) => {
        e.preventDefault()
        checkCorte()
    }
    return (
        <Card className={classes.posCard}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <CardHeader 
                    title="Selección de Ubicación"
                    subheader={"fecha del sistema: " + (
                        moment().format("dddd, DD MMMM [de] YYYY")
                        )}
                />
                <CardContent>

                    <TextField
                        id="ubicacion"
                        label="Selecciona una ubicación"
                        autoFocus
                        select
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={values.ubicacion}
                        // onChange={(e) => setUbicacion(e.target.value)}
                        onChange={(e) => handleChange('ubicacion',e.target.value)}
                        >
                        {ubicacions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option.nombre}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="fecha"
                        label="fecha"
                        type="date"
                        fullWidth
                        value={values.fecha}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => handleChange('fecha', e.target.value)}

                    />

                </CardContent>
                <CardActions>
                    <Grid container justify="flex-end">
                        <Button 
                            disabled={!values.ubicacion || !values.fecha ? true : false }
                            type="button" 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            onClick={(e) => handleSubmit(e)}>Acceder</Button>
                    </Grid>
                </CardActions>
            </form>
        </Card>
    )
}