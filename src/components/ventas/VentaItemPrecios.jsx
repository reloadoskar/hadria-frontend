import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
import GraficaProductoPrecios from '../charts/GraficaProductoPrecios'
import moment from 'moment'
export default function VentaItemPrecios({item, precios, basic=false, corte=false}){
    const classes = useStyles()
    const [precioPromedio, setPrecioProm] = useState(0)
    const [tCantidad, setTcantidad] = useState(0)
    const [tEmpaques, setTempaques] = useState(0)
    const [tImporte, setTimporte] = useState(0)
    const [tCosto, setTCosto] = useState(0)
    const [disponible, setDisponible] = useState(0)
    useEffect(()=>{
        let sumCant = precios.reduce((acc, precio)=> acc += precio.tcantidad,0) 
        setPrecioProm( precios.reduce((acc, precio) => acc += precio.timporte,0) / sumCant || 0)
        setTcantidad(sumCant)
        setTempaques(precios.reduce((acc, precio)=> acc += precio.tempaques,0))
        setTimporte(precios.reduce((acc, precio) => acc += precio.timporte, 0))
        setTCosto(item.costo * item.cantidad)
        setDisponible(item.cantidad - sumCant)
    },[precios, item])
    return precios.length > 0 ?
        <Grid container className={classes.paperBasico} alignItems='center'>
            <Grid container alignItems='center'>
                {corte?
                    <Grid item xs={3}>
                        <Typography className={classes.textoMiniFacheron} >{moment(item.compraItem.createdAt).format("DD/MM/YY")}</Typography>
                        <Typography className={classes.textoMirame} >#{item.compra.folio}</Typography>
                    </Grid>
                    : null
                }
                <Grid item xs>
                    <Typography className={classes.textoSubrayadoNice} variant="h6" align="center">{item.producto.descripcion} {item.compraItem.clasificacion}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Container maxWidth="md">
                    <Grid container >
                        <Grid item xs={3}><Typography align='right' >Precio ($)</Typography></Grid>
                        <Grid item xs={3}><Typography align='right' >Cantidad</Typography></Grid>
                        <Grid item xs={3}><Typography align='right' >Empaques</Typography></Grid>
                        <Grid item xs={3}><Typography align='right' >Importe ($)</Typography></Grid>
                    </Grid>
                    {precios.sort((a,b)=>a.precio - b.precio).map((precio, i)=>(
                        <Grid container key={i}>
                            <Grid item xs={3}><Typography align='right' >$ {formatNumber(precio.precio,1)}</Typography></Grid>
                            <Grid item xs={3}><Typography align='right' >{formatNumber( precio.tcantidad,1)}</Typography></Grid>
                            <Grid item xs={3}><Typography align='right' >{formatNumber(precio.tempaques,1)}</Typography></Grid>
                            <Grid item xs={3}><Typography align='right' >$ {formatNumber(precio.timporte,1)}</Typography></Grid>
                        </Grid>
                    ))}
                    <Grid container >
                        <Grid item xs={1}><Typography className={classes.textoMirame} align='right' >TOTALES:</Typography></Grid>
                        <Grid item xs={2}><Typography className={classes.textoMirame} align='right' >{formatNumber(precioPromedio ,1 )}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirame} align='right' >{formatNumber(tCantidad,1 )}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirame} align='right' >{formatNumber( tEmpaques,1)}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirameExito} align='right' >$ {formatNumber( tImporte,1) }</Typography></Grid>
                    </Grid>
                    {basic ? null : 
                        <Grid container className={classes.paperBasico}>
                            <Grid item xs={1}><Typography className={classes.textoMirame} align='right' ></Typography></Grid>
                            <Grid item xs={2}>
                                <Typography className={classes.textoMiniFacheron} align='right'>Costo inicial:</Typography>
                                <Typography className={classes.textoMirame} align='right' >{formatNumber(item.costo,1)}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography className={classes.textoMiniFacheron} align='right'>Cant. Comprado:</Typography>
                                <Typography className={classes.textoMirame} align='right' >{formatNumber(item.cantidad,1)}</Typography>
                                {item.cantidad - (item.cantidad-item.stock) > 1 ?
                                    <React.Fragment>
                                        <Typography className={`${classes.textoMiniFacheron} ${classes.textoMirameExito}`} align='right'>Disponible:</Typography>
                                        <Typography className={classes.textoMirameExito} align='right' >{formatNumber(disponible,1)}</Typography>
                                    </React.Fragment>
                                        : null
                                }
                            </Grid>
                            <Grid item xs={3}>
                            <Typography className={classes.textoMiniFacheron} align='right'>Emp. Comprado:</Typography>
                                <Typography className={classes.textoMirame} align='right' >{formatNumber( item.empaques ,1)}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography className={classes.textoMiniFacheron} align='right'>Importe:</Typography>
                                <Typography className={classes.textoMirameSangron} align='right' >$ {formatNumber( (item.costo * item.cantidad) ,1) }</Typography>
                                <Typography className={classes.textoMiniFacheron} align='right'>Utilidad:
                                    { tCosto > 1 ? 
                                        formatNumber( ((tImporte - tCosto ) * 100) / tCosto,1 ) + "%"
                                        : null 
                                    }
                                </Typography>
                                <Typography className={ tImporte - tCosto < 0 ? classes.textoMirameSangron : classes.textoMirameExito} align='right' >$ 
                                    {formatNumber( tImporte - tCosto,1) }
                                </Typography>
                                {item.cantidad - (item.cantidad-item.stock) > 1 && tCosto > 1  ?
                                    <React.Fragment>
                                        <Typography className={`${classes.textoMiniFacheron} ${classes.textoMirameExito}`} align='right'>Valor inventario:</Typography>
                                        <Typography className={classes.textoMirameExito} align='right' >+{formatNumber( disponible * item.costo,1)}</Typography>
                                        <Typography className={`${classes.textoMiniFacheron} ${classes.textoMirameExito}`} align='right'>Posible resultado:</Typography>
                                        <Typography className={classes.textoMirameExito} align='right' >
                                            ${ formatNumber( disponible * item.costo +tImporte - tCosto,1) } - ${ formatNumber( disponible * precioPromedio +tImporte - tCosto,1) }
                                        </Typography>
                                    </React.Fragment>
                                        : null
                                }
                            </Grid>
                        </Grid>
                    }
                </Container>
            </Grid>
            <Grid item xs={12} sm={4}>
                <GraficaProductoPrecios data={precios} />
            </Grid>
            
        </Grid>
        : null
}