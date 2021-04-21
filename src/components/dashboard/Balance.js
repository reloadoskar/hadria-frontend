import React from 'react'
import { formatNumber } from '../Tools'
import { Typography, Grid, Card, Divider, CardContent } from '@material-ui/core';
import useStyles from '../hooks/useStyles';

export default function Balance({balance}) {
    const classes = useStyles()
    return (
        <Card elevation={3}>
            <CardContent>

                <Grid container spacing={2}>
            
                    <Grid item xs={12} sm>                                        
                        <Typography align="center" variant="body1" children="Disponible" />
                        <Typography align="center" variant="h5" children={"$" + formatNumber(balance.disponible)} />                        
                    </Grid>

                    <Grid item xs={12} sm>
                        <Typography align="center" variant="body1" children="Inventario" />
                        <Typography align="center" variant="h5" children={"+$" + formatNumber(balance.inventario)} />
                    </Grid>

                    <Grid item xs={12} sm>
                        <Typography align="center" variant="body1" children="Por Cobrar" />
                        <Typography align="center" variant="h5" children={"+$" + formatNumber(balance.porCobrar)} />
                    </Grid>

                    <Grid item xs={12} sm>
                        <Typography align="center" variant="body1" children="Por Pagar" />
                        <Typography 
                            className={classes.textoSangron}
                            align="center"  variant="h5" children={"-$" + formatNumber(balance.porPagar)} />
                    </Grid>

                    <Grid item xs={12} sm>
                        <Typography align="center" variant="body1" children="Balance" />
                        <Divider />
                        <Typography
                            className={ balance.total > 0 ? classes.textoGroovie : classes.textoSangron}
                            align="center"
                            variant="h5"
                            color={balance.total < 0 ? 'error' : 'inherit'}
                            children={"$" + formatNumber(balance.total)} 
                        />
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    )
}