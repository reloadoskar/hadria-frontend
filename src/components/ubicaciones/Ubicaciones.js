import React, {useState} from 'react';
import UbicacionesDialog from './UbicacionesDialog';
import { Container, Grid, Typography, Paper } from '@material-ui/core';

// HOOKS
import Ubicacion from './Ubicacion';
import useStyles from '../hooks/useStyles';
import { useSnackbar } from 'notistack';
function Ubicaciones({ubicacions}) {
    const [dialog, setDialog] = useState(false)
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    function addUbicacion(ubicacion) {
        if(ubicacions.ubicacions.length<5){
            ubicacions.add(ubicacion)
        }
        showMessage('Limite de ubicaciones alcanzado, actualice su servicio', 'error')
        setDialog(false)
    }
    return ubicacions ?
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <UbicacionesDialog addUbicacion={addUbicacion} isShowing={dialog} open={()=>setDialog(true)} close={()=>setDialog(false)} />
                { ubicacions.ubicacions.length === 0  ? 
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" gutterBottom>No hay Ubicaciones registradas.</Typography>
                    </Grid>
                :
                    ubicacions.ubicacions.map((row, index) => (
                        <Paper className={classes.paperBasico} key={index}>
                            <Ubicacion ubicacion={row}  update={ubicacions.editUbic} />
                        </Paper>
                    ))
                }
            </Grid>
        </Container>
        :
        null
}

export default Ubicaciones