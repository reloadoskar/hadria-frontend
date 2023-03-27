import React from 'react'
import { Grid, Tooltip, IconButton, Typography } from '@material-ui/core'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import useStyles from '../hooks/useStyles';
import moment from 'moment';
export default function Cambio({cambio, surtirSelected, mostrarSelected}){
    const classes = useStyles()

    return (
        <Grid item container spacing={2} alignItems="center" className={classes.coolRow}  id="row" key={cambio._id}>  
            <Grid item xs={1} >
                {cambio.status==="SOLICITANDO" ? 
                    <Tooltip title="Surtir" placement="top-end" arrow>
                        <IconButton size='small' onClick={()=>surtirSelected(cambio)}>
                            <AirportShuttleIcon size="sm" />
                        </IconButton>
                    </Tooltip>
                    : cambio.status === "ENVIANDO" ? 
                        <DepartureBoardIcon size="sm"/> 
                    : 
                    <Tooltip title="Ver detalle" placement="top-end" arrow>
                        <IconButton size='small' onClick={()=>mostrarSelected(cambio)}>
                            <AssignmentTurnedInIcon size="sm"/>
                        </IconButton>
                    </Tooltip>
                }
            </Grid>                      
            <Grid item xs={1}>#{cambio.folio}</Grid>
            <Grid item xs={2}>{cambio.fecha} {moment(cambio.createdAt).format("HH:MM")}</Grid>
            <Grid item xs={3}>{cambio.ubicacion.nombre}</Grid>
            <Grid item xs={3} className={
                cambio.status === "SOLICITANDO" ? classes.fondoAmarillo :
                cambio.status === "ENVIANDO" ? classes.fondoAzul : 
                classes.fondoVerde}>
                <Typography align="center">
                    {cambio.status}
                </Typography>
            </Grid>
            <Grid item xs={2}><Typography align="right">
                {cambio.piezas}</Typography>
            </Grid>
        </Grid>
    )
}