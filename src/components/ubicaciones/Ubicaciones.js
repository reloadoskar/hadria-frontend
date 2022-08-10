import React, {useState, useContext} from 'react';
import UbicacionesDialog from './UbicacionesDialog';
import { Container, Grid, Typography, Paper } from '@material-ui/core';

// HOOKS
import Ubicacion from './Ubicacion';
import useStyles from '../hooks/useStyles';
import { useSnackbar } from 'notistack';
import {UbicacionContext} from './UbicacionContext'
function Ubicaciones() {
    const {ubicacions, addUbicacion} = useContext(UbicacionContext)
    const [dialog, setDialog] = useState(false)
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    function handleAdd(ubicacion) {
        if(ubicacions.length<30){
            addUbicacion(ubicacion)
        }else{
            showMessage('Limite de ubicaciones alcanzado, actualice su servicio', 'error')
        }
        setDialog(false)
    }
    return ubicacions ?
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <UbicacionesDialog addUbicacion={handleAdd} isShowing={dialog} open={()=>setDialog(true)} close={()=>setDialog(false)} />
                { ubicacions.length === 0  ? 
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" gutterBottom>No hay Ubicaciones registradas.</Typography>
                    </Grid>
                :
                    ubicacions.map((row, index) => (
                        <Ubicacion ubicacion={row}  update={ubicacions.editUbic} key={index}/>
                    ))
                }
            </Grid>
        </Container>
        :
        null
}

export default Ubicaciones