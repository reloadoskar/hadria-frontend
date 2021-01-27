import React from 'react'
import moment from 'moment'
import useStyles from '../hooks/useStyles'

import { Container, MenuItem, Button, Grid, Card, CardHeader, CardContent, TextField, } from '@material-ui/core';

export default function PosAcceso({ubicacions, ubicacion, fecha, checkCorte, handleChange, invUbic}){
    const classes = useStyles();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        checkCorte()
    }
    
    return (
        <Container maxWidth="sm">
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
                        value={ubicacion}
                        // onChange={(e) => setUbicacion(e.target.value)}
                        onChange={(e) => handleChange('ubicacion',e.target.value)}
                        >
                        {ubicacions.map((option, index) =>{ 
                            if(option.tipo=== 'SUCURSAL'){
                                return (
                                    <MenuItem key={index} value={option}>
                                        {option.nombre}
                                    </MenuItem>
                                )
                            }else{
                                return false
                            }
                        })}
                    </TextField>

                    <TextField
                            id="fecha"
                            type="date"
                            value={fecha}
                            fullWidth
                            margin="normal"
                            variant="outlined"                             
                            onChange={e => handleChange('fecha', e.target.value)}
                        />
                    
                    
                    <Grid container justify="flex-end">
                        <Button 
                            fullWidth
                            className={ invUbic === null ? classes.botonGenerico : classes.botonCosmico}
                            disabled={invUbic === null ? true : false }
                            type="button" 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            onClick={(e) => handleSubmit(e)}>Acceder</Button>
                    </Grid>

                    </form>
                </CardContent>
            </Card>
            </Container>
    )
}