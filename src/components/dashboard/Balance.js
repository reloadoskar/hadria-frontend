import React, { useState, useEffect } from 'react'
import {getBalance} from '../api'
import { formatNumber, sumImporte, sumSaldo, calcCostoInventario } from '../Tools'
import { Typography, Grid, Card, CardHeader, CardContent, CardActions, Tooltip, LinearProgress } from '@material-ui/core';
export default function Balance() {
    
    const [values, setValues] = useState(null)

    useEffect(() => {
        getBalance().then(balance => {
            // console.log(balance)
            var ingresos = sumImporte(balance.ingresos)
            var porCobrar = sumSaldo(balance.porCobrar)
            var egresos = sumImporte(balance.egresos)
            var porPagar = 0
            balance.porPagar.forEach(compra => {
                porPagar += compra.saldo
            })
            var inventario = calcCostoInventario(balance.inventario)
            // var inventario = 0
            var disponible = ingresos - egresos
            var balanceT = 0
            balanceT = disponible + porCobrar + inventario - porPagar

            setValues({
                total: balanceT,
                disponible: disponible,
                inventario: inventario,
                porCobrar: porCobrar,
                porPagar: porPagar,
                dispPorUbic: balance.disponiblePorUbicacion,
            })
        })

    }, [])
    return (
        <Grid container direction="row" alignItems="center" justify="space-around" spacing={2}>

            {
                !values ?
                    <Grid item xs={12}>
                        <LinearProgress variant="query" /> 
                    </Grid>
                :
            <React.Fragment>

            <Grid item xs={12} md>
                <Card>
                    <CardHeader>
                    </CardHeader>
                    <CardContent>
                        <Typography align="right" variant="body1" children="Balance" />
                        <Typography
                            align="right"
                            variant="h4"
                            color={values.total < 0 ? 'error' : 'inherit'}

                            children={"$" + formatNumber(values.total)} />
                    </CardContent>
                    <CardActions>
                        
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md>
                <Card>
                    <CardHeader>
                    </CardHeader>
                    <Tooltip title={
                        <React.Fragment>
                            {
                                !values.dispPorUbic ?
                                null
                                :
                                values.dispPorUbic.map((el, index) => {
                                    let disponible = sumImporte(el.ingresos) - sumImporte(el.egresos)
                                    return (
                                        <Typography children={el.nombre + ": " + formatNumber(disponible)} key={index} />
                                    )
                                })
                            }                            
                        </React.Fragment>
                    } placement="right">
                    <CardContent>
                        <Typography align="right" variant="body1" children="Disponible" />
                        <Typography align="right" variant="h4" children={"$" + formatNumber(values.disponible)} />
                    </CardContent>
                    </Tooltip>
                    <CardActions>
                        
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md>
                <Card>
                    <CardHeader>
                    </CardHeader>
                    <CardContent>
                        <Typography align="right" variant="body1" children="Inventario" />
                        <Typography align="right" variant="h4" children={"+$" + formatNumber(values.inventario)} />
                    </CardContent>
                    <CardActions>
                        
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md>
                <Card>
                    <CardHeader>
                    </CardHeader>
                    <CardContent>
                        <Typography align="right" variant="body1" children="Por Cobrar" />
                        <Typography align="right" variant="h4" children={"+$" + formatNumber(values.porCobrar)} />
                    </CardContent>
                    <CardActions>
                        
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md>
                <Card>
                    <CardHeader>
                    </CardHeader>
                    <CardContent>
                        <Typography align="right" variant="body1" children="Por Pagar" />
                        <Typography align="right" color="secondary" variant="h4" children={"-$" + formatNumber(values.porPagar)} />
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