import React, { useState, useEffect } from 'react'
import Balance from './Balance'
import CuentasxCobrar from '../cxc/CuentasxCobrar'
import CuentasxPagar from '../cxp/CuentasxPagar'
// import Produccions from '../produccions/Produccions'

// import EstadoDeCuenta from '../cxc/EstadoDeCuenta'
// import UltimosMovimientos from './UltimosMovimientos'
import ComprasDash from './ComprasDash'
import Pagar from './Pagar'
import Cobro from '../creators/Cobro'
import CrearIngreso from '../ingresos/CrearIngreso'
import CrearEgreso from '../egresos/CrearEgreso'

// import useUser from '../hooks/useUser'
// import useCompras from '../hooks/useCompras'
// import useUbicacions from '../hooks/useUbicacions'
// import useCortes from '../hooks/useCortes'
// import useBalance from '../hooks/useBalance'
import useStyles from '../hooks/useStyles'
import { useSnackbar } from 'notistack';

import MenuIcon from '@material-ui/icons/Menu';
import moment from 'moment'

import { Grid, 
    IconButton, 
    Backdrop, 
    Typography, 
    CircularProgress, 
    Menu, 
    MenuItem, 
} from '@material-ui/core';

// import PaymentIcon from '@material-ui/icons/Payment';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Disponible from './Disponible'
import Corte from '../cortes/Corte'
import CrearCompra from '../compras/CrearCompra'

export default function Dashboard(props) {
    const {
        user,
        ubicacions,

        compras, 
        crearCompra, 
        cancelarCompra,

        getCorte,
        guardarCorte,

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
    } = props
    // const {

    //     // inventario, 
    //     // totalInventario,

    // } = useBalance()
    const [corte, setCorte] = useState(null)
    const[bckdrpOpen, setBdopen] = useState(true)
    useEffect(()=> {
        if(balance === null){
            setBdopen(true)
        }else{
            setBdopen(false)
        }
    },[balance])
    const [fecha, setFecha] = useState(null)
    const now = moment()
    useEffect(() => {
        let hoy = moment().format("YYYY-MM-DD")
        setFecha(hoy)
        return () => setFecha(null)
    },[])
    const { enqueueSnackbar } = useSnackbar()
    
    // const { user } = useUser()
    // const {compras} = useCompras()
    // const{ubicacions} = useUbicacions()
    // const {getCorte} = useCortes()
    
    const classes = useStyles();
    const [cobrar, setCobrar] = useState(false)
    const [pagar, setPagar] = useState(false)
    const [crearIngreso, setCrearIngreso] = useState(false)
    const [crearEgreso, setCrearEgreso] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [corteDialog, setCorteDialog] = useState(false)
    const [dCrearCompra, setDCrearCompra] = useState(false)
    
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

    const openMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

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

    function closedCrearCompra(){
        setDCrearCompra(false)
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
                    { user.level > 2 ? null :
                        <React.Fragment>
                            <Grid item xs={10}>
                                <Typography variant="h6">{now.format("MMMM DD, YYYY")}</Typography>
                            </Grid>
                            <Grid item xs>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={openMenu}
                                    >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="dashboard-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={closeMenu}
                                >
                                    <MenuItem onClick={showCreateIngreso}>Ingreso</MenuItem>
                                    <MenuItem onClick={showCreateEgreso}>Egreso</MenuItem>
                                    <MenuItem onClick={showCobrar}>Cobrar</MenuItem>
                                    <MenuItem onClick={showPagar}>Pagar</MenuItem>
                                    <MenuItem onClick={closeMenu}>Traspasar</MenuItem>
                                </Menu>
                            </Grid>
                        </React.Fragment>
                    }

                    { user.level > 1 ? null :
                        <Grid item xs={12}>
                            <Balance 
                                balance={balance} 
                            />
                        </Grid>
                    }    

                    <Grid item xs={12} md={6}>                        
                        <ComprasDash 
                            compras={compras} 
                            crearCompra={crearCompra} 
                            cancelarCompra={cancelarCompra}
                        />
                    </Grid> 

                    <Grid item xs={12} md={6}>
                        <Disponible disp={disp} verCorte={verCorte}/>   
                        <Corte 
                            fecha={fecha}
                            open={corteDialog}
                            close={closeCorteDialog}
                            corte={corte}
                            onChangeFecha={onChangeFecha}
                            guardarCorte={guardarCorte}
                            {...props}
                        />                 
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CuentasxCobrar cuentas={cuentasxCobrar} total={totalCxc}/>
                        {/* <EstadoDeCuenta cuentas={cuentasxcCliente}/> */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CuentasxPagar cuentas={cuentasxPagar} total={totalCxp}/>
                    </Grid>
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
                        disponible={balance.disponible}/>
                    <Cobro 
                        open={cobrar} 
                        cuentas={cuentasxCobrar}
                        ubicacions={ubicacions}
                        close={closeCobrar} 
                        showMessage={showMessage} 
                        save={addPagoCxc}/>
                    <Pagar 
                        open={pagar} 
                        cuentas={cuentasxPagar} 
                        ubicacions={ubicacions}
                        close={closePagar} 
                        disponible={balance.disponible} 
                        showMessage={showMessage} 
                        save={addPagoCxp}/>
                </Grid>
                }

        </div>
                    






    
    )
}
