import React from 'react'
import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import {sumStock, sumEmpStock, formatNumber} from '../Tools'
import CompraItem from '../compras/CompraItem'
import useStyles from '../hooks/useStyles'
export default function VistaPorFolio({inventario}){
    const classes = useStyles()
    return (
        <React.Fragment>
            {inventario === null ? null :
                inventario.filter(folio => sumStock(folio.items) + sumEmpStock(folio.items) > 1).map((folio, i) => (
                    <Grid key={i} item xs={12}>
                        <Card>
                            <CardHeader title={folio.compra.folio + ":" + folio.compra.clave} />
                            <CardContent>
                                { folio.items.filter(item => item.stock > 0.01).map((item, i) => (
                                    <CompraItem elitem={item} key={i} verUbicacion/>
                                ))}
                                <Grid container>
                                    <Grid item xs={8}></Grid>
                                    <Grid item xs={2}>
                                        <Typography align="right" className={classes.textoMiniFacheron}>T. Empaques</Typography>
                                        <Typography align="right">{formatNumber(sumEmpStock(folio.items),2)}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography align="right" className={classes.textoMiniFacheron}>T. Unidades</Typography>
                                        <Typography align="right">{formatNumber(sumStock(folio.items),2)}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </React.Fragment>
    )
}