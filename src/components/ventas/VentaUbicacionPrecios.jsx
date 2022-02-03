import React, { useState, useEffect } from "react"
import { Grid, Typography, Container } from "@material-ui/core"
import { formatNumber } from "../Tools"
import useStyles from "../hooks/useStyles"

export default function VentaUbicacionPrecios({ubicacion, precios}){
    const classes = useStyles()
    const [tprecios, setTprecios] = useState(0)
    const [tcantidad, setTcantidad] = useState(0)
    const [tempaques, setTempaques] = useState(0)
    const [timporte, setTimporte] = useState(0)
    useEffect(()=>{
        setTcantidad( precios.reduce((a,b) => a += b.tcantidad,0))
        setTempaques( precios.reduce((a,b) => a += b.tempaques,0))
        setTimporte( precios.reduce((a,b) => a += b.timporte,0))
        setTprecios( ( precios.reduce((a,b) => a += b.precio,0) / precios.length || 0) )
    },[precios])
    return (
        <Grid container className={classes.paperContorno} >
            <Grid item xs={12}>
                <Typography variant="h6" className={classes.textoMirame}>{ubicacion.nombre}</Typography>
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
                        <Grid item xs={2}><Typography className={classes.textoMirame} align='right' >{formatNumber(tprecios,1 )}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirame} align='right' >{formatNumber(tcantidad, 1)}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirame} align='right' >{formatNumber(tempaques,1)}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.textoMirame} align='right' >$ {formatNumber( timporte,1) }</Typography></Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}