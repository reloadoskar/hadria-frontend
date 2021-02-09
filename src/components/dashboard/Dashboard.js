import React, { useState, useEffect } from 'react'
import Balance from './Balance'
// import Produccions from '../produccions/Produccions'

import CuentasxCobrar from '../cxc/CuentasxCobrar'
import CuentasxPagar from '../cxp/CuentasxPagar'
// import EstadoDeCuenta from '../cxc/EstadoDeCuenta'
// import UltimosMovimientos from './UltimosMovimientos'
import ComprasDash from './ComprasDash'
import Pagar from './Pagar'
import Cobro from '../creators/Cobro'
import CrearIngreso from '../ingresos/CrearIngreso'
import CrearEgreso from '../egresos/CrearEgreso'

import useUser from '../hooks/useUser'
import useBalance from '../hooks/useBalance'
import useCompras from '../hooks/useCompras'
import useStyles from '../hooks/useStyles'
import useUbicacions from '../hooks/useUbicacions'

import {formatNumber} from '../Tools'
import moment from 'moment'

import { Grid, Box, 
    // IconButton, 
    Backdrop, Typography, CircularProgress, ButtonGroup, Button, Card, CardContent, Divider } from '@material-ui/core';

// import PaymentIcon from '@material-ui/icons/Payment';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { useSnackbar } from 'notistack';

export default function Dashboard() {
    const {
        balance,
        disp,
        // ingresos, 
        // totalIngresos, 
        addIngreso,
        cuentasxCobrar, 
        addPagoCxc, 
        totalCxc, 

        // egresos,
        // totalEgresos, 
        addEgreso, 
        cuentasxPagar, 
        totalCxp, 
        addPagoCxp,

        // inventario, 
        // totalInventario,

    } = useBalance()
    const[bckdrpOpen, setBdopen] = useState(true)
    useEffect(()=> {
        if(balance === null){
            setBdopen(true)
        }else{
            setBdopen(false)
        }
    },[balance])
    const now = moment()
    const { enqueueSnackbar } = useSnackbar()
    
    const {compras} = useCompras()
    
    const{ubicacions} = useUbicacions()
    const classes = useStyles();
    const { user } = useUser()
    const [cobrar, setCobrar] = useState(false)
    const [pagar, setPagar] = useState(false)
    const [crearIngreso, setCrearIngreso] = useState(false)
    const [crearEgreso, setCrearEgreso] = useState(false)
    
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
        <div>
                {balance === null || ubicacions === [] || compras === [] ?
                    
                    <Backdrop className={classes.backdrop} open={bckdrpOpen}>
                        <div>
                            <Typography align="center" variant="subtitle1" children="Espere..." />
                            <CircularProgress color="inherit" />
                        </div>
                    </Backdrop>
                    :
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display={user.level > 2 ? 'none' : 'inline'}>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6">{now.format("dddd, D [de] MMMM YYYY, h:mm a")}</Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ButtonGroup size="small" variant="text" className={classes.botonGenerico}>
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
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5">Disponible</Typography>
                                            {
                                                disp.map((ub,i)=>(
                                                    <Grid container key={i}>
                                                        <Grid item xs>
                                                            <Typography variant="h6">{ub.ubicacion}</Typography>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Typography variant="h6" align="right">{formatNumber(ub.disponible)}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                ))
                                            }
                                            <Divider />
                                            <Typography align="right" variant="h6">{formatNumber(balance.disponible)}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
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
                </Grid>
                }

        </div>
                    






    
    )
}
