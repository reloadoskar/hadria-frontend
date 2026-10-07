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
import { getMonthPeriodError, getRequestErrorMessage } from '../requestFeedback';
// import CompraCreate from './CompraCreate';

function Compras(){
    const {user} = useAuth()
    const {loadEmpresa} = useEmpresa()
    const {loadEmpaques} = useEmpaques()
    const {loadUnidades} = useUnidades()
    const {compras, loadCompras, loadMoreCompras, comprasPagination, comprasTotals, findCompra, selectCompra, compra } = useContext(ComprasContext)
    
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
    const [isLoading, setIsLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadError, setLoadError] = useState('')

    const [mesAnio, setMesAnio] = useState(moment().format("YYYY-MM"))
    useEffect(()=>{
        let active = true
        const periodError = getMonthPeriodError(mesAnio)
        if(periodError){
            setLoadError(periodError)
            setIsLoading(false)
            return () => { active = false }
        }

        setIsLoading(true)
        setLoadError('')
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
        loadAll()
            .catch(error => {
                if(!active) return
                const message = getRequestErrorMessage(error, 'No fue posible cargar las compras.')
                setLoadError(message)
                showMessage(message, 'error')
            })
            .finally(() => {
                if(active) setIsLoading(false)
            })
        return () => { active = false }
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

    const editCompra = async (compraResumen) => {
        setIsLoading(true)
        try{
            const selected = await findCompra(user, compraResumen._id)
            if(selected) setDetCompra(true)
        }finally{
            setIsLoading(false)
        }
    }

    const closeCompra = async () => {
        setDetCompra(false)
        selectCompra(null)
        setIsLoading(true)
        try{
            await loadCompras(user, mesAnio)
        }finally{
            setIsLoading(false)
        }
    }

    function cancelar(){
        compras.cancelarCompra(compra._id).then(res => {
            closeConfirm()
            if (res.status !== 'error') {
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

    async function showVerCompra(compraResumen){
        setIsLoading(true)
        try{
            const selected = await findCompra(user, compraResumen._id)
            if(selected) setVerCompra(true)
        }finally{
            setIsLoading(false)
        }
    }

    const cargarMasCompras = async () => {
        setLoadingMore(true)
        try{
            await loadMoreCompras(user)
        }finally{
            setLoadingMore(false)
        }
    }

    return isLoading ?
        <Backdrop open={isLoading}>
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
                    error={Boolean(loadError)}
                    helperText={loadError}
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
                {!loadError && (compras.length > 0 ?
                    <ListaCompras 
                        compras={compras}
                        totals={comprasTotals}
                        editCompra={editCompra} 
                        verCompra={showVerCompra} 
                    />
                    :
                    <Grid item xs={12}>
                        <Typography variant='h6' align="center"> No hay compras registradas en {Meses.filter(mes=>mes.id === mesAnio.slice(5, 7)).map(mes=>mes.nombre)} {mesAnio.slice(0, 4)}.</Typography>
                    </Grid>
                )}
                {!loadError && comprasPagination.hasMore ?
                    <Grid item xs={12}>
                        <Typography align="center" component="div">
                            <Button onClick={cargarMasCompras} disabled={loadingMore}>
                                {loadingMore ? <CircularProgress size={24} /> : 'Cargar más compras'}
                            </Button>
                        </Typography>
                    </Grid>
                    : null}
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