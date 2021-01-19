import React, { useState, useEffect } from 'react'
import Balance from './Balance'
import Produccions from '../produccions/Produccions'

import CuentasxCobrar from '../cxc/CuentasxCobrar'
import CuentasxPagar from '../cxp/CuentasxPagar'
// import EstadoDeCuenta from '../cxc/EstadoDeCuenta'
import UltimosMovimientos from './UltimosMovimientos'
import ComprasDash from './ComprasDash'
import Pagar from './Pagar'
import Cobro from '../creators/Cobro'
import CrearIngreso from '../ingresos/CrearIngreso'
import CrearEgreso from '../egresos/CrearEgreso'

import useUser from '../hooks/useUser'
import useInventario from '../hooks/useInventario'
// import useCuentasxCobrar from '../cxc/useCuentasxCobrar'
// import useCuentasxPagar from '../cxp/useCuentasxPagar.js'
import useIngresos from '../ingresos/useIngresos'
import useEgresos from '../egresos/useEgresos'
import useBalance from '../hooks/useBalance'
import useCompras from '../hooks/useCompras'
import useStyles from '../hooks/useStyles'
import useUbicacions from '../hooks/useUbicacions'

// import {calcCostoInventario} from '../Tools'
import moment from 'moment'
import { Grid, Box, 
    // IconButton, 
    Backdrop, Typography, CircularProgress, ButtonGroup, Button } from '@material-ui/core';

// import PaymentIcon from '@material-ui/icons/Payment';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { useSnackbar } from 'notistack';
const initBalance = {
    total: 0,
    disponible: 0,
    inventario: 0,
    porCobrar: 0,
    porPagar: 0,
    dispPorUbic: [],
}
export default function Dashboard() {
    // const {balance} = useBalance()
    const now = moment()
    const { enqueueSnackbar } = useSnackbar()
    const {cuentasxCobrar, addPagoCxc, totalCxc, ingresos, totalIngresos, addIngreso} = useIngresos()
    const {egresos, totalEgresos, addEgreso, cuentasxPagar, totalCxp, addPagoCxp} = useEgresos()
    const {compras} = useCompras()
    const {
        inventario, 
        totalInventario} = useInventario()
    const{ubicacions} = useUbicacions()
    const classes = useStyles();
    const { user } = useUser()
    const [cobrar, setCobrar] = useState(false)
    const [pagar, setPagar] = useState(false)
    const [crearIngreso, setCrearIngreso] = useState(false)
    const [crearEgreso, setCrearEgreso] = useState(false)
    const[
        bckdrpOpen, 
        setBdopen
    ] = useState(true)
    const [balance, setBalance] = useState(initBalance)
    useEffect(()=>{
        if(balance !== []){
            setBdopen(false)
        }
        return () => setBdopen(true)
    }, [balance])
    useEffect(() => {
        if(inventario !== null){
            // console.log(inventario)
            var disponible = totalIngresos - totalEgresos
            // var inventario_compras = inventario.inventario.compras
            // var inventario_produccion = inventario.produccion
            // var t_inv_compras = calcCostoInventario(inventario_compras.items)
            // var t_inv_prod = calcCostoInventario(inventario_produccion.items)
            var porCobrar = totalCxc
            var porPagar = totalCxp
            var balanceT = disponible  + porCobrar - porPagar + totalInventario
            setBalance({
                total: balanceT,
                disponible: disponible,
                inventario: totalInventario,
                porCobrar: porCobrar,
                porPagar: porPagar,
                dispPorUbic: [],
            })
        }
        
    }, [totalIngresos,totalEgresos, totalInventario, totalCxc, totalCxp, inventario])
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
    // const createIngreso = () => {

    // }
    const closeCreateIngreso = () =>{
        setCrearIngreso(false)
    }

    const showCreateEgreso = () => {
        setCrearEgreso(true)
    }
    const closeCreateEgreso = () => {
        setCrearEgreso(false)
    }
    return (

        <Grid container spacing={2}>
            <Backdrop className={classes.backdrop} open={bckdrpOpen} children={
                    <div>
                        <Typography align="center" variant="subtitle1" children="Espere..." />
                        <CircularProgress color="inherit" />
                    </div>
            } />
            {
                balance === null || user === null || cobrar === null || pagar === null ?
                    null
                    :
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Box display={user.level > 1 ? 'none' : 'inline'}>
                                <Grid container justify="flex-end">
                                    <Grid item xs={6}>
                                        <Typography variant="h6">{now.format("dddd, D [de] MMMM YYYY, h:mm a")}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ButtonGroup size="small" variant="contained">
                                            <Button onClick={showCreateIngreso}>Ingreso</Button>
                                            <Button onClick={showCreateEgreso}>Egreso</Button>
                                            <Button onClick={showCobrar}>Cobrar</Button>
                                            <Button onClick={showPagar}>Pagar</Button>
                                            <Button>Traspasar</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Box>

                            <CrearIngreso 
                                open={crearIngreso} 
                                close={closeCreateIngreso} 
                                crear={addIngreso} 
                                ubicacions={ubicacions} 
                                mensaje={showMessage}/>
                            <CrearEgreso 
                                open={crearEgreso} 
                                close={closeCreateEgreso} 
                                crear={addEgreso} 
                                ubicacions={ubicacions} 
                                compras={compras} 
                                mensaje={showMessage}
                                disponible={balance.disponible}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Box display={user.level > 1 ? 'none' : 'inline'}>
                                <Balance 
                                    balance={balance} 
                                    />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12}>
                                    <UltimosMovimientos 
                                        ingresos={ingresos}
                                        egresos={egresos}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Produccions 
                                        showMessage={showMessage}/>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <ComprasDash />
                                </Grid>
                            </Grid>
                        </Grid> 

                        <Grid item xs={12} md={5}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <CuentasxCobrar cuentas={cuentasxCobrar} total={totalCxc}/>
                                    {/* <EstadoDeCuenta cuentas={cuentasxcCliente}/> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <CuentasxPagar cuentas={cuentasxPagar} total={totalCxp}/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Cobro 
                            open={cobrar} 
                            cuentas={cuentasxCobrar}
                            ubicacions={ubicacions}
                            close={closeCobrar} 
                            showMessage={showMessage} 
                            save={addPagoCxc}
                            />
                        <Pagar 
                            open={pagar} 
                            cuentas={cuentasxPagar} 
                            ubicacions={ubicacions}
                            close={closePagar} 
                            disponible={balance.disponible} 
                            showMessage={showMessage} 
                            save={addPagoCxp}
                            />
                    </React.Fragment>
            }
        </Grid>
    )
}
