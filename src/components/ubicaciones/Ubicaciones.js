import React, {useState, useContext} from 'react';
import UbicacionesDialog from './UbicacionesDialog';
import { Container, Grid, Typography } from '@material-ui/core';

// HOOKS
import Ubicacion from './Ubicacion';
import {UbicacionContext} from './UbicacionContext'
function Ubicaciones() {
    const {ubicacions} = useContext(UbicacionContext)
    const [dialog, setDialog] = useState(false)
    return ubicacions ?
        <Container maxWidth="md">
            <Grid container >
                <UbicacionesDialog isShowing={dialog} open={()=>setDialog(true)} close={()=>setDialog(false)} />
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