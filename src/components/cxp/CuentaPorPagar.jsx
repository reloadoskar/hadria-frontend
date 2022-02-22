import React , {useContext}from 'react'
import { Grid, Typography, Chip, IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from '../hooks/useStyles'
import { formatNumber } from '../Tools'
import moment from 'moment'
import { CuentasPorPagarContext } from './CuentasPorPagarContext';
export default function CuentaPorPagar({cuenta, diasDeCredito}) {
    const {removerCuenta} = useContext(CuentasPorPagarContext)
    const classes = useStyles()
    const handleRemove = (id) =>{
        removerCuenta(id)
    }
    return <Grid container>
        <Grid container alignItems='center'>
            <Grid item xs={6}>
                <Typography className={classes.textoMiniFacheron}>{cuenta.fecha}</Typography>
                <Typography>{cuenta.concepto} {cuenta.compra.folio}:{cuenta.compra.clave}</Typography>
            </Grid>
            <Grid item xs={5}>
                {moment().diff(cuenta.fecha, 'days') > diasDeCredito ?
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography align='right'>
                                <Chip size='small' color='secondary' label='Cuenta vencida' />
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="right">
                                ${formatNumber(cuenta.saldo, 1)}
                            </Typography>
                        </Grid>
                    </Grid>
                    :
                    <Typography align="right">${formatNumber(cuenta.saldo, 1)}</Typography>}
            </Grid>
            <Grid item xs={1}>
                <Typography align="right" >
                    <IconButton size="small" onClick={()=>handleRemove(cuenta._id)}>
                        <CancelIcon />
                    </IconButton>
                </Typography>
            </Grid>
        </Grid>
    </Grid>
}