import React from 'react'

import Balance from './Balance'
import CuentasPorCobrar from './CuentasPorCobrar'

import CuentasPorPagar from './CuentasPorPagar'
import ComprasDash from './ComprasDash'

import useUser from '../hooks/useUser'

import { Grid, Box } from '@material-ui/core';
// import useStyles from './hooks/useStyles'

export default function Dashboard(){
    const {user} = useUser()
    
    return(
        
        <Grid container spacing={2}>
            <Grid  item xs={12}>
                <Box display={user.level <= 1 ? 'inline' : 'none'}>
                    <Balance />
                </Box>
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