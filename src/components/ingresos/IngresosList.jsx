import React, {useEffect, useState} from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import IngresoBasic from '../ingresos/IngresoBasic'
import useStyles from '../hooks/useStyles'
import {formatNumber, sumImporte} from '../Tools'
export default function IngresosList({data}){
    const classes = useStyles()
    const [ingresos, setIngresos] = useState([])
    const [totalIngresos, setTotal] = useState(0)
    useEffect(()=>{
        setIngresos(data)
    },[data])

    useEffect(()=>{
        setTotal(sumImporte(ingresos))
    },[ingresos])
    return (
        <Grid container spacing={2} className={classes.paperContorno}>
            {ingresos.map((ingreso, i) => (
                <IngresoBasic data={ingreso} key={i} />
            ))}
            <Divider />
            <Grid item xs={12}>
            <Typography className={classes.textoMirame} align="right">${formatNumber(totalIngresos, 2)}</Typography>
            </Grid>
        </Grid>
    )
}