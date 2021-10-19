import React, { useState, useEffect } from 'react'
import { Grid, TextField, Typography, IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import useStyles from '../hooks/useStyles'
import { formatNumber } from '../Tools'
export default function GastoEditable({gasto, editMode, del, index, sumar}){
    const [elGasto, setElgasto] = useState(null)
    const classes = useStyles()
    useEffect(() => {
        if(gasto){
            setElgasto(gasto)
        }
        return () => {
            setElgasto(null)
        }
    }, [gasto])
    const handleChange = (field, value) => {
        setElgasto({...elGasto, [field]: value})
        sumar()
    }
    const handleRemoveGasto = (gasto) => {
        del(gasto)
    }
    return elGasto ? 
        elGasto.importe > 0 ?
        editMode ?
            <Grid item container justifyContent="flex-end" alignItems="center" spacing={2}>
                <Grid item xs={1}>
                    <IconButton edge="end" onClick={()=> handleRemoveGasto(index)}>
                        <CancelIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={9}>
                    <Typography className={classes.textoMiniFacheron} >Descripci&oacute;n</Typography>
                    <TextField 
                        fullWidth
                        name="descripcion-gasto"
                        value={elGasto.descripcion}
                        variant="outlined"
                        onChange={(e) => handleChange('descripcion', e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.textoMiniFacheron} >Importe</Typography>
                    <TextField 
                        type="number"
                        name="descripcion-importe"
                        value={elGasto.importe}
                        variant="outlined"
                        onChange={(e) => handleChange('importe', e.target.value)}
                    />
                </Grid>
            </Grid>
            : 
            <Grid container spacing={2} >
                <Grid item xs={2} >
                    <Typography className={classes.textoMiniFacheron}>FECHA</Typography>
                    <Typography >{elGasto.fecha}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography className={classes.textoMiniFacheron}>DESCRIPCI&Oacute;N</Typography>
                    <Typography >{elGasto.descripcion}</Typography>
                </Grid>
                <Grid item xs={4} >
                    <Typography align="right" className={classes.textoMiniFacheron}>IMPORTE</Typography>
                    <Typography align="right">${formatNumber(elGasto.importe,2)}</Typography>
                </Grid>
            </Grid>
        : null
        :null
}