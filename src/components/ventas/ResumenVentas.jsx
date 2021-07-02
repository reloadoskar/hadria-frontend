import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CircularProgress, Grid, Typography, Divider } from '@material-ui/core'
import {formatNumber, sumImporte} from '../Tools'
import useStyles from '../hooks/useStyles'
export default function ResumenVentas({items}){
    const [elResumen, setElResumen] = useState(null)
    const classes = useStyles()
    useEffect(() => {
        setElResumen(items)
    },[])
    
    // useEffect(() => {
    //     let rsmn = items.reduce((acum, item) => {
    //         let producto = item.producto.descripcion
    //         // let elemento = acum.find(element => element.producto === producto)
    //         if(!acum.hasOwnProperty(producto)) {
    //             acum[producto] = {producto: item.producto.descripcion, cantidad:0, empaques:0, importe:0};
    //         }
    //         // if(!elemento){
    //         //     acum.push({producto: item.producto.descripcion, cantidad:0, empaques:0, importe:0})
    //         // }else{
    //             // return () => {
    //                 acum[producto].cantidad += item.cantidad
    //                 acum[producto].empaques += item.empaques
    //                 acum[producto].importe += item.importe
    //             // }
    //         // }
    //         return acum
    //     },[])
    //     // (item.producto.descripcion in acum) ? acum[item.producto.descripcion].push(item) : acum[item.producto.descripcion] = [item]

    
    //     setElResumen(rsmn)

    // },[items])

    return  (
        <Grid container spacing={2}>
            {!elResumen ? 
                <CircularProgress />
                : 
                <Grid item xs={12} container>
                    <Grid item xs={12} >
                        <Typography className={classes.textoMirame} align="center" children="Resumen de VENTAS" />
                        <Divider />
                    </Grid>
                        {elResumen.map((item, index)=> (
                            <Grid key={index} item xs={12} container alignItems="center">
                                <Grid item xs={12} sm={4}>
                                    <Typography>
                                        {item.producto.descripcion}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Typography className={classes.textoMiniFacheron} align="right">{item.producto.unidad.abr}</Typography>
                                    <Typography align="right">
                                        {item.cantidad}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Typography className={classes.textoMiniFacheron} align="right">{item.producto.empaque.abr}</Typography>
                                    <Typography align="right">
                                        {item.empaques}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Typography className={classes.textoMiniFacheron} align="right">PRECIO PROMEDIO</Typography>
                                    <Typography align="right">
                                        ${formatNumber((item.importe/item.cantidad),2)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <Typography align="right">
                                        ${formatNumber(item.importe,2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                        <Divider />
                        <Grid item xs={12} >
                            <Divider />
                            <Typography align="right" className={classes.textoMiniFacheron}>
                                TOTAL VENTAS:
                            </Typography>
                            <Typography className={classes.textoMirame} align="right">
                                ${formatNumber(sumImporte(elResumen),2)}
                            </Typography>
                        </Grid>                        
                </Grid>
            }
        </Grid>
    )  
}