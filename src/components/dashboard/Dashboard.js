import React, { useState, useEffect } from 'react'
// UI
import { Grid, 
    Typography, 
    Container,
    ButtonGroup,
    Button,
    Tabs,
    Tab,
} from '@material-ui/core'
// componentes
import CuentasxCobrar from '../cxc/CuentasxCobrar'
import CuentasxPagar from '../cxp/CuentasxPagar'
import Pagar from './Pagar'
import Traspasar from './Traspasar'
import {ticketTraspaso} from '../api'
import Disponible from '../disponible/Disponible'
import Corte from '../cortes/Corte'
import Cobrar from './Cobrar'
import CrearEgreso from '../egresos/CrearEgreso'
import GraficaInventario from '../inventario/GraficaInventario'
// HOOKS
import {useAuth} from '../auth/use_auth'
import useCortes from '../cortes/useCortes'
import useIngresos from '../ingresos/useIngresos'
import useEgresos from '../egresos/useEgresos'
import { useSnackbar } from 'notistack';

import moment from 'moment'

export default function Dashboard({ubicacions}) {
    const auth = useAuth()
    const ingresos = useIngresos()
    const egresos = useEgresos()
    const [corte, setCorte] = useState(null)
    const [fecha, setFecha] = useState(null)
    const now = moment()
    useEffect(()=>{
        egresos.loadEgresos(fecha)
        egresos.loadCuentas()
    },[])
    useEffect(() => {
        let hoy = moment().format("YYYY-MM-DD")
        setFecha(hoy)
        return () => setFecha(null)
    },[])
    const { enqueueSnackbar } = useSnackbar()
    // const{ubicacions} = useUbicacions()
    const {getCorte, reOpen, guardarCorte} = useCortes()
    const [cobrar, setCobrar] = useState(false)
    const [pagar, setPagar] = useState(false)
    const [gastar, setGastar] = useState(false)
    const [traspasar, setTraspasar] = useState(false)
    const [corteDialog, setCorteDialog] = useState(false)
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

    function verCorte(ub){
        getCorte(ub._id, fecha).then(res=>{
            setCorteDialog(true)
            if(res.status === "error"){
                showMessage(res.message, res.status)
                setCorteDialog(false)
            }else{
                // console.log(res)
                setCorte(res)
            }
        })
    }

    function closeCorteDialog(){
        setCorte(null)
        setCorteDialog(false)
    }

    function onChangeFecha(fecha){
        setCorte(null)
        muestrameEsteCorte(corte.ubicacion._id, fecha)
        setFecha(fecha)
    }

    async function muestrameEsteCorte(ubicacion, fecha){
        const res = await getCorte(ubicacion, fecha)
        setCorte(res)
    }

    const crearPago = (pago) => {
        return egresos.addPagoCxp(pago).then(res => {
            showMessage(res.message, res.status)
            ingresos.setUpdating(res)
        })
        .catch(err => {
            showMessage("No se pudo guardar el pago "+ err, "error")
        })
    }

    const crearCobro = (cobro) => {
        return ingresos.addPagoCxc(cobro).then(res => {
            showMessage(res.message, res.status)

        })
        .catch(err=>{
            showMessage("No se pudo guardar el cobro", 'error')
        })
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

        egresos.addEgreso(eg)
        .then(() => {
            
            ingresos.addIngreso(ing)
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
    return (
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
                            >Pagar</Button>
                            <Pagar 
                                cuentas={egresos.cuentasxPagar} 
                                ubicacions={ubicacions}
                                open={pagar}
                                close={closePagar}
                                save={crearPago}
                                showMessage={showMessage}
                            />

                            <Button
                                onClick={() => showGastar()}>
                                    Gastar
                            </Button>
                            <CrearEgreso 
                                ubicacions={ubicacions}
                                open={gastar}
                                close={()=>setGastar(false)}
                                mensaje={showMessage}
                            />
                            
                            <Button
                                onClick={() => showCobrar()}
                            >
                                Cobrar
                            </Button>
                            <Cobrar                           
                                cuentas={ingresos.cxcPdv}
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
                                cuentas={ingresos.cxcPdv}
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
                        <Tab label="Disponible" value={1}/>
                        <Tab label="Inventario" value={2}/>
                    </Tabs>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 1}>
                        <Disponible verCorte={verCorte} ubicacions={ubicacions} ingresos={ingresos} egresos={egresos} />
                        <Corte user={auth.user} open={corteDialog} close={closeCorteDialog} corte={corte} fecha={now.format("YYYY-MM-DD")} onChangeFecha={onChangeFecha}  ubicacions={ubicacions} reabrir={reOpen} guardar={guardarCorte}/>
                    </div>
                    <div value={tabSelected} role="tabpanel" hidden={tabSelected!== 2}>
                        <GraficaInventario />
                    </div>
                </Grid>
                {/* INFO CUENTAS POR COBRAR */}
                <Grid item xs={12}>
                    <CuentasxCobrar cuentas={ingresos.cuentasxCobrar} total={ingresos.totalCxc}/>
                </Grid>
                <Grid item xs={12}>
                    <CuentasxPagar cuentas={egresos.cuentasxPagar} total={egresos.totalCxp}/>
                </Grid>
            </Grid>                
        </Container>
    )
}
