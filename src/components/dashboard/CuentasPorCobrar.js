import React, {useState, useEffect} from 'react'
import { Card, CardHeader, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import { formatNumber, sumSaldo } from '../Tools'
import {getCuentasPorCobrar} from '../api'
import moment from 'moment'
export default function CuentasPorCobrar( { data } ){
    const [cuentas, setCuentas] = useState([])
    useEffect(() => {
        getCuentasPorCobrar().then(res => {
            setCuentas(res.cuentas)
        })
    }, [])
    const diasParaCobrar = (fecha, dias) =>{
        let fecha_venta = moment(fecha)
        let fecha_vence = fecha_venta.add(dias, 'd')
        let hoy = moment()

        let dif = fecha_vence.diff(hoy, 'days' )
        if (dif > 0) {
            return (
                <Typography variant="body2" children={"Vence "+fecha_vence.fromNow()} />
            )
        }else{
            return (
                <Typography variant="body2" color="error" children={"Venció "+fecha_vence.fromNow()} />
            )
        }

    }
    return (
        <Card>
            <CardHeader 
                title="Créditos"
            />
            <CardContent>
                {
                cuentas.length === 0
                    ?
                        <Typography variant="body1" children="No se encontraron datos." />
                    : 
                        cuentas.map((cta, index) => {
                            return (
                                <Grid key={index} container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" children={cta.cliente.nombre} />
                                    </Grid>
                                    <Grid item xs>
                                        {diasParaCobrar(cta.fecha, cta.cliente.dias_de_credito)}
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2" children={"$"+formatNumber(cta.saldo)} align="right" />
                                    </Grid>
                                </Grid>
                            );
                        })
                }
                <Divider />
                <Typography variant="body1" children={sumSaldo(cuentas)} align="right" />
            </CardContent>
        </Card>
    )
}