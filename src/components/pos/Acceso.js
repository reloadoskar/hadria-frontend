import React, {useState} from 'react'
import moment from 'moment'

import useStyles from '../hooks/useStyles'

import { MenuItem, Button, Grid, Card, CardHeader, CardContent, TextField, } from '@material-ui/core';

import useUbicacions from '../hooks/useUbicacions'

import {
    DatePicker,
    MuiPickersUtilsProvider,
    } from "@material-ui/pickers";

import MomentUtils from '@date-io/moment';
import "moment/locale/es";

export default function PosAcceso({values, checkCorte, handleChange}){
    const classes = useStyles();
    const {ubicacions} = useUbicacions();
    const [locale] = useState("es")
    const handleSubmit = (e) => {
        e.preventDefault()
        checkCorte()
    }
    return (
        <Card className={classes.posCard}>
                <CardHeader 
                    title="Selección de Ubicación"
                    subheader={"fecha del sistema: " + (
                        moment().format("dddd, DD MMMM [de] YYYY")
                        )}
                />
                <CardContent>
                    <form onSubmit={(e) => handleSubmit(e)}>

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

                    <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
                        <DatePicker
                            value={values.fecha}
                            fullWidth
                            margin="normal"
                            variant="outlined" 
                            format="DD/MM/YYYY"
                            onChange={e => handleChange('fecha', e)}
                        />
                    </MuiPickersUtilsProvider>
                    
                    <Grid container justify="flex-end">
                        <Button 
                            disabled={!values.ubicacion || !values.fecha ? true : false }
                            type="button" 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            onClick={(e) => handleSubmit(e)}>Acceder</Button>
                    </Grid>

                    </form>
                </CardContent>
            </Card>
    )
}