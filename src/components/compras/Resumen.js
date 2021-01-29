import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import moment from 'moment'
export default function Resumen(props){
    var {provedor, ubicacion, fecha, total, totalItems, totalGastos, formatNumber} = props
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            {moment(fecha).format("dddd d, MMMM YYYY")}
                        </Typography>
                        <Typography variant="h6">
                            {ubicacion.nombre}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>                                                
                        <Typography variant="h5">
                            {provedor.nombre}
                        </Typography>                        
                        <Typography variant="h5" align="right">
                            $ {formatNumber(totalItems)}
                        </Typography>                        
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" align="right">
                            Gastos
                        </Typography>
                        <Typography variant="h5" align="right">
                            $ {formatNumber(totalGastos)}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" align="right">
                            Total
                        </Typography>
                        <Typography variant="h5" align="right">
                            $ {formatNumber(total)}
                        </Typography>
                    </Grid>
                </Grid>

            </CardContent>

        </Card>


    )
}