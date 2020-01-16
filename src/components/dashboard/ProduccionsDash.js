import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, ListItem, LinearProgress } from '@material-ui/core';

import useProduccions from '../hooks/useProduccions'
// import {sumStock, sumEmpStock} from '../Tools'
import VerProduccion from './VerProduccion'

export default function ProduccionsDash(){
    const {produccions} = useProduccions()
    const [produccionSelected, setProduccionSelected] = useState(null)
    const [verProduccion, setVerProduccion] = React.useState(false);

    const handleClose = () => {
        setVerProduccion(false)
    };

    const handleMenu = (action, produccion) => {
        if(action === 'ver'){
            setProduccionSelected(produccion)
            setVerProduccion(true)
        }
    }
    return (
        <Card>
            <CardHeader title="Producciones" />
            <CardContent>                
                {
                    produccions === null ?
                        <LinearProgress variant="query" />
                    :

                    produccions.length === 0 ?
                        <Typography variant="h6" align="center" gutterBottom>No hay Producciones registradas.</Typography>
                    : 
                        produccions.map( (produccion, index) => (
                            <ListItem button key={index} onClick={()=> handleMenu('ver', produccion._id)}>
                            <Grid key={index} container >
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5">{produccion.folio + ":" +produccion.clave}</Typography>
                                </Grid>
                                <Grid item xs={12} md>
                                    <Typography children={produccion.status} />
                                </Grid>
                                
                            </Grid>
                            </ListItem>
                        ))
                }
            </CardContent>
            <VerProduccion produccionId={produccionSelected} isOpen={verProduccion} handleClose={handleClose}/>
        </Card>
    )
}