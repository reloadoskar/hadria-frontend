import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, Typography, Divider } from '@material-ui/core'
import CompraBasic from './CompraBasic'
import { sumImporte } from '../Tools'
import useStyles from '../hooks/useStyles'
import CountUpAnimation from '../tools/CountUpAnimation'
export default function ListaCompras({ compras, editCompra, verCompra }) {
    const classes = useStyles()
    const [lasCompras, setLasCompras] = useState(null)

    const [tVentas, setVentas] = useState(0)
    const [tCosto, setCosto] = useState(0)
    const [tPagos, setPagos] = useState(0)
    const [tGastos, setGastos] = useState(0)
    const [tResultado, setResultado] = useState(0)

    useEffect(() => {
        if (compras) {
            setLasCompras(compras)
        }
        return () => setLasCompras(null)
    }, [compras])

    useEffect(() => {
        let isLoaded = true
        if (lasCompras && isLoaded) {
            let tc = 0
            tc = sumImporte(lasCompras)
            setCosto(tc)
            let tv = 0
            lasCompras.map(compra => tv += sumImporte(compra.ventaItems))
            setVentas(tv)
            let tg = 0
            lasCompras.map(compra => tg += sumImporte(compra.gastos))
            setGastos(tg)
            let tp = 0
            lasCompras.map(compra => tp += sumImporte(compra.pagos))
            setPagos(tp)
            let tr = tv - tc - tg
            setResultado(tr)
        }
        return () => isLoaded = false
    }, [lasCompras])

    const clearComponent = () => {
        setCosto(0)
        setVentas(0)
        setPagos(0)
        setGastos(0)
        setResultado(0)
    }
    
    return (
        <Grid item container xs={12} spacing={2} >
            <Grid item xs={12} sm={1}>
                <Typography variant="h3" align="center">{lasCompras ? <CountUpAnimation num={lasCompras.length} temp={300} /> : null}</Typography>
                <Typography align="center">Operaciones</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Typography align="right">Venta total</Typography>
                <Typography variant="h5" align="right" className={classes.textoMirame}>$ <CountUpAnimation num={tVentas} temp={650} /></Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography align="right">Costo total</Typography>
                <Typography align="right" variant="h5" className={classes.textoMirameSangron}>$<CountUpAnimation num={tCosto} temp={900} /></Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography align="right">Pagos</Typography>
                <Typography align="right" variant="h6">-$<CountUpAnimation num={tPagos} temp={520} /></Typography>
                <Divider />
                <Typography align="right">Saldo</Typography>
                <Typography align="right" variant="h6">$<CountUpAnimation num={tCosto - tPagos} temp={500} /></Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography align="right">Gasto total</Typography>
                <Typography variant="h5" align="right">-$<CountUpAnimation num={tGastos} temp={560} /></Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography align="right">Resultado</Typography>
                <Typography align="right" variant="h5" className={tResultado > 0 ? classes.textoMirameExito : classes.textoMirameSangron}>$<CountUpAnimation num={tResultado} temp={230} /></Typography>
            </Grid>
            {lasCompras === null ?
                <Grid item xs={12}>
                    <Typography component="div" align="center" >
                        <CircularProgress />
                    </Typography>
                </Grid>
                :
                <React.Fragment>
                    {lasCompras
                        .map((compra, i) => (
                            <Grid item xs={12} key={i}>
                                <CompraBasic
                                    key={i}
                                    compra={compra}
                                    editCompra={editCompra}
                                    verCompra={verCompra}
                                />
                            </Grid>
                        ))
                    }

                </React.Fragment>
            }
        </Grid>
    )
}