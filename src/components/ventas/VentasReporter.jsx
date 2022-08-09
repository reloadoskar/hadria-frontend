import React, { useState, useContext } from 'react'
import { Divider, Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import { UbicacionContext } from '../ubicaciones/UbicacionContext'
import VentasTable from './VentasTable'
import { useEffect } from 'react'
import useStyles from '../hooks/useStyles'
import { formatNumber } from '../Tools'
import moment from 'moment'
export default function VentasReporter({ data, rango }) {
    const classes = useStyles()
    const { ubicacion, selectUbicacion, ubicacions } = useContext(UbicacionContext)
    const [dataFiltrada, setDataf] = useState([])
    const [mermas, setMermas] = useState([])
    const [cantt, setCantt] = useState(0)
    const [tmermas, setTmermas] = useState(0)
    const [tventas, setTventas] = useState(0)
    const [tcant, setTcant] = useState(0)
    const [timp, setTimp] = useState(0)
    const [temp, setTemp] = useState(0)
    const [tpprom, setTprom] = useState(0)
    useEffect(() => {
        let filtro = []
        if (ubicacion === null || ubicacion === "TODO" ) {
            filtro = data
        }else {
            filtro = data.filter(itm => itm.ubicacion._id === ubicacion._id)
        }
        let tv = filtro.length
        let ct = filtro.reduce((acc, it) => acc += it.cantidad, 0)
        let et = filtro.reduce((acc, it) => acc += it.empaques, 0)
        let it = filtro.reduce((acc, it) => acc += it.importe, 0)
        let lmermas = filtro.filter(itm => itm.precio === 0).reduce((acc, it) => acc += it.cantidad, 0)
        let pprom = it / ct
        let tmerms = lmermas * pprom
        setDataf(filtro)
        setMermas(lmermas)
        setTmermas(tmerms)
        setTventas(tv)
        setTcant(ct)
        setTimp(it)
        setTemp(et)
        setCantt(ct-lmermas)
        setTprom(pprom)
    }, [ubicacion, data]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Grid container spacing={2} className={classes.paperBasico}>
            <Grid item xs={12}>
                <Typography variant="h6" align="center" className={classes.textoMirame}>
                    REPORTE DE VENTAS
                </Typography>
                <Divider />
                <Typography align="center" className={classes.textoMirame}>
                    del {moment(rango.f1).format("DD MMMM YY")} al {moment(rango.f2).format("DD MMMM YY")}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    select
                    fullWidth
                    id="ubicacion"
                    label="Selecciona sucusal"
                    value={ubicacion}
                    onChange={(e) => selectUbicacion(e.target.value)}
                >
                    <MenuItem value={"TODO"}>TODAS</MenuItem>
                    {ubicacions.map((ub, i) => (
                        <MenuItem key={i} value={ub}>
                            {ub.nombre}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>            
            {dataFiltrada.length === 0 ? null :
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} className={classes.paperSingle}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography >
                                    Número de Ventas:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame}>
                                    {formatNumber(tventas)}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography >
                                    Número de Empaques (Cajas):
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="right" className={classes.textoMirame}>
                                    {formatNumber(temp, 1)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography >
                                    Cantidad (kg):
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame}>
                                    {formatNumber(tcant, 2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography >
                                    Precio promedio:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame}>
                                    ${formatNumber(tpprom, 2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography >
                                    Importe total:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame}>
                                    ${formatNumber(timp, 2)}
                                </Typography>  
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.paperSingle}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography align="center" className={classes.textoMirame}>
                                    Cantidad vendido
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.textoMiniFacheron}>
                                    Bruto:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame}>
                                    {formatNumber(tcant, 2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.textoMiniFacheron}>
                                    Neto:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame}>
                                    {formatNumber(cantt, 2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.textoMiniFacheron}>
                                    Mermas:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame} color="secondary">
                                    - {formatNumber(mermas, 2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.textoMiniFacheron}>
                                    Costo mermas:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame} color="secondary">
                                    ${formatNumber(tmermas, 2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.textoMiniFacheron}>
                                    % de venta
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right" className={classes.textoMirame} color="secondary">
                                    {formatNumber( (tmermas*100/timp) ,2)}%
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <VentasTable data={dataFiltrada} />
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}