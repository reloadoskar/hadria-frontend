import React, { useContext, useEffect, useState } from 'react'
import {
    Grid,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
} from '@material-ui/core'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory'
import useStyles from '../hooks/useStyles'
import { UbicacionContext } from '../ubicaciones/UbicacionContext';
import { escalaDeColores } from '../hooks/useStyles'
import CountUpAnimation from '../tools/CountUpAnimation'
import { formatNumber, sumImporte, sumSaldo, agruparPor } from '../Tools'
export default function Disponible({ ingresos, egresos }) {
    const classes = useStyles()
    const { ubicacions } = useContext(UbicacionContext)
    const [tIngresos, setTingresos] = useState(0)
    const [tEgresos, setTegresos] = useState(0)
    const [tCobranza, setTcobranza] = useState(0)
    const [tPorCobrar, setPorCobrar] = useState(0)
    // const [tCredito, setTcredito] = useState(0)
    const [tPorPagar, setPorPagar] = useState(0)
    const [tPagos, setTpagos] = useState(0)
    const [resultado, setResultado] = useState(0)

    const [ingresosAgrupadosPorConcepto, setIngresosAgrupados] = useState([])
    const [egresosAgrupadosPorConcepto, setEgresosAgrupados] = useState([])

    const [tabSelected, setTab] = useState(1)
    const selectTab = (event, selected) => {
        setTab(selected)
    }

    useEffect(() => {
        if (ingresos && egresos && ubicacions) {
            let tingresos = sumImporte(ingresos.filter(ingreso => ingreso.concepto !== "TRASPASO"))
            setTingresos(tingresos)
            let tegresos = sumImporte(egresos.filter(ingreso => ingreso.concepto !== "TRASPASO"))
            setTegresos(tegresos)
            let tcobranza = sumImporte(ingresos.filter(ing => ing.concepto === "COBRANZA"))
            setTcobranza(tcobranza)
            let porcobrar = sumSaldo(ingresos.filter(el => el.saldo !== undefined))
            setPorCobrar(porcobrar)
            let porpagar = sumSaldo(egresos)
            setPorPagar(porpagar)
            let tpagos = sumImporte(egresos.filter(el => el.concepto === "PAGO"))
            setTpagos(tpagos)
            let resultado = tingresos - tegresos + porcobrar - porpagar
            setResultado(resultado)
            setIngresosAgrupados(agruparPor(ingresos.filter(ingreso => ingreso.concepto !== "TRASPASO").sort((a, b) => a.importe - b.importe), "concepto"))
            setEgresosAgrupados(agruparPor(egresos.filter(egreso => egreso.importe > 0 && egreso.concepto !== "TRASPASO"), "concepto").sort((a, b) => a.importe - b.importe))
        }
        return () => {
            setTingresos(0)
            setTegresos(0)
            setTcobranza(0)
            setPorCobrar(0)
            setPorPagar(0)
            setTpagos(0)
            setResultado(0)
            setIngresosAgrupados([])
            setEgresosAgrupados([])
        }
    }, [ingresos, egresos, ubicacions])

    return !ingresos || !egresos ?
        <Typography align="center" component="div">
            <CircularProgress />
        </Typography>
        :
        <Grid container alignContent='center' spacing={2}>
            <Grid item xs={12} >
                <Tabs
                    value={tabSelected}
                    onChange={selectTab}
                    indicatorColor="secondary"
                    centered
                >
                    <Tab label={
                        <div>
                            <Typography className={classes.textoMiniFacheron} align="center">
                                Ingresos:
                            </Typography>
                            <Typography variant="h6" className={classes.textoMirame} align="center">
                                $ <CountUpAnimation num={tIngresos} />
                            </Typography>
                        </div>
                    } value={1} />

                    <Tab label={
                        <div>
                            <Typography className={classes.textoMiniFacheron} align="center">
                                Egresos:
                            </Typography>
                            <Typography variant="h6" className={classes.textoMirame} align="center">
                                $ <CountUpAnimation num={tEgresos} />
                            </Typography>
                        </div>

                    } value={2} />
                    <Tab label={
                        <div>
                            <Typography className={classes.textoMiniFacheron} align="center">
                                Por Cobrar:
                            </Typography>
                            <Typography variant="h6" className={classes.textoMirame} align="center">
                                $ <CountUpAnimation num={tPorCobrar} />
                            </Typography>
                        </div>

                    } value={3} />

                    <Tab label={
                        <div>
                            <Typography className={classes.textoMiniFacheron} align="center">
                                Por Pagar:
                            </Typography>
                            <Typography variant="h6" className={classes.textoMirameSangron} align="center">
                                <CountUpAnimation num={tPorPagar} />
                            </Typography>
                            {/* <Typography className={classes.textoMiniFacheron} align="center">
                                Total Pagos:
                            </Typography>
                            <Typography className={classes.textoMirameSangron} align="center">
                                <CountUpAnimation num={tPagos} />
                            </Typography> */}
                        </div>
                    } value={4} />

                    <Tab label={
                        <div>
                            <Grid item xs={2}>
                                <Typography className={classes.textoMiniFacheron} align="center">
                                    Resultado:
                                </Typography>
                                <Typography variant="h6" className={resultado > 0 ? classes.textoMirameExito : classes.textoMirameSangron} align="center">
                                    <CountUpAnimation num={resultado} />
                                </Typography>
                            </Grid>

                        </div>
                    } value={5} />
                </Tabs>
            </Grid>

            <Grid item container xs={12}>
                <Grid item xs={12} sm={2}></Grid>
                <Grid item xs={12} sm={8}>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 1}>
                        {ingresosAgrupadosPorConcepto.length > 0 ?
                            <VictoryChart
                                animate={{
                                    duration: 2500,
                                    delay: 500,
                                    easing: "bounce",
                            }}>
                                <VictoryAxis key="x" dependentAxis
                                    style={{
                                        axis: { stroke: "#524656", strokeWidth: 2 },
                                        tickLabels: { fontSize: 7, fill: "#524656" },
                                        grid: {
                                            stroke: ({ tick }) =>
                                                tick < 10 ? "transparent" : "#C2B6C6",
                                            strokeWidth: 1
                                        },
                                    }}
                                />
                                <VictoryAxis key="y"
                                    orientation="bottom"
                                    style={{
                                        tickLabels: { fontSize: 6, fill: "#524656" },
                                        axis: { stroke: "#524656", strokeWidth: 3 },
                                    }}
                                />
                                <VictoryBar
                                    data={ingresosAgrupadosPorConcepto}
                                    labels={({ datum }) => `${formatNumber(datum.importe)} `}
                                    x="concepto"
                                    y="importe"
                                    alignment="start"
                                    style={{
                                        data: { fill: "#ffd369", fillOpacity: 0.8 },
                                        labels: { fontSize: 6, fill: "#524656" },
                                        axis: { stroke: "#524656", strokeWidth: 12 }
                                    }}
                                />
                            </VictoryChart>
                            : <Typography align="center" >Aún no hay datos. 🤔</Typography>
                        }
                    </div>

                    <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 3}>
                        {tPorCobrar > 0 || tCobranza > 0 ?
                            <VictoryPie
                                height={200}
                                colorScale={escalaDeColores}
                                innerRadius={60}
                                labelRadius={30}
                                labels={({ datum }) => `${datum.y} \n ${formatNumber(datum.x)}  `}
                                style={{ labels: { fontSize: 10, fill: "black" } }}
                                animate={{
                                    duration: 800,
                                    delay: 300,
                                    easing: 'bounce'
                                }}
                                data={[{ x: tPorCobrar, y: "POR COBRAR" }, { x: tCobranza, y: "COBRANZA" }]}
                            />
                            : <Typography align="center" >Aún no hay datos. 🤔</Typography>
                        }
                    </div>

                    <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 2}>
                        {egresosAgrupadosPorConcepto.length > 0 ?
                            <VictoryBar horizontal
                                data={egresosAgrupadosPorConcepto}
                                labels={({ datum }) => `${datum.concepto} \n $${formatNumber(datum.importe)}`}
                                // labelComponent={<VictoryLabel dx={-30} />}
                                x="concepto"
                                y="importe"
                                alignment="start"
                                style={{
                                    data: { fill: "#ffd369", fillOpacity: 0.8 },
                                    labels: { fontSize: 10, fill: "#524656" },
                                    axis: { stroke: "#524656", strokeWidth: 12 }
                                }}
                            />
                            : <Typography align="center" >Aún no hay datos. 🤔</Typography>
                        }
                    </div>

                    <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 4}>
                        {tPagos > 0 || tPorPagar > 0 ?
                            <VictoryBar
                                height={180}
                                data={[{ x: "TOTAL DEUDA", y: (tPagos + tPorPagar) }, { x: "PAGOS", y: tPagos }, { x: "SALDO POR PAGAR", y: tPorPagar }]}
                                labels={({ datum }) => `${datum.x} \n $${formatNumber(datum.y)}`}
                                // labelComponent={<VictoryLabel dx={-30} />}
                                // x="concepto"
                                // y="importe"
                                alignment="start"
                                style={{
                                    data: { fill: "#ffd369", fillOpacity: 0.8 },
                                    labels: { fontSize: 10, fill: "#524656" },
                                    axis: { stroke: "#524656", strokeWidth: 12 }
                                }}
                            />
                            : <Typography align="center" >Aún no hay datos. 🤔</Typography>
                        }
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected !== 5}></div>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
            </Grid>
        </Grid>

}