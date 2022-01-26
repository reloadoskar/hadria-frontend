import React, {useState, useEffect, useContext} from 'react'
import { Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import GraficaBarras from '../charts/GraficaBarras'
import useStyles from '../hooks/useStyles'
import { sumImporte, reduceNumber, sumSaldo } from '../Tools'
import {ProductorContext} from '../productors/ProductorContext'
// import CountUpAnimation from '../tools/CountUpAnimation'
import {Meses} from '../tools/Meses'
export default function ComprasMesProductor(){
    const {loadComprasMesProductor, comprasMesProductor} = useContext(ProductorContext)
    const classes = useStyles()
    const now = new Date()
    const [month, setMonth] = useState(now.getMonth() + 1)
    const [year, setYear] = useState(now.getFullYear())
    useEffect(()=>{
        loadComprasMesProductor(year, month)
    },[year, month]) // eslint-disable-line react-hooks/exhaustive-deps
    return comprasMesProductor === [] ? null :
        <Card>
            <CardHeader title="Compras del mes" />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={10}>
                        <TextField 
                            select
                            id="year"
                            label="Año"
                            value={year}
                            onChange={(e)=>setYear(e.target.value)}
                        >
                            <MenuItem value={2021} id="2021">2021</MenuItem>
                            <MenuItem value={2022} id="2022">2022</MenuItem>
                        </TextField>
                        <TextField 
                            select
                            id="month"
                            label="Mes"
                            value={month}
                            onChange={(e)=>setMonth(e.target.value)}
                        >
                            {Meses.map((mes, i) => (
                                <MenuItem value={i} id={i} key={i}>{mes}</MenuItem>
                            ))}
                        </TextField>
                        
                        <GraficaBarras losDatos={comprasMesProductor.filter(compra => compra.importe > 0)} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography className={classes.textoMiniFacheron} align="right">Total:</Typography>
                        <Typography className={classes.textoMirame} align="right">
                            {/* $ <CountUpAnimation num={sumImporte(comprasMesProductor)} temp={420}/> */}
                            $ {reduceNumber( sumImporte(comprasMesProductor) ) }
                        </Typography>
                        <Typography className={classes.textoMiniFacheron} align="right">Saldo:</Typography>
                        <Typography className={classes.textoMirameSangron} align="right">
                            {/* $ <CountUpAnimation num={sumSaldo(comprasMesProductor)} temp={840} /> */}
                            $ {reduceNumber( sumSaldo(comprasMesProductor) ) }
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
}