import React, {useState, useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import { Grid, Typography, Divider, TextField, MenuItem } from '@material-ui/core';
import useStyles from '../hooks/useStyles';
import {formatNumber} from '../Tools'
import { UbicacionContext } from '../ubicaciones/UbicacionContext';
export default function ConfirmaDialog(props) {
    const {ubicacions} = useContext(UbicacionContext)
    const classess = useStyles()    
    const { 
        close, 
        open, 
        corte, 
        cierraCorte} = props
    const [data, setData] = useState(null)
    const [enviarCorteA, setEnviarCorteA] = useState('')
    const handleCancel = () => {
        close('confirm');
    }

    useEffect(() => {
        if(corte){
            setData(corte)
        }
        return () => setData(null)
    },[corte])
    
    const handleOk = () => {
        data.enviarA = enviarCorteA
        cierraCorte(data)
        close('confirm');
    };

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
        >
            { data === null ? null :
            <React.Fragment>
            <DialogTitle>¿Desea cerrar el día?</DialogTitle>
            <DialogContent dividers>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography align="left" variant="body1">Ventas</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1">$ {formatNumber(data.tventas,2)}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Ingresos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1">+$ {formatNumber(data.tingresos,2)}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Créditos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1" color="secondary">-$ {formatNumber(data.tcreditos,2)}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">A cuenta</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1">+$ {formatNumber(data.tacuenta,2)}</Typography>
                        </Grid>
                </Grid>
                <Grid container>
                        <Grid item xs={6}>
                            <Typography align="left" variant="body1">Egresos</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right" variant="body1" color="secondary">-$ {formatNumber(data.tegresos,2)}</Typography>
                        </Grid>
                </Grid>
                <Divider />
                <Grid container justifyContent="flex-end">
                    <Typography align="right" variant="h6">$ {formatNumber(data.total,2)}</Typography>
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
            </React.Fragment>
            }
        </Dialog>
    )
}


