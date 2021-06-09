import React, { useState, useEffect } from 'react'
import {useAuth} from '../auth/use_auth'

// import Balance from './Balance'

import CuentasxCobrar from '../cxc/CuentasxCobrar'
import CuentasxPagar from '../cxp/CuentasxPagar'
// import Produccions from '../produccions/Produccions'
// import EstadoDeCuenta from '../cxc/EstadoDeCuenta'
// import UltimosMovimientos from './UltimosMovimientos'
// import ComprasDash from './ComprasDash'
import Pagar from './Pagar'
// import Cobro from '../creators/Cobro'
// import CrearIngreso from '../ingresos/CrearIngreso'
// import CrearEgreso from '../egresos/CrearEgreso'
// import useUser from '../hooks/useUser'
// import useCompras from '../hooks/useCompras'
import useUbicacions from '../hooks/useUbicacions'
import useCortes from '../cortes/useCortes'
import useIngresos from '../ingresos/useIngresos'
import useEgresos from '../egresos/useEgresos'
// import useBalance from '../balance/useBalance'
import useStyles from '../hooks/useStyles'
import { useSnackbar } from 'notistack';

// import MenuIcon from '@material-ui/icons/Menu';
import moment from 'moment'

import { Grid, 
    // IconButton, 
    // Backdrop, 
    Typography, 
    // CircularProgress, 
    // Menu, 
    // MenuItem,
    Container,
    ButtonGroup,
    Button,
    // Card, 
} from '@material-ui/core'

// import PaymentIcon from '@material-ui/icons/Payment';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Disponible from '../disponible/Disponible'
import Corte from '../cortes/Corte'
// import CrearCompra from '../compras/CrearCompra'

export default function Dashboard(props) {
    const auth = useAuth()
    const ingresos = useIngresos()
    const egresos = useEgresos()
    const [corte, setCorte] = useState(null)
    // const[bckdrpOpen, setBdopen] = useState(true)
    // useEffect(()=> {
    //     if(balance === null){
    //         setBdopen(true)
    //     }else{
    //         setBdopen(false)
    //     }
    // },[balance])
    const [fecha, setFecha] = useState(null)
    const now = moment()
    useEffect(() => {
        let hoy = moment().format("YYYY-MM-DD")
        setFecha(hoy)
        return () => setFecha(null)
    },[])
    const { enqueueSnackbar } = useSnackbar()
    
    // const { user } = useUser()
    // const {compras, crearCompra, cancelarCompra} = useCompras()
    const{ubicacions} = useUbicacions()
    const { 
        // guardarCorte, 
        // reabrirCorte, 
        getCorte} = useCortes()
    
    const classes = useStyles();
    const [cobrar, setCobrar] = useState(false)
    const [pagar, setPagar] = useState(false)
    const [crearIngreso, setCrearIngreso] = useState(false)
    const [crearEgreso, setCrearEgreso] = useState(false)
    // const [anchorEl, setAnchorEl] = useState(null);
    const [corteDialog, setCorteDialog] = useState(false)
    // const [dCrearCompra, setDCrearCompra] = useState(false)
    
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

    const closeCobrar = () => {
        setCobrar(false)
    }

    const showCreateIngreso = () =>{
        setCrearIngreso(true)
    }
    const createIngreso = () => {

    }
    const closeCreateIngreso = () =>{
        setCrearIngreso(false)
    }

    const showCreateEgreso = () => {
        setCrearEgreso(true)
    }
    const closeCreateEgreso = () => {
        setCrearEgreso(false)
    }

    // const openMenu = (e) => {
    //     setAnchorEl(e.currentTarget);
    // }

    // const closeMenu = () => {
    //     setAnchorEl(null)
    // }

    function verCorte(ub){
        setCorteDialog(true)
        getCorte(ub._id, fecha).then(res=>{
            if(res.status === "error"){
                showMessage(res.message, res.status)
                setCorteDialog(false)
            }else{
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

    // function closedCrearCompra(){
    //     setDCrearCompra(false)
    // }

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                {/* TOP MENU */}
                <Grid container >
                    <Grid item xs={6}>
                        <Typography variant="h6" align="center">{now.format("DD MMMM, YYYY")}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonGroup>

                            <Button
                                onClick={() => showPagar()}
                            >Pagar</Button>
                            <Pagar 
                                cuentas={egresos.cuentasxPagar} 
                                ubicacions={ubicacions}
                                open={pagar}
                                close={closePagar}
                                save={egresos.addPagoCxp}
                                showMessage={showMessage}
                            />
                            
                            <Button disabled>Cobrar</Button>

                        </ButtonGroup>
                    </Grid>
                </Grid>
                {/* INFO UBICACIONES */}
                <Grid item xs={12}>
                    <Disponible verCorte={verCorte} ubicacions={ubicacions} ingresos={ingresos} egresos={egresos} />
                    <Corte user={auth.user} open={corteDialog} close={closeCorteDialog} corte={corte} fecha={now.format("YYYY-MM-DD")} onChangeFecha={onChangeFecha}  ubicacions={ubicacions}/>
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
