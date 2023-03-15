import React from 'react'
import { Container, Drawer, Grid, FormControlLabel, Switch, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
export default function SettingsDrawer({open, close, configuracion, setConfiguracion}){
    const classes = useStyles()
    const handleClose = () =>{
        close()
    }
    return(
        <Drawer anchor="bottom" open={open} onClose={handleClose}>
            <div role="presentation" onClick={handleClose} onKeyDown={handleClose}>
                <Container >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Typography className={classes.textoMirame}>Configuración</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography className={classes.textoMiniFacheron}>Botones:</Typography>
                        <FormControlLabel
                            control={
                            <Switch
                                checked={configuracion.ingreso}
                                onChange={(e)=>setConfiguracion({...configuracion, ingreso: e.target.checked})}
                                name="botonIngreso"
                                color="primary"
                            />
                            }
                            label="Ingreso"
                        />
                        <FormControlLabel
                            control={
                            <Switch
                                checked={configuracion.cobrar}
                                onChange={(e)=>setConfiguracion({...configuracion, cobrar: e.target.checked})}
                                name="botonCobrar"
                                color="primary"
                            />
                            }
                            label="Cobrar"
                        />
                        <FormControlLabel
                            control={
                            <Switch
                                checked={configuracion.pagar}
                                onChange={(e)=>setConfiguracion({...configuracion, pagar: e.target.checked})}
                                name="botonPagar"
                                color="primary"
                            />
                            }
                            label="Pagar"
                        />
                        <FormControlLabel
                            control={
                            <Switch
                                checked={configuracion.gasto}
                                onChange={(e)=>setConfiguracion({...configuracion, gasto: e.target.checked})}
                                name="botonGasto"
                                color="primary"
                            />
                            }
                            label="Gasto"
                        />
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </Drawer>
    )
}