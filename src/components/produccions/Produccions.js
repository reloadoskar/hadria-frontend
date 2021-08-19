import React, {useState} from 'react'
import { IconButton, Card, CardHeader, CardContent, Typography, Grid, ListItem, LinearProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Produccion from './Produccion'
import useProduccions from '../produccions/useProduccions'
import moment from 'moment'
import { useSnackbar } from 'notistack';
export default function Produccions(){
    const {produccions, crearProduccion, eliminarProduccion, agregarInsumo, eliminarInsumo } = useProduccions()
    const [produccionSelected, setProduccionSelected] = useState(null)
    const [ver, setVer] = useState(false);
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }
    const handleClose = () => {
        setVer(false)
    };

    const handleMenu = (action, produccion) => {
        if(action === 'ver'){
            setProduccionSelected(produccion)
            setVer(true)
        }
    }

    const handleCrearProduccion = () => {
        showMessage("Creando producción...", "info")
        crearProduccion().then(res=>{
            showMessage(res.message, res.status)
        })
    }
    return (
        <Card>
            <CardHeader title="Producciones" action ={
                <IconButton onClick={(e) => handleCrearProduccion()}>
                    <AddIcon />
                </IconButton>
            } />
            <CardContent>                
                {
                    produccions === null ?
                        <LinearProgress variant="query" />
                    :

                    produccions.length === 0 ?
                        <Typography variant="h6" align="center" gutterBottom>No hay Producciones registradas.</Typography>
                    : 
                        produccions.map( (produccion, index) => (
                            <ListItem button key={index} onClick={()=> handleMenu('ver', produccion)}>
                                <Grid key={index} container justifyContent="space-between" alignItems="center">
                                    <Grid item xs>
                                        <Typography variant="h5">{produccion.folio}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography align="right">{moment(produccion.fecha).format("YYYY-MM-DD")}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography align="right" children={produccion.status} />
                                    </Grid>                            
                                </Grid>
                            </ListItem>
                        ))
                }
            </CardContent>
            {
                produccionSelected != null ?
                    <Produccion 
                        produccion={produccionSelected} 
                        isOpen={ver}
                        agregarInsumo={agregarInsumo}
                        eliminarInsumo={eliminarInsumo}
                        eliminarProduccion={eliminarProduccion}
                        showMessage={showMessage}
                        handleClose={handleClose}/>
                    :
                    null
            }
        </Card>
    )
}