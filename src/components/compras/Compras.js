import React, { useEffect, useState, useContext } from 'react'
import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Grid,
    TextField, Typography,
} from '@material-ui/core';
import { ComprasContext } from './CompraContext'
import { useProductors } from '../productors/ProductorContext';
import { useSnackbar } from 'notistack'

import AddIcon from '@material-ui/icons/Add'
import {useTipoCompras} from '../hooks/useTipoCompras';

import useStyles from '../hooks/useStyles'

import CrearCompra from './CrearCompra';
import ConfirmDialog from './ConfirmDialog'
import Compra from './Compra';
import ListaCompras from './ListaCompras';
import DetalleCompra from './DetalleCompra'
import { Meses } from '../tools/Meses'
import moment from 'moment'
import { useAuth } from '../auth/use_auth';
import { useProductos } from '../productos/ProductosContext';
import { useEmpresa } from '../empresa/EmpresaContext';
import { useEmpaques } from '../hooks/useEmpaques';
import { useUnidades } from '../hooks/useUnidades';
// import CompraCreate from './CompraCreate';

function Compras(){
    const {user} = useAuth()
    const {loadEmpresa} = useEmpresa()
    const {loadEmpaques} = useEmpaques()
    const {loadUnidades} = useUnidades()
    const {compras, loadCompras, selectCompra, compra } = useContext(ComprasContext)
    
    const {loadProductos, productos, addProducto}  = useProductos()
    const {productors} = useProductors()
    const {loadTipoCompras} = useTipoCompras();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    
    const [showDialog, setShowDialog] = useState(false)
    const [showDialogP, setShowDialogP] = useState(false)
    const [detCompra, setDetCompra] = useState(false)
    // const [compra, ] = useState(null)
    const [verCompra, setVerCompra] = useState(false)
    const [confirm, setConfirm] = useState(false)
    let now = moment()
    const [month] = useState(now.format("MM"))
    const [year] = useState(now.format("YYYY"))
    const [isLoading, setIsLoading] = useState(true)

    const [mesAnio, setMesAnio] = useState(moment().format("YYYY-MM"))
    useEffect(()=>{
        setIsLoading(true)
        const loadAll = async () => {
            const res = await Promise.all([
                loadCompras(user, mesAnio),
                loadTipoCompras(user),
                loadProductos(user),
                loadEmpresa(user),
                loadUnidades(user),
                loadEmpaques(user),
            ])
            return res
        }
        loadAll().then(()=>{
            setIsLoading(false)
        })
    },[mesAnio]) // eslint-disable-line react-hooks/exhaustive-deps

    // const crear = (compra) => {
    //     return addCompra(user, compra).then(res => {
    //         closeDialog()
    //         return res
    //     }).catch(err=>{
    //         showMessage(err.message, 'error')
    //     })
    // }
    const openDialog = () => {
        setShowDialog(true)
    }

    const closeDialog = () => {
        setShowDialog(false)
    }
    const openDialogP = () => {
        setShowDialogP(true)
    }

    const closeDialogP = () => {
        setShowDialogP(false)
    }

    const editCompra = (compra) => {
        selectCompra(compra)
        setDetCompra(true)
    }

    const closeCompra = () => {
        setDetCompra(false)
        selectCompra(null)
    }

    function cancelar(){
        compras.cancelarCompra(compra._id).then(res => {
            closeConfirm()
            if (res.status === 'error') {
            } else {
                showMessage(res.message, res.status)
            }
        })
    }
    // function openConfirm(compra){
    //     setCompra(compra)
    //     setConfirm(true)
    // }
    function closeConfirm(){
        selectCompra(null)
        setConfirm(false)
    }

    function closeVerCompra(){
        selectCompra(null)
        setVerCompra(!verCompra)
    }

    function showVerCompra(compra){
        selectCompra(compra)
        setVerCompra(true)
    }

    return isLoading ?
        <Backdrop open={isLoading} onClick={()=> setIsLoading(false)}>
            <CircularProgress color="inherit" />
        </Backdrop>
        :
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    id="periodo"
                    type="month"
                    label="Selecciona un periodo"
                    variant="outlined"
                    value={mesAnio}
                    onChange={(e)=>setMesAnio(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button className={classes.botonGenerico} onClick={() => openDialog('comprasDialog')}>
                        <AddIcon /> Crear Compra
      		        </Button>
                    {/* <CompraCreate open={showDialog} close={closeDialog} create={crear} /> */}
                    <CrearCompra
                        open={showDialog}
                        dialogP={showDialogP}
                        close={closeDialog}
                        openP={openDialogP}
                        closeP={closeDialogP}
                        showMessage={showMessage}
                        products={productos}
                        addProduct={addProducto}
                        provedors={productors}
                    />
                </Grid> 
                {compras.length > 0 ?
                    <ListaCompras 
                        compras={compras} 
                        editCompra={editCompra} 
                        verCompra={showVerCompra} 
                    /> 
                    :
                    <Grid item xs={12}>
                        <Typography variant='h6' align="center"> No hay compras registradas en {Meses.filter(mes=>mes.id === month).map(mes=>mes.nombre)} {year}.</Typography>
                    </Grid>
                }
            </Grid>
            <DetalleCompra 
                compra={compra} 
                open={detCompra} 
                close={closeCompra} 
                showMessage={showMessage} 
                products={productos}
                provedors={productors}
            />
            <ConfirmDialog open={confirm} close={closeConfirm} onConfirm={cancelar}/>
            <Compra compra={compra} open={verCompra} close={closeVerCompra} compras={compras} />
        </Container>
}

export default Compras