import React, { useEffect, useState } from 'react'
import { Grid, LinearProgress, Typography, Divider, Container, TextField, MenuItem} from '@material-ui/core'
// import VentaGrouped from '../ventas/VentaGrouped'
// import CountUpAnimation from '../tools/CountUpAnimation'
import { formatNumber } from '../Tools'
import useStyles from '../hooks/useStyles'
import PaginationTable from '../paggination/PaginationTable'
// import GraficaCreditoContado from '../charts/GraficaCreditoContado'
import {useUbicacion} from '../ubicaciones/UbicacionContext'
import moment from 'moment'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from 'victory'
export default function ListaVentas({ ventas }) {
    const classes = useStyles()
    const {ubicacions} = useUbicacion() 
    const [lasVentas, setLasVentas] = useState([])
    const [mermas, setMermas] = useState([])
    const [cantt, setCantt] = useState(0)
    const [tmermas, setTmermas] = useState(0)
    // const [tventas, setTventas] = useState(0)
    const [tcant, setTcant] = useState(0)
    const [timp, setTimp] = useState(0)
    const [temp, setTemp] = useState(0)
    const [tpprom, setTprom] = useState(0)

    const [ventasFiltradas, setVf] = useState([])

    const [filtros, setFiltros] = useState({
        tipo:"TODO", 
        // fecha: moment().format("YYYY-MM-DD"), 
        fecha: "", 
        ubicacion:"TODAS",
        clasificacion: "TODO"    
    })

    const [relacionSeleccionada, setRsel] = useState(0)
    const [relacionFechaImporte, setRfi] = useState([])
    const [relacionFechaEmpaques, setRfe] = useState([])
    const [relacionUbicacionEmpaques, setRubem] = useState([])
    const [relacionUbicacionImporte, setRubimp] = useState([])

    useEffect(()=>{
        if(lasVentas && filtros){
            var listaFiltrada = lasVentas

            if(filtros.tipo !== "TODO"){
                listaFiltrada = listaFiltrada.filter(el=>el.venta.tipoPago === filtros.tipo)
            }
            if(filtros.fecha !== ""){
                listaFiltrada = listaFiltrada.filter(el=>el.fecha === filtros.fecha)
            }
            if(filtros.ubicacion !== "TODAS"){
                listaFiltrada = listaFiltrada.filter(el=>el.ubicacion._id === filtros.ubicacion._id)
            }
            // if(filtros.compra !== "TODO"){
            //     listaFiltrada = listaFiltrada.filter(el=>el.compra.folio === filtros.compra)
            // }
            // if(filtros.producto !== "TODO"){
            //     let dc = JSON.parse(filtros.producto)
            //     listaFiltrada = listaFiltrada.filter(el=>el.compraItem._id === dc.compraItem._id)
            // }
            if(filtros.clasificacion !== "TODO"){
                listaFiltrada = listaFiltrada.filter(el=>el.compraItem.clasificacion === filtros.clasificacion)
            }
            setVf(listaFiltrada)

            let fechasdisponibles = listaFiltrada.reduce((acc,el)=>{
                if(!acc.includes(el.fecha)){
                    return [...acc, el.fecha]
                }
                return acc
            },[])

            let ubicacionesdisponibles = listaFiltrada.reduce((acc,el)=>{
                if(!acc.includes(el.ubicacion.nombre)){
                    return [...acc, el.ubicacion.nombre]
                }
                return acc
            },[])

            // let tv = listaFiltrada.length
            let ct = listaFiltrada.reduce((acc, it) => acc += it.cantidad, 0)
            let et = listaFiltrada.reduce((acc, it) => acc += it.empaques, 0)
            let it = listaFiltrada.reduce((acc, it) => acc += it.importe, 0)
            let lmermas = listaFiltrada.filter(itm => itm.precio === 0).reduce((acc, it) => acc += it.cantidad, 0)
            let pprom = it / ct
            let tmerms = lmermas * pprom

            var relFechaImporte = [] 
            fechasdisponibles.forEach(fecha => {
                let importeFecha = listaFiltrada.filter(el=>el.fecha===fecha).reduce((acc,el)=>acc+=el.importe,0)
                relFechaImporte.push({fecha: moment(fecha).format("ddd DD"), importe: importeFecha})
            });
            setRfi(relFechaImporte)

            var relFechaEmpaques = []
            fechasdisponibles.forEach(fecha=>{
                let empaquesFecha = listaFiltrada.filter(el=>el.fecha===fecha).reduce((acc,el)=>acc+=el.empaques,0)
                relFechaEmpaques.push({fecha: moment(fecha).format("ddd DD"), empaques: empaquesFecha})
            })
            setRfe(relFechaEmpaques)

            var relUbicacionEmpaques = []
            ubicacionesdisponibles.forEach(ub=>{
                let empaquesUbicacion = listaFiltrada.filter(el=>el.ubicacion.nombre===ub)
                    .reduce((acc,el)=>acc+=el.empaques,0)
                    relUbicacionEmpaques.push({ubicacion: ub, empaques: empaquesUbicacion})
            })
            setRubem(relUbicacionEmpaques)

            var relUbicacionImporte = []
            ubicacionesdisponibles.forEach(ub=>{
                let importeUbicacion = listaFiltrada.filter(el=>el.ubicacion.nombre===ub)
                    .reduce((acc,el)=>acc+=el.importe,0)
                    relUbicacionImporte.push({ubicacion: ub, importe: importeUbicacion})
            })
            setRubimp(relUbicacionImporte)

            
            setMermas(lmermas)
            setTmermas(tmerms)
            // setTventas(tv)
            setTcant(ct)
            setTimp(it)
            setTemp(et)
            setCantt(ct-lmermas)
            setTprom(pprom)
        }
    },[filtros, lasVentas])

    useEffect(() => {
        if (ventas) {
            setLasVentas(ventas)
        }
        return () => {
            setLasVentas([])            
        }
    }, [ventas])

    return lasVentas.length === 0 ? <LinearProgress variant="query" /> :
            <Container>
                <Grid container spacing={2} >
                    <Grid item xs={12}><Typography className={classes.textoMiniFacheron}>Filtros:</Typography></Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="tipo"
                            select
                            variant="outlined"
                            fullWidth
                            helperText="Selecciona un tipo de venta"
                            value={filtros.tipo}
                            onChange={(e)=>setFiltros({...filtros, tipo:e.target.value})}
                            >
                                <MenuItem value="TODO">TODO</MenuItem>
                                <MenuItem value="CONTADO">CONTADO</MenuItem>
                                <MenuItem value="CREDITO">CRÉDITO</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                            id="fecha"
                            type='date'
                            variant="outlined"
                            fullWidth
                            helperText="Selecciona una fecha"
                            value={filtros.fecha}
                            onChange={(e)=>setFiltros({...filtros, fecha:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="ubicacion"
                            select
                            variant="outlined"
                            fullWidth
                            helperText="Selecciona una ubicación"
                            value={filtros.ubicacion}
                            onChange={(e)=>setFiltros({...filtros, ubicacion:e.target.value})}
                            >
                                <MenuItem value="TODAS">TODAS</MenuItem>
                                {ubicacions.length===0? null :
                                    ubicacions.sort((a,b)=>a.nombre < b.nombre ? -1 : 1 ).map((ub, i)=>(
                                        <MenuItem value={ub} key={i} >{ub.nombre}</MenuItem>
                                    ))
                                }
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="clasificacion"
                            select
                            variant="outlined"
                            fullWidth
                            helperText="Selecciona una opción"
                            value={filtros.clasificacion}
                            onChange={(e)=>setFiltros({...filtros, clasificacion:e.target.value})}
                            >
                                <MenuItem value="TODO">TODO</MenuItem>
                                <MenuItem value="S/C">SIN CLASIFICAR</MenuItem>
                                <MenuItem value="LINEA">LINEA</MenuItem>
                                <MenuItem value="MAYOREO">MAYOREO</MenuItem>
                                <MenuItem value="MENUDEO">MENUDEO</MenuItem>
                                <MenuItem value="CASCADO">CASCADO</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    
                    
                </Grid>

            
            {/* <Container maxWidth="sm">
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                    <Typography align="center" className={classes.textoMiniFacheron}>Venta a Cr&eacute;dito </Typography>
                    <Typography variant="h5" align="center" className={classes.textoMirame}>$ <CountUpAnimation num={tVentasCredito} temp={800} /></Typography>
                    <Typography align="center" className={classes.textoMiniFacheron}>Venta de Contado </Typography>
                    <Typography variant="h5" align="center" className={classes.textoMirame}>$ <CountUpAnimation num={tVentasContado} /></Typography>
                </Grid>
                <Grid item xs={6}>
                    <GraficaCreditoContado data={[
                        {tipo: "Crédito", total: tVentasCredito},
                        {tipo: "Contado", total: tVentasContado}
                    ]} />
                </Grid>
            </Grid>
            </Container> */}

            {ventasFiltradas.length === 0 ? null :
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} className={classes.paperSingle}>
                        <Grid container>
                            <Grid item xs={10}>
                                <Typography >
                                    Número de Ventas:
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right" className={classes.textoMirame}>
                                    {formatNumber(ventasFiltradas.length)}
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography >
                                    Número de Empaques(Cjs):
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right" className={classes.textoMirame}>
                                    {formatNumber(temp, 1)}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography >
                                    Cantidad (kg):
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="right" className={classes.textoMirame}>
                                    {formatNumber(tcant, 2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography >
                                    Precio promedio:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="right" className={classes.textoMirame}>
                                    ${formatNumber(tpprom, 2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography >
                                    Importe total:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="right" className={classes.textoMirame}>
                                    ${formatNumber(timp, 2)}
                                </Typography>  
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.paperSingle}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth helperText="Selecciona una opción" select value={relacionSeleccionada} onChange={(e)=>setRsel(e.target.value)}>
                            <MenuItem value={0}>Ninguno</MenuItem>
                            <MenuItem value={1}>Rel. Fecha-Importe</MenuItem>
                            <MenuItem value={2}>Rel. Fecha-Empaques</MenuItem>
                            <MenuItem value={3}>Rel. Ubicación-Empaques</MenuItem>
                            <MenuItem value={4}>Rel. Ubicación-Importe</MenuItem>
                        </TextField>
                    {relacionSeleccionada===0 ? null : 
                    <VictoryChart height={250}>
                        <VictoryAxis
                            style={{grid: {
                                fill: "#000B0B",
                            }, tickLabels: { fontSize: 8, padding: 2} }}
                            />
                        <VictoryAxis dependentAxis
                            style={{grid: {
                                fill: "#000B0B",
                                stroke: "#000404",
                                strokeWidth: 0.5
                            }, tickLabels: { fontSize: 10, padding: 2} }}
                            />
                        {relacionSeleccionada===1?
                            <VictoryLine
                                data={relacionFechaImporte}
                                x="fecha"
                                y="importe"
                                labels={({ datum }) => formatNumber(datum.importe,1)}
                                labelComponent={<VictoryLabel renderInPortal dy={-10}/>}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                style={{
                                    data: { stroke: "#3af3f3", opacity: 0.7 },
                                    labels: { fontSize: 10 },
                                }}
                            /> : null
                        }
                        {relacionSeleccionada===2?
                            <VictoryLine 
                                data={relacionFechaEmpaques}
                                x="fecha"
                                y="empaques"
                                labels={({ datum }) => datum.empaques}
                                style={{
                                    data: { stroke: "#ff0022", opacity: 0.7 },
                                    labels: { fontSize: 10 },
                                }}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                            /> : null
                        }
                        {relacionSeleccionada===3?
                            <VictoryBar
                                horizontal
                                data={relacionUbicacionEmpaques}
                                x="ubicacion"
                                y="empaques"
                                labels={({ datum }) => datum.empaques}
                                style={{
                                    data: { fill: "#ff9b71", opacity: 0.7 },
                                    labels: { fontSize: 10 },
                                }}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                            /> : null
                        }
                        {relacionSeleccionada===4?
                            <VictoryBar   
                                horizontal                             
                                data={relacionUbicacionImporte}
                                x="ubicacion"
                                y="importe"
                                labels={({ datum }) => formatNumber(datum.importe,2)}
                                style={{
                                    data: { fill: "#F1D302", opacity: 0.7 },
                                    labels: { fontSize: 10 },
                                }}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                            /> : null
                        }
                    </VictoryChart>
                }
                    </Grid>
                    <Grid item xs={12}>
                        <PaginationTable data={ventasFiltradas} />  
                    </Grid>
                </Grid>                            
            }
            </Container>
}