import React from 'react'

import Balance from './Balance'
import CuentasPorCobrar from './CuentasPorCobrar'
import CuentasPorPagar from './CuentasPorPagar'
import ComprasDash from './ComprasDash'

import { Grid } from '@material-ui/core';
// import useStyles from './hooks/useStyles'

export default function Dashboard(){
    
    return(
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Balance />
            </Grid>
            <Grid item xs={12} md={7}>
                <ComprasDash />
            </Grid>

            <Grid item xs={12} md={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CuentasPorCobrar />
                    </Grid>
                    <Grid item xs={12}>
                        <CuentasPorPagar />
                    </Grid>
                </Grid>
            </Grid>
            
            
            
        </Grid>
    )
}