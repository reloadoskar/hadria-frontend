import React, { useState, useEffect, useContext } from 'react'
// UI
import { Grid, 
    Typography, 
    Container,
    ButtonGroup,
    Button,
    Tabs,
    Tab,
    Backdrop,
    CircularProgress,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom';
// componentes
// import CuentasxCobrar from '../cxc/CuentasxCobrar'
import Pagar from './Pagar'
import Traspasar from './Traspasar'
import {ticketTraspaso} from '../api'
import Disponible from '../disponible/Disponible'
// import Corte from '../cortes/Corte'
import Cobrar from './Cobrar'
import CrearEgreso from '../egresos/CrearEgreso'
import GraficaInventario from '../inventario/GraficaInventario'
import PlanStatus from '../avisos/PlanStatus'
// HOOKS
import { useSnackbar } from 'notistack';

import moment from 'moment'
// import ComprasMesProductor from '../compras/ComprasMesProductor'
import useStyles from '../hooks/useStyles'

// CONTEXTOS
import {EmpresaContext} from '../empresa/EmpresaContext'
import {UbicacionContext} from '../ubicaciones/UbicacionContext'
import {EgresoContext} from '../egresos/EgresoContext'
import {IngresoContext} from '../ingresos/IngresoContext'
import CorteGlobal from '../cortes/CorteGlobal';
export default function Dashboard() {
    const {empresa } = useContext(EmpresaContext)
    const { ingresos, addIngreso, addPagoCxc, loadIngresosMonthYear, loadCuentasPorCobrarPdv, cxcPdv } = useContext(IngresoContext)
    const {egresos, loadEgresosMonthYear, loadCuentasPorPagar, addEgreso} = useContext(EgresoContext)
    const {ubicacions} = useContext(UbicacionContext)
    const [verPlanStatus, setVerPlanStatus] = useState(false)
    const [bodyPlanStatus, setBody] = useState(null)

    const classes = useStyles()

    const [fecha, setFecha] = useState(null)
    const now = moment()
    useEffect(()=>{
        loadEgresosMonthYear(now.format("MM"), now.format("YYYY"))
        loadIngresosMonthYear(now.format("MM"), now.format("YYYY"))
        loadCuentasPorPagar()
        loadCuentasPorCobrarPdv()
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        let hoy = moment().format("YYYY-MM-DD")
        setFecha(hoy)
        return () => setFecha(null)
    },[])

    useEffect(()=>{
        if(empresa){
            let dias = moment(empresa.fechaFinal).diff(moment(), 'days')
            let vence = moment().to(moment(empresa.fechaFinal))
            let descuento = 0
            if(dias>1){ descuento = 10}
            if(dias>5){ descuento = 30}
            if(dias>8){ descuento = 40}
            if(dias>31){
                setBody(null)
            }else{
                setVerPlanStatus(true)
                setBody(
                    <React.Fragment>
                        <Typography align="center">Tu Plan vence:</Typography>
                        <Typography variant="h6" align="center">{vence}</Typography>
                        <Typography align="center">Renueva ahora y obten hasta un {descuento} % de descuento</Typography>
                        <NavLink exact to="app/configuracion" 
                            className={classes.link} 
                            >
                            <Typography align="center">ver planes</Typography>
                        </NavLink>
                        <Typography align="center">
                            <Button className={classes.botonGenerico} onClick={()=>setVerPlanStatus(false)}>entendido</Button>
                        </Typography>
    
                    </React.Fragment>
                )
            }
        }
    },[empresa]) // eslint-disable-line react-hooks/exhaustive-deps
    const { enqueueSnackbar } = useSnackbar()
    const [cobrar, setCobrar] = useState(false)
    const [pagar, setPagar] = useState(false)
    const [gastar, setGastar] = useState(false)
    const [traspasar, setTraspasar] = useState(false)
    const [tabSelected, setTab] = useState(1)
    const selectTab = (event, selected) => {
        setTab(selected)
    }
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const showPagar = () => {
        setPagar(true)
    }

    const closePagar = () => {
        setPagar(false)
    }

    const showCobrar = () => {
        setCobrar(true)
    }
    const showGastar = () => {
        setGastar(true)
    }

    const closeCobrar = () => {
        setCobrar(false)
    }

    const showTraspasar = () => {
        setTraspasar(true)
    }

    const closeTraspasar = () => {
        setTraspasar(false)
    }

    const crearCobro = async (cobro) => {
        let res = await addPagoCxc(cobro)
        return res
    }

    const crearTraspaso = (traspaso) => {
        let eg = {
            compra: 1,
            ubicacion: traspaso.origen._id,
            tipo: "TRASPASO",
            concepto: "TRASPASO",
            descripcion: traspaso.referencia,
            fecha: traspaso.fecha,
            importe: traspaso.importe, 
        }

        let ing = {
            ubicacion: traspaso.destino._id,
            concepto: "TRASPASO",
            descripcion: traspaso.referencia,
            fecha: traspaso.fecha,
            tipoPago: "EFECTIVO",
            importe: traspaso.importe
        }

        addEgreso(eg)
        .then(() => {
            
            addIngreso(ing)
            .then(()=>{
                showMessage("Traspaso guardado", "success")
                ticketTraspaso(traspaso).then(res => {
                    if(res.status === 'warning'){
                        showMessage(res.message, res.status)
                    }
                })
            })
            .catch(()=> {
                showMessage("No se guardo el ingreso.", "error")
            })
        })
        .catch(()=> {
            showMessage("No se guardo el egreso.", "error")
        })

    }
    return empresa && ingresos && egresos ? 
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                {/* TOP MENU */}
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" align="center">{now.format("DD MMMM, YYYY")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ButtonGroup  size="small">
                            <Button
                                onClick={() => showPagar()}
                                >
                                Pagar
                            </Button>
                            {pagar ? 
                                <Pagar 
                                    open={pagar}
                                    close={closePagar}
                                />
                                : null
                            }

                            <Button
                                onClick={() => showGastar()}>
                                    Gastar
                            </Button>
                            {gastar ?
                                <CrearEgreso 
                                    ubicacions={ubicacions}
                                    open={gastar}
                                    close={()=>setGastar(false)}
                                    mensaje={showMessage}
                                />
                                : null
                            }
                            
                            <Button
                                onClick={() => showCobrar()}
                            >
                                Cobrar
                            </Button>
                            <Cobrar                           
                                cuentas={cxcPdv}
                                open={cobrar}
                                close={closeCobrar}
                                fecha={fecha}
                                cobrar={crearCobro}
                                ubicacions={ubicacions}
                                showMessage={showMessage}
                            />
                            
                            <Button
                                onClick={() => showTraspasar()}
                            >
                                Traspasar
                            </Button>
                            <Traspasar                           
                                cuentas={cxcPdv}
                                open={traspasar}
                                close={closeTraspasar}
                                save={crearTraspaso}
                                ubicacions={ubicacions}
                                showMessage={showMessage}
                            />
                        </ButtonGroup>
                    </Grid>
                </Grid>
                {/* INFO UBICACIONES */}
                <Grid item xs={12}>
                    <Tabs
                        value={tabSelected}
                        onChange={selectTab}
                        centered>
                        <Tab label="Reporte Diario" value={1}/>
                        <Tab label="Reporte Mensual" value={2}/>
                        <Tab label="Inventario" value={3}/>
                    </Tabs>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
                        {tabSelected !== 1 ? null :
                            <CorteGlobal ingresos={ingresos} egresos={egresos} />
                        }
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 2}>
                        <Disponible />
                        {/* <Corte user={auth.user} open={corteDialog} close={closeCorteDialog} corte={corte} fecha={now.format("YYYY-MM-DD")} onChangeFecha={onChangeFecha}  ubicacions={ubicacions} reabrir={reOpen} guardar={guardarCorte}/> */}
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 3}>
                        <GraficaInventario />
                    </div>
                </Grid>
                {/* INFO CUENTAS POR COBRAR */}
                <Grid item xs={12}>
                    {/* <ComprasMesProductor /> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <CuentasxCobrar cuentas={ingresos.cuentasxCobrar} total={ingresos.totalCxc}/> */}
                </Grid>
            </Grid>     
            <PlanStatus open={verPlanStatus} close={() => setVerPlanStatus(false)} body={bodyPlanStatus} />
        </Container>
    : <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
    </Backdrop>
}
