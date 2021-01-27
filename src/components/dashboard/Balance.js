import React from 'react'
import { formatNumber } from '../Tools'
import { Typography, Grid, Card, CardHeader, CardContent, CardActions, Tooltip, LinearProgress } from '@material-ui/core';

export default function Balance({balance}) {
    return (
        <Grid container direction="row" alignItems="center" justify="space-around" spacing={2}>

            {
                balance === null ?
                    <Grid item xs={12}>
                        <LinearProgress variant="query" />
                    </Grid>
                    :

                    // balance.length === 0 ?
                    //     <Typography align="center">No hay datos</Typography>
                    //     :

                        <React.Fragment>

                            <Grid item xs>
                                <Card>
                                    <CardHeader>
                                    </CardHeader>
                                    <CardContent>
                                        <Typography align="right" variant="body1" children="Balance" />
                                        <Typography
                                            align="right"
                                            variant="h4"
                                            color={balance.total < 0 ? 'error' : 'inherit'}
                                            children={"$" + formatNumber(balance.total)} 
                                            />
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card>
                                    <CardHeader>
                                    </CardHeader>
                                    <Tooltip title={
                                        <React.Fragment>
                                            {
                                                !balance.dispPorUbic ?
                                                    null
                                                    :
                                                    balance.dispPorUbic.map((el, index) => (
                                                            <Typography children={el.ubicacion + ": " + formatNumber(el.disponible)} key={index} />
                                                    ))
                                            }
                                        </React.Fragment>
                                    } placement="right">
                                        <CardContent>
                                            <Typography align="right" variant="body1" children="Disponible" />
                                            <Typography align="right" variant="h4" children={"$" + formatNumber(balance.disponible)} />
                                        </CardContent>
                                    </Tooltip>
                                    <CardActions>

                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card>
                                    <CardHeader>
                                    </CardHeader>
                                    <CardContent>
                                        <Typography align="right" variant="body1" children="Inventario" />
                                        <Typography align="right" variant="h4" children={"+$" + formatNumber(balance.inventario)} />
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card>
                                    <CardHeader>
                                    </CardHeader>
                                    <CardContent>
                                        <Typography align="right" variant="body1" children="Por Cobrar" />
                                        <Typography align="right" variant="h4" children={"+$" + formatNumber(balance.porCobrar)} />
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card>
                                    <CardHeader>
                                    </CardHeader>
                                    <CardContent>
                                        <Typography align="right" variant="body1" children="Por Pagar" />
                                        <Typography align="right" color="secondary" variant="h4" children={"-$" + formatNumber(balance.porPagar)} />
                                    </CardContent>
                                    <CardActions>

                                    </CardActions>
                                </Card>
                            </Grid>
                        </React.Fragment>
            }
        </Grid>
    )
}