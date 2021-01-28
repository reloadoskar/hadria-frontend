import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { Grid, Typography, Divider, TextField, MenuItem } from '@material-ui/core';
import useStyles from '../hooks/useStyles';

export default function ConfirmaDialog(props) {
    const classess = useStyles()    
    const { 
        onClose, 
        open, 
        data, 
        ubicacions,
        cierraCorte} = props;
    const [enviarCorteA, setEnviarCorteA] = useState('')
    const handleCancel = () => {
        onClose('confirm');
    };
    
    const handleOk = () => {
        data.enviarA = enviarCorteA
        cierraCorte(data)
        onClose('confirm');
    };

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
        >
            <DialogTitle>¿Desea cerrar el día?</DialogTitle>
            <DialogContent dividers>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography align="left" variant="body1">Ventas</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1">$ {data.tventas}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Ingresos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1">+$ {data.tingresos}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Créditos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1" color="secondary">-$ {data.tcreditos}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">A cuenta</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1">+$ {data.tacuenta}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Egresos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1" color="secondary">-$ {data.tegresos}</Typography>
                        </Grid>
                </Grid>
                <Divider />
                <Grid container justify="flex-end">
                    <Typography align="right" variant="h6">$ {data.total}</Typography>
                </Grid>
                <Grid container >

                    <TextField
                        select
                        id="enviarCorteA"
                        variant="outlined"                        
                        required
                        fullWidth
                        label="Enviar corte a:"
                        value={enviarCorteA}
                        onChange={(e) => setEnviarCorteA(e.target.value)}
                    >
                        {ubicacions.map((ubicacion, i) => {
                            if(ubicacion.tipo === 'ADMINISTRACION' || ubicacion.tipo === 'BANCO'){
                                return (
                                    <MenuItem key={i} value={ubicacion}>
                                        {ubicacion.nombre}
                                    </MenuItem>
                                )
                            }else{
                                return false
                            }
                        })} 
                    </TextField>
                            
                    {/* <Typography variant="caption" children="*Los cortes se envían automaticamente a ADMINISTRACIÓN" align="center" /> */}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={classess.botonSimplon} autoFocus onClick={handleCancel} >
                    Aún No
        </Button>
                <Button className={classess.botonGenerico} onClick={handleOk} disabled={ enviarCorteA === '' ? true : false}>
                    ¡Listo!
        </Button>
            </DialogActions>
        </Dialog>
    )
}


