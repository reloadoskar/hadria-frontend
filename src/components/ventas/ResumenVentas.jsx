import React, { useEffect, useState } from 'react'
import { CircularProgress, Grid, Typography, Divider } from '@material-ui/core'
import {formatNumber, sumImporte} from '../Tools'
import useStyles from '../hooks/useStyles'
export default function ResumenVentas({items,compra}){
    const [elResumen, setElResumen] = useState(null)
    const classes = useStyles()
    useEffect(() => {
        setElResumen(items)
    },[items])

    const checkInvInicial = (id) =>{
        if(compra){
            let sumac = 0
            let sumae = 0
            compra.items.forEach(item => {
                if(item.producto._id === id){
                    sumac += item.cantidad
                    sumae += item.empaques
                }
            });
            return {cantidad: sumac, empaques: sumae}
        }
    }

    return  (
        <Grid container spacing={2}>
            {!elResumen ? 
                <CircularProgress />
                : 
                <Grid item xs={12} container>
                    {elResumen.length === 0 ?
                        <Typography align="center">No se han registrado ventas.</Typography>
                        :
                        <React.Fragment>
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
                                            {formatNumber(item.cantidad,2)} / {formatNumber(checkInvInicial(item._id).cantidad,2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={2}>
                                        <Typography className={classes.textoMiniFacheron} align="right">{item.producto.empaque.abr}</Typography>
                                        <Typography align="right">
                                            {item.empaques} / {checkInvInicial(item._id).empaques}
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
                        </React.Fragment>                   
                    }
                </Grid>
            }
        </Grid>
    )  
}