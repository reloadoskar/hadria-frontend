import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
import GraficaProductoPrecios from '../charts/GraficaProductoPrecios'
export default function VentaItemPrecios({item, precios}){
    const classes = useStyles()
    return(
        <Grid container className={classes.paperContorno} alignItems='center'>
            <Grid item xs={8}>
                <Typography className={classes.textoSubrayadoNice} variant="h6" align="center">{item.producto.descripcion}</Typography>
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
                            <Grid item xs={3}><Typography align='right' >{precio.tempaques}</Typography></Grid>
                            <Grid item xs={3}><Typography align='right' >$ {formatNumber(precio.timporte,1)}</Typography></Grid>
                        </Grid>
                    ))}
                    <Grid container >
                        <Grid item xs={1}><Typography className={classes.textoMirame} align='right' >TOTALES:</Typography></Grid>
                        <Grid item xs={2}><Typography className={classes.textoMirame} align='right' >{formatNumber(precios.reduce((acc, precio) => acc += precio.timporte,0) / (item.cantidad - item.stock ) ,1 )}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirame} align='right' >{formatNumber((item.cantidad - item.stock ),1 )}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirame} align='right' >{formatNumber( (item.empaques - item.empaquesStock),1)}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirame} align='right' >$ {formatNumber( precios.reduce((acc, precio) => acc += precio.timporte, 0),1) }</Typography></Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={1}><Typography className={classes.textoMirame} align='right' ></Typography></Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.textoMiniFacheron} align='right'>Costo:</Typography>
                            <Typography className={classes.textoMirame} align='right' >{formatNumber(item.costo,1)}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.textoMiniFacheron} align='right'>Comprado:</Typography>
                            <Typography className={classes.textoMirame} align='right' >{formatNumber(item.cantidad,1)}</Typography>
                            {item.cantidad - (item.cantidad-item.stock) > 1 ?
                                <React.Fragment>
                                    <Typography className={`${classes.textoMiniFacheron} ${classes.textoMirameExito}`} align='right'>Inventario:</Typography>
                                    <Typography className={classes.textoMirameExito} align='right' >{formatNumber(item.cantidad - (item.cantidad-item.stock),1)}</Typography>
                                </React.Fragment>
                                    : null
                            }
                        </Grid>
                        <Grid item xs={3}>
                        <Typography className={classes.textoMiniFacheron} align='right'>Comprado:</Typography>
                            <Typography className={classes.textoMirame} align='right' >{formatNumber( item.empaques ,1)}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.textoMiniFacheron} align='right'>Costo:</Typography>
                            <Typography className={classes.textoMirame} align='right' >$ {formatNumber( (item.costo * item.cantidad) ,1) }</Typography>
                            <Typography className={classes.textoMiniFacheron} align='right'>Utilidad:</Typography>
                            <Typography className={classes.textoMirame} align='right' >({ formatNumber(  
                                ( precios.reduce((acc, precio) => acc += precio.timporte, 0)  
                                - (item.costo * item.cantidad) )
                                * 100  / (item.costo * item.cantidad)  
                            ,1)  }%) $ {formatNumber( precios.reduce((acc, precio) => acc += precio.timporte, 0) - (item.costo * item.cantidad)  ,1) }</Typography>
                            {item.cantidad - (item.cantidad-item.stock) > 1 ?
                                <React.Fragment>
                                    <Typography className={`${classes.textoMiniFacheron} ${classes.textoMirameExito}`} align='right'>En Inventario:</Typography>
                                    <Typography className={classes.textoMirameExito} align='right' >+{formatNumber( (item.cantidad - (item.cantidad-item.stock) ) * item.costo,1)}</Typography>
                                    <Typography className={`${classes.textoMiniFacheron} ${classes.textoMirameExito}`} align='right'>Resultado Aprox:</Typography>
                                    <Typography className={classes.textoMirameExito} align='right' >{
                                        formatNumber( 
                                            ( (item.cantidad - (item.cantidad-item.stock) ) * item.costo )
                                                +
                                            ( precios.reduce((acc, precio) => acc += precio.timporte, 0) - (item.costo * item.cantidad) ) 
                                        ,1) }
                                    </Typography>
                                </React.Fragment>
                                    : null
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Grid item xs={4}>
                <GraficaProductoPrecios data={precios} />
            </Grid>
            
        </Grid>
    )
}