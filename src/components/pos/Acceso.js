import React, { useState } from 'react'
import moment from 'moment'
import useStyles from '../hooks/useStyles'

import { Container, MenuItem, Button, Grid, Card, CardHeader, CardContent, TextField, Typography, } from '@material-ui/core';

export default function PosAcceso({accesando, ubicacions, ubicacion, fecha, checkCorte, handleChange, invUbic, user}){
    const classes = useStyles();
    // const [accesando, setAccesando] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        // setAccesando(true)
        checkCorte().then(res => {
            // setAccesando(false)
        })
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
                    {accesando ?
                        <Typography variant="h6" align="center"> Accesando... </Typography>
                        :
                        <form onSubmit={(e) => handleSubmit(e)}>
                            {
                                user.level < 3 ?
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
                                                    if(option._id.tipo=== 'SUCURSAL'){
                                                        return (
                                                            <MenuItem key={index} value={option}>
                                                                {option._id.nombre}
                                                            </MenuItem>
                                                        )
                                                    }else{
                                                        return false
                                                    }
                                                })
                                        }
                                    </TextField>
                                :
                                    <Typography variant="h5" align="center" >{ubicacion === '' ? null : ubicacion._id.nombre}</Typography>

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
                    }
                    
                    
                </CardContent>
            </Card>
            </Container>
    )
}