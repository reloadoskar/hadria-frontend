import React, { useEffect, useState } from 'react'
import { CircularProgress, Grid, Typography, LinearProgress } from '@material-ui/core'
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

    return  !losItems ? <CircularProgress /> : 
        <Grid item xs={12} container>
            {losItems.length === 0 ?
                <Typography align="center">No se han registrado ventas.</Typography>
                :
                <React.Fragment>
                    {losItems.map((itm, index)=> (
                        <Grid key={index} item xs={12} container alignItems="center">
                            <Grid item xs={12} sm={3}>
                                <Typography className={classes.textoMiniFacheron} >Producto</Typography>
                                <Typography>
                                    {itm.producto.descripcion}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography className={classes.textoMiniFacheron} align="center">Comprado</Typography>
                                <Typography align="center">
                                    {formatNumber(itm.cantidad,2)} {itm.producto.unidad.abr} | {formatNumber(itm.empaques)} {itm.producto.empaque.abr}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Typography className={classes.textoMiniFacheron} align="center">En Inventario</Typography>
                                <Typography align="center">
                                    { itm.cantidad - sumCantidad( lasVentas.filter(v => v.producto._id === itm.id) ) < 0 ? "0.."
                                        : formatNumber( itm.cantidad - sumCantidad( lasVentas.filter(v => v.producto._id === itm.id) ), 2 )} {itm.producto.unidad.abr} | {formatNumber(itm.empaquesStock)} {itm.producto.empaque.abr}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Typography className={classes.textoMiniFacheron} align="center">Vendido {formatNumber(( ( (itm.stock*100)/itm.cantidad ) -100 ) * -1)} %</Typography>
                                <LinearProgress variant="determinate" value={( ( (itm.stock*100)/itm.cantidad ) -100 ) * -1} />
                            </Grid>
                            <Grid item xs={6} sm={1}>
                                <Typography className={classes.textoMiniFacheron} align="right">Precio prom.</Typography>
                                <Typography align="right" >$
                                    {lasVentas.filter(vnta => vnta.producto._id === itm.id).length > 0 ?
                                        formatNumber( sumImporte(lasVentas.filter(vnta => vnta.producto._id === itm.id) ) / (itm.cantidad - itm.stock) ,2) 
                                        :
                                        0
                                    }
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={1}>
                                <Typography className={classes.textoMiniFacheron} align="right">Importe</Typography>
                                <Typography align="right" >${formatNumber( sumImporte(lasVentas.filter(vnta => vnta.producto._id === itm.id), 1))}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                    { !isMobile ?
                        <Grid item container classes={{root: classes.paperClaro}}>
                            <Grid item sm={3}>
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
                                <Typography className={classes.textoMiniFacheron} align="right">Total Venta</Typography>
                                <Typography className={classes.textoMirame} align="right">${ formatNumber(sumImporte(lasVentas),2)}</Typography>
                            </Grid>
                        </Grid>
                        : null
                    }
                </React.Fragment>                   
            }
        </Grid> 
}