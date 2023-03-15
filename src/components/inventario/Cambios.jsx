import React from 'react'
import { Grid, IconButton, Tooltip, Typography } from '@material-ui/core'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import { formatNumber } from '../Tools';
import SurtirCambio from './SurtirCambio';
import { useState } from 'react';

export default function Cambios({cambios=[], inventario}){
    const classes = useStyles()
    const [surtirCambioDalog, setDialog] = useState(false)
    const [cambioSeleccionado, setCambioSel] = useState(null)

    const surtirSelected = (cambio) =>{
        setCambioSel(cambio)
        setDialog(true)
    }

    const cancelarSurtir = () =>{
        setCambioSel(null)
        setDialog(false)
    }
    return (
        <div>
            <Grid container spacing={1}>

                <Grid item container xs={12}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        <Typography className={classes.textoMiniFacheron}>Fecha</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={classes.textoMiniFacheron}>Ubicación</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={classes.textoMiniFacheron}>Status</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography className={classes.textoMiniFacheron} align="right">Piezas</Typography>
                    </Grid>
                </Grid>
            {cambios.length === 0 ? null :
                cambios.map((item, i) =>(
                    <Grid item container spacing={2} alignItems="center" className={classes.coolRow}  id="row" key={i}>  
                        <Grid item xs={1} >
                            {item.status!=="SOLICITANDO"? <DepartureBoardIcon /> :
                            <Tooltip title="Surtir" placement="top-end" arrow>
                                <IconButton size='small' onClick={()=>surtirSelected(item)}>
                                    <AirportShuttleIcon size="sm" />
                                </IconButton>
                            </Tooltip>
                            }
                        </Grid>                      
                        <Grid item xs={3}>{item.fecha} {moment(item.createdAt).format("HH:MM")}</Grid>
                        <Grid item xs={3}>{item.ubicacion.nombre}</Grid>
                        <Grid item xs={3} className={item.status === "SOLICITANDO" ? classes.fondoAmarillo : item.status === "ENVIANDO" ? classes.fondoAzul : classes.fondoVerde}>
                            <Typography align="center">
                                {item.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}><Typography align="right">
                            {item.piezas}</Typography>
                        </Grid>
                    </Grid>
                ))
            }

            <Grid item container spacing={2}>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                    <Typography className={classes.textoMirame} align="right">{
                        formatNumber( cambios.reduce((acc,el)=>acc+=el.piezas,0), 0)
                    }</Typography>
                </Grid>
            </Grid>
            </Grid>
            <SurtirCambio open={surtirCambioDalog} close={cancelarSurtir} cambio={cambioSeleccionado} inventario={inventario}/>
        </div>
    )
}