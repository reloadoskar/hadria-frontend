import { Card, CardContent, CardHeader, Grid, Tooltip, Typography, Divider } from '@material-ui/core'
import React from 'react'
import {sumImporte, formatNumber} from '../Tools'
export default function UltimosMovimientos(props){
    const {ingresos, egresos} = props
    return (
        <Card>
            <CardHeader title="Últimos movimientos" />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography children="Ingresos"/>
                        {
                            ingresos.map((ingreso,i) =>(
                                <Tooltip key={i} title={
                                    <div>
                                        <Typography children={ingreso.concepto}/>
                                        <Typography children={ingreso.descripcion}/>
                                    </div>
                                }>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            {ingreso.fecha} 
                                        </Grid>
                                        <Grid item xs>
                                            {ingreso.ubicacion.nombre} 
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography color="primary" align="right" children={"+"+ingreso.importe} />
                                        </Grid>
                                    </Grid>
                                </Tooltip>
                            ))
                        }
                        <Divider />
                        <Typography align="right" children={formatNumber(sumImporte(ingresos),2)} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography children="Egresos"/>
                        {
                            egresos.map((egreso,i) =>(
                                <Tooltip key={i} title={
                                    <div>
                                        <Typography children={egreso.concepto}/>
                                        <Typography children={egreso.descripcion}/>
                                    </div>
                                }>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            {egreso.fecha} 
                                        </Grid>
                                        <Grid item xs>
                                            {egreso.ubicacion.nombre} 
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography color="error" align="right" children={"-"+egreso.importe} />
                                        </Grid>
                                    </Grid>
                                </Tooltip>
                            ))
                        }
                        <Divider />
                        <Typography align="right" children={formatNumber(sumImporte(egresos),2)} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}