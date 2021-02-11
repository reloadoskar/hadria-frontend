import React from 'react'
import { formatNumber } from '../Tools'
import { Typography, Grid, Paper, Divider } from '@material-ui/core';

export default function Balance({balance}) {
    return (
        <Paper elevation={3}>
            <Grid container spacing={2}>
        
                <Grid item xs={12} md>                                        
                    <Typography align="right" variant="body1" children="Disponible" />
                    <Typography align="right" variant="h4" children={"$" + formatNumber(balance.disponible)} />                        
                </Grid>

                <Grid item xs={12} md>
                    <Typography align="right" variant="body1" children="Inventario" />
                    <Typography align="right" variant="h4" children={"+$" + formatNumber(balance.inventario)} />
                </Grid>

                <Grid item xs={12} md>
                    <Typography align="right" variant="body1" children="Por Cobrar" />
                    <Typography align="right" variant="h4" children={"+$" + formatNumber(balance.porCobrar)} />
                </Grid>

                <Grid item xs={12} md>
                    <Typography align="right" variant="body1" children="Por Pagar" />
                    <Typography align="right" color="secondary" variant="h4" children={"-$" + formatNumber(balance.porPagar)} />
                </Grid>
                <Divider />
                <Grid item xs={12} md>
                    <Typography align="right" variant="body1" children="Balance" />
                    <Typography
                        align="right"
                        variant="h4"
                        color={balance.total < 0 ? 'error' : 'inherit'}
                        children={"$" + formatNumber(balance.total)} 
                    />
                </Grid>

            </Grid>
        </Paper>
    )
}