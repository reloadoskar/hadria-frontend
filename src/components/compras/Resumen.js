import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import moment from 'moment'
import useStyles from '../hooks/useStyles'
export default function Resumen(props){
    const {provedor, ubicacion, fecha, total, totalItems, totalGastos, formatNumber} = props
    const classes = useStyles()
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
                    <Grid item xs={12}>                                                
                        <Typography variant="h6">
                            {provedor.nombre}
                        </Typography>                        
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography align="right" className={classes.sobreTexto}>Productos</Typography>
                        <Typography variant="h5" align="right">
                            $ {formatNumber(totalItems)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography align="right" className={classes.sobreTexto}>Gastos</Typography>
                        <Typography variant="h5" align="right">
                            $ {formatNumber(totalGastos)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography align="right" className={classes.sobreTexto}>Total compra</Typography>
                        <Typography variant="h5" align="right">
                            $ {formatNumber(total)}
                        </Typography>
                    </Grid>
                </Grid>

            </CardContent>

        </Card>


    )
}