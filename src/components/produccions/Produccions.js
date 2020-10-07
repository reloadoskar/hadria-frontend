import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, ListItem, CircularProgress } from '@material-ui/core';
import Ver from './Ver'

export default function Produccions(props){
    const {produccions} = props
    const [produccionSelected, setProduccionSelected] = useState(null)
    const [ver, setVer] = useState(false);

    const handleClose = () => {
        setVer(false)
    };

    const handleMenu = (action, produccion) => {
        if(action === 'ver'){
            setProduccionSelected(produccion)
            setVer(true)
        }
    }
    return (
        <Card>
            <CardHeader title="Producciones" />
            <CardContent>                
                {
                    produccions === null ?
                        <CircularProgress variant="query" />
                    :

                    produccions.length === 0 ?
                        <Typography variant="h6" align="center" gutterBottom>No hay Producciones registradas.</Typography>
                    : 
                        produccions.map( (produccion, index) => (
                            <ListItem button key={index} onClick={()=> handleMenu('ver', produccion)}>
                            <Grid key={index} container justify="space-between" alignItems="center">
                                <Grid item xs={6} md={4}>
                                    <Typography variant="h5">{produccion.folio}</Typography>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Typography align="right">{produccion.fecha }</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography align="right" children={produccion.status} />
                                </Grid>
                                
                            </Grid>
                            </ListItem>
                        ))
                }
            </CardContent>
            <Ver produccion={produccionSelected} isOpen={ver} handleClose={handleClose}/>
        </Card>
    )
}