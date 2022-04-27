import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import useStyles from '../hooks/useStyles'
import { formatNumber } from '../Tools'
export default function Cxc({cta}){
    const classes = useStyles()
    return(
        <Box borderBottom={1}>
            <Grid classes={{item:classes.borderInferior}} item container xs={12}>
                <Grid item xs={1} sm={2}>#{cta.venta.folio}</Grid>
                <Grid item xs={5} sm={2}>{cta.venta.fecha}</Grid>
                <Grid item xs={3} sm={4}>
                    <Typography className={classes.textoMiniFacheron} align="right">
                        Importe:
                    </Typography>
                    <Typography align="right">
                        {formatNumber(cta.venta.importe,2)}
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={4}>
                    <Typography className={classes.textoMiniFacheron} align="right">
                        Saldo:
                    </Typography>
                    <Typography align="right">
                        {formatNumber(cta.saldo,2)}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}