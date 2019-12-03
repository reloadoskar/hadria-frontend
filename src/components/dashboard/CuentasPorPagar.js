import React, {useState, useEffect} from 'react'
import { Card, CardHeader, CardContent, Grid, Typography } from '@material-ui/core';
import { formatNumber,  } from '../Tools'
import {getCuentasPorPagar} from '../api'
import moment from 'moment'
export default function CuentasPorPagar( ){
    const [cuentas, setCuentas] = useState([])
    useEffect(() => {
        getCuentasPorPagar().then(res => {
            setCuentas(res.cuentas)
        })
    }, [])
    const diasParaPagar = (fecha, dias) => {
        let fecha_compra = moment(fecha)
        let fecha_vence = fecha_compra.add(dias, 'd')
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
                title="Deudas"
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
                                    <Grid item xs={2}>
                                        <Typography variant="body2" children={cta.clave} />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2" children={cta.provedor.nombre} />
                                    </Grid>
                                    <Grid item xs>
                                        {diasParaPagar(cta.fecha, cta.provedor.diasDeCredito)}
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2" children={"$"+formatNumber(cta.saldo)} align="right" />
                                    </Grid>
                                </Grid>
                            );
                        })
                }
            </CardContent>
        </Card>
    )
}