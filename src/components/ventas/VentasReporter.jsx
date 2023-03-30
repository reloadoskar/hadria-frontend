import React, { useState, useContext } from 'react'
import { Divider, Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import { UbicacionContext } from '../ubicaciones/UbicacionContext'
import VentasTable from './VentasTable'
import { useEffect } from 'react'
import useStyles from '../hooks/useStyles'
import { formatNumber } from '../Tools'
import { VictoryLine, VictoryLabel, VictoryChart, VictoryAxis, VictoryBar } from 'victory'
import moment from 'moment'
export default function VentasReporter({ data, rango }) {
    const classes = useStyles()
    const { ubicacions } = useContext(UbicacionContext)
    const [mermas, setMermas] = useState([])
    const [cantt, setCantt] = useState(0)
    const [tmermas, setTmermas] = useState(0)
    const [tventas, setTventas] = useState(0)
    const [tcant, setTcant] = useState(0)
    const [timp, setTimp] = useState(0)
    const [temp, setTemp] = useState(0)
    const [tpprom, setTprom] = useState(0)
    
    const [dataFiltrada, setDataf] = useState([])
    const [foliosDisponibles, setFoliosDisponibles] = useState([])
    // const [fechasDisponibles, setFechasDisponibles] = useState([])
    const [cItemsDisponibles, setCitemsDisponibles] = useState([])
    // const [ubicacionesDisponibles, setUbicacionesDisponibles] = useState([])
    const [filtros, setFiltros] = useState({
        fecha: "",
        ubicacion: "TODO",
        compra: "TODO",
        producto: "TODO",
        clasificacion: "TODO",
        precio: "TODO",
        status: "TODO",
    })
    const [relacionSeleccionada, setRsel] = useState(0)
    const [relacionFechaImporte, setRfi] = useState([])
    const [relacionFechaEmpaques, setRfe] = useState([])
    const [relacionUbicacionEmpaques, setRubem] = useState([])
    const [relacionUbicacionImporte, setRubimp] = useState([])

    useEffect(() => {        
        if(data && filtros){
            var listaFiltrada = data

            if(filtros.fecha !== ""){
                listaFiltrada = listaFiltrada.filter(el=>el.fecha === filtros.fecha)
            }
            if(filtros.ubicacion !== "TODO"){
                listaFiltrada = listaFiltrada.filter(el=>el.ubicacion._id === filtros.ubicacion._id)
            }
            if(filtros.compra !== "TODO"){
                listaFiltrada = listaFiltrada.filter(el=>el.compra.folio === filtros.compra)
            }
            if(filtros.producto !== "TODO"){
                let dc = JSON.parse(filtros.producto)
                listaFiltrada = listaFiltrada.filter(el=>el.compraItem._id === dc.compraItem._id)
            }
            if(filtros.clasificacion !== "TODO"){
                listaFiltrada = listaFiltrada.filter(el=>el.compraItem.clasificacion === filtros.clasificacion)
            }
            setDataf(listaFiltrada)

            const foliosDeCompras = listaFiltrada.reduce((acc, el)=>{                
                if (!acc.includes(el.compra.folio)) {
                    return [...acc, el.compra.folio];
                }
                return acc
            },[]).sort()
            setFoliosDisponibles(foliosDeCompras)

            let fechasdisponibles = listaFiltrada.reduce((acc,el)=>{
                if(!acc.includes(el.fecha)){
                    return [...acc, el.fecha]
                }
                return acc
            },[])
            // setFechasDisponibles(fechasdisponibles)

            let ubicacionesdisponibles = listaFiltrada.reduce((acc,el)=>{
                if(!acc.includes(el.ubicacion.nombre)){
                    return [...acc, el.ubicacion.nombre]
                }
                return acc
            },[])
            // setUbicacionesDisponibles(ubicacionesdisponibles)

            const compraItems = listaFiltrada.reduce((acc,el)=>{
                let itm =  JSON.stringify({compraItem: el.compraItem, producto: el.producto, compra: el.compra})
                if(!acc.includes(itm)){
                    return [...acc, itm]
                }
                return acc
            },[])
            setCitemsDisponibles(compraItems.sort())

            let tv = listaFiltrada.length
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
            setTventas(tv)
            setTcant(ct)
            setTimp(it)
            setTemp(et)
            setCantt(ct-lmermas)
            setTprom(pprom)
        }

    }, [filtros, data]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Grid container spacing={2} className={classes.paperBasico}>
            {/* // CABECERA  // */}
            <Grid item xs={12}>
                <Typography variant="h6" align="center" className={classes.textoMirame}>
                    REPORTE DE VENTAS
                </Typography>
                <Divider />
                <Typography align="center" className={classes.textoMirame}>
                    del {moment(rango.f1).format("DD MMMM YY")} al {moment(rango.f2).format("DD MMMM YY")}
                </Typography>
            </Grid>


            {/* // FILTROS  // */}
            <Grid item xs={12}>
                <Typography className={classes.textoMiniFacheron}>Filtros:</Typography>
            </Grid>

            <Grid item xs={3}>
                <TextField
                    id="fecha"
                    fullWidth
                    type="date"
                    helperText="Selecciona una fecha"
                    value={filtros.fecha}
                    onChange={(e) => setFiltros({...filtros, fecha: e.target.value})}
                />                        
            </Grid>

            <Grid item xs={3}>
                <TextField
                    id="ubicacion"
                    select
                    fullWidth
                    helperText="Selecciona una sucusal"
                    value={filtros.ubicacion}
                    onChange={(e) => setFiltros({...filtros, ubicacion: e.target.value})}
                >
                    <MenuItem value="TODO">TODAS</MenuItem>
                    {ubicacions.map((ub, i) => (
                        <MenuItem key={i} value={ub}>
                            {ub.nombre}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid> 

            <Grid item xs={2}>
                <TextField
                    id="compra"
                    fullWidth
                    select
                    helperText="Selecciona un folio de compra"
                    value={filtros.compra}
                    onChange={(e) => setFiltros({...filtros, compra: e.target.value})}
                >
                    <MenuItem value="TODO">TODO</MenuItem>
                    {foliosDisponibles.length===0 ? null :
                        foliosDisponibles.map((folio,i)=>(
                            <MenuItem value={folio} key={i}>{folio}</MenuItem>
                        ))
                    }
                </TextField>
            </Grid>            

            <Grid item xs={2}>
                <TextField
                    id="producto"
                    fullWidth
                    select
                    helperText="Selecciona un producto"
                    value={filtros.producto}
                    onChange={(e) => setFiltros({...filtros, producto: e.target.value})}
                >
                    <MenuItem value="TODO">TODO</MenuItem>
                    {cItemsDisponibles.length === 0 ? null : 
                        cItemsDisponibles.sort().map((el) => {
                            var dc = JSON.parse(el)
                            return <MenuItem value={el} key={el}>{dc.compra.folio}-{dc.producto.descripcion} {dc.compraItem.clasificacion}</MenuItem>
                        })
                    }
                </TextField>
            </Grid>

            <Grid item xs={2}>
                <TextField
                    id="clasificacion"
                    select
                    fullWidth
                    helperText="Selecciona una clasificación"
                    value={filtros.clasificacion}
                    onChange={(e) => setFiltros({...filtros, clasificacion: e.target.value})}
                >
                    <MenuItem value="TODO">TODAS</MenuItem>
                    <MenuItem value="S/C">SIN CLASIFICAR</MenuItem>
                    <MenuItem value="LINEA">LINEA</MenuItem>
                    <MenuItem value="MAYOREO">MAYOREO</MenuItem>
                    <MenuItem value="MENUDEO">MENUDEO</MenuItem>
                    <MenuItem value="CASCADO">CASCADO</MenuItem>
                    
                </TextField>
            </Grid> 

            {/* GRAFICAS */}

            <Grid item xs={12}>
                <TextField fullWidth helperText="Selecciona una opción" select value={relacionSeleccionada} onChange={(e)=>setRsel(e.target.value)}>
                    <MenuItem value={0}>Selecciona un Gráfico</MenuItem>
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
                            }, tickLabels: { fontSize: 5, padding: 2} }}
                            />
                        <VictoryAxis dependentAxis
                            style={{grid: {
                                fill: "#000B0B",
                                stroke: "#000404",
                                strokeWidth: 0.5
                            }, tickLabels: { fontSize: 5, padding: 2} }}
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
                                    labels: { fontSize: 5 },
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
                                    labels: { fontSize: 5 },
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
                                    labels: { fontSize: 5 },
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
                                    labels: { fontSize: 5 },
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