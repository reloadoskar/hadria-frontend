import React from 'react'
import moment from 'moment'
import useStyles from '../hooks/useStyles'

import { Container, MenuItem, Button, Grid, Card, CardHeader, CardContent, TextField, Typography, } from '@material-ui/core';

export default function PosAcceso({ubicacions, ubicacion, fecha, checkCorte, handleChange, invUbic, user}){
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
                            {
                                user.level < 9 ?
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
                                        {
                                            ubicacions === null ?
                                                <MenuItem>Cargando...</MenuItem>
                                            :
                                            
                                                ubicacions.map((option, index) =>{ 
                                                    if(option._id[0].tipo=== 'SUCURSAL'){
                                                        return (
                                                            <MenuItem key={index} value={option}>
                                                                {option._id[0].nombre}
                                                            </MenuItem>
                                                        )
                                                    }else{
                                                        return false
                                                    }
                                                })
                                        }
                                    </TextField>
                                :
                                    <Typography variant="h5" >{ubicacion.nombre}</Typography>

                            }

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
                                className={ invUbic === null  ? classes.botonGenerico : classes.botonCosmico}
                                disabled={invUbic === null || ubicacion === null ? true : false }
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