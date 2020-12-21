import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

export default function Resumen(props){
    var {provedor, ubicacion, fecha, total, totalItems, totalGastos, formatNumber} = props
    return (
        <Card>
            <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography align="right">
                        {fecha}
                    </Typography>
                    <Typography variant="h5" align="right">
                        {provedor.nombre}
                    </Typography>
                    <Typography align="right">
                        {ubicacion.nombre}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" align="right">
                        $ {formatNumber(totalItems)}
                    </Typography>
                </Grid>

                <Grid item xs={10}>
                    <Typography variant="h5" align="right">
                        Gastos
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" align="right">
                        $ {formatNumber(totalGastos)}
                    </Typography>
                </Grid>

                <Grid item xs={10}>
                    <Typography variant="h5" align="right">
                        Total
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" align="right">
                        $ {formatNumber(total)}
                    </Typography>
                </Grid>

            </Grid>
            </CardContent>

        </Card>


    )
}