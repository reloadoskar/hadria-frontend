import React, { useEffect, useState } from 'react'
import { CircularProgress, Grid, Typography, Divider, LinearProgress } from '@material-ui/core'
import {formatNumber, sumImporte, agrupaItems, sumEmpStock, sumCantidad, sumEmpaques, sumStock} from '../Tools'
import useStyles from '../hooks/useStyles'
import { useMediaQuery } from '@material-ui/core';
export default function ResumenVentas({items,ventas}){
    const [lasVentas, setLasVentas] = useState(null)
    const [losItems, setLosItems] = useState(null)
    const classes = useStyles()
    const isMobile = useMediaQuery('(max-width: 720px)')
    useEffect(() => {
        if(items){
            let grupo = agrupaItems(items, "producto")
            setLosItems(grupo)
        }
    },[items])

    useEffect(()=>{
        if(ventas){
            setLasVentas(ventas)
        }
    },[ventas])

    return  (
        <Grid container spacing={2}>
            {!losItems ? 
                <CircularProgress />
                : 
                <Grid item xs={12} container>
                    {losItems.length === 0 ?
                        <Typography align="center">No se han registrado ventas.</Typography>
                        :
                        <React.Fragment>
                            <Grid item xs={12} >
                                <Typography className={classes.textoMirame} align="center" children="Resumen" />
                            </Grid>
                            <Divider />
                            {losItems.map((item, index)=> (
                                <Grid key={index} item xs={12} container alignItems="center">
                                    <Grid item xs={12} sm={3}>
                                        <Typography>
                                            {item.producto.descripcion}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography className={classes.textoMiniFacheron} align="center">Comprado</Typography>
                                        <Typography align="center">
                                            {formatNumber(item.cantidad,2)} {item.producto.unidad.abr} | {formatNumber(item.empaques)} {item.producto.empaque.abr}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <Typography className={classes.textoMiniFacheron} align="center">En Inventario</Typography>
                                        <Typography align="center">
                                            {formatNumber(item.stock,2)} {item.producto.unidad.abr} | {formatNumber(item.empaquesStock)} {item.producto.empaque.abr}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography className={classes.textoMiniFacheron} align="center">Vendido {formatNumber(( ( (item.stock*100)/item.cantidad ) -100 ) * -1)} %</Typography>
                                        <LinearProgress variant="determinate" value={( ( (item.stock*100)/item.cantidad ) -100 ) * -1} />
                                    </Grid>
                                    <Grid item xs={6} sm={1}>
                                        <Typography className={classes.textoMiniFacheron} align="right">Precio promedio</Typography>
                                        <Typography align="right" >$
                                            {lasVentas.filter(vnta => vnta.producto._id === item.id).length > 0 ?
                                                formatNumber( sumImporte(lasVentas.filter(vnta => vnta.producto._id === item.id) ) / (item.cantidad - item.stock) ,2) 
                                                :
                                                0
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={1}>
                                        <Typography className={classes.textoMiniFacheron} align="right">Total Venta</Typography>
                                        <Typography align="right" >${formatNumber( sumImporte(lasVentas.filter(vnta => vnta.producto._id === item.id), 1))}</Typography>
                                    </Grid>
                                </Grid>
                            ))}
                            <Divider />
                            { !isMobile ?
                                <Grid item container classes={{root: classes.paperClaro}}>
                                    <Grid sm={3}>
                                        <Typography align="right" >Totales:</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography align="center">{ formatNumber(sumCantidad(losItems),2)} | { formatNumber(sumEmpaques(losItems),1) }</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <Typography align="center">{ formatNumber(sumStock(losItems),2)} | { formatNumber(sumEmpStock(losItems),1) }</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}></Grid>
                                    <Grid item xs={6} sm={1}>
                                        <Typography align="right">${ formatNumber(sumImporte(lasVentas),2)}</Typography>
                                    </Grid>
                                </Grid>
                                : null
                            }
                        </React.Fragment>                   
                    }
                </Grid>
            }
        </Grid>
    )  
}