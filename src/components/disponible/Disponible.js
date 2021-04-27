import React, {useEffect, useState} from 'react'
import { Card, CardContent,
    Grid,
    Typography, 
    MenuItem,
    CardHeader,
    CircularProgress,
} from '@material-ui/core'
import {formatNumber} from '../Tools'
import useStyles from '../hooks/useStyles'
import GraficaVentas from './GraficaVentas';

export default function Disponible(props){
    const {ubicacions, ingresos, egresos} = props
    const classes = useStyles()
    
    const [totalDisp, setTotalDisp] = useState(null)
    const [dispxubic, setDispxubic] = useState(null)
    useEffect(() => {
        if(ingresos && egresos && ubicacions){
            let tdisp = ingresos.totalIngresos - egresos.totalEgresos
            let disp = []
            ubicacions.forEach(ubicacion => {
                let el = {}
                let ti = 0
                let te= 0
                el.ubicacion = ubicacion
                el.ingresos = []
                el.egresos = []
                ingresos.ingresos.forEach(ingreso => {
                    if(ubicacion._id === ingreso.ubicacion._id){
                        el.ingresos.push(ingreso)
                        ti += ingreso.importe
                    }
                });  
                egresos.egresos.forEach(egreso => {
                    if(ubicacion._id === egreso.ubicacion._id){
                        el.egresos.push(egreso)
                        te += egreso.importe
                    }
                });  
                el.total = ti - te
                
                disp.push(el)
            })
            setTotalDisp(tdisp)
            setDispxubic(disp)

        }
        return () => {
            setDispxubic(null)
            setTotalDisp(null)
        }      
    },[ingresos, egresos, ubicacions])
    return(
        <Card>
            <CardHeader title="Disponible" />
                <CardContent>
                {totalDisp === null  ?
                    <CircularProgress />
                :
                    <Grid container >
                        <Grid item xs={12}>
                            <Typography className={classes.textoMiniFacheron} align="right">
                                Total:
                            </Typography>
                            <Typography variant="h6" className={classes.textoGroovie} align="right">
                                $ {formatNumber(totalDisp,2)}
                            </Typography>
                        </Grid>
                        <Grid item sm={12} md={4}>
                            {dispxubic.map((ubic, i) => (
                                <MenuItem key={i} onClick={() => props.verCorte(ubic.ubicacion)}>
                                    <Grid container >
                                        <Grid item xs={6}>
                                            <Typography>{ubic.ubicacion.nombre}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">${formatNumber(ubic.total)}</Typography>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                            ))}
                        </Grid> 
                        <Grid item sm={12} md={8}>
                            <GraficaVentas data={dispxubic} />
                        </Grid>                                                           
                    </Grid>
                }
            </CardContent>
        </Card>
    )
}