import React, { useState } from 'react'
import CompraBasic from './CompraBasic'
import { useSnackbar } from 'notistack'
import {
    Button,
    Container,
    Grid} from '@material-ui/core';

import DetalleCompra from './DetalleCompra'
import Buscador from './Buscador'

import useCompras from '../hooks/useCompras';
import useProducts from '../hooks/useProducts'
import useProvedors from '../hooks/useProvedors';
import useUbicacions from '../hooks/useUbicacions';
import useTipoCompras from '../hooks/useTipoCompras';

import AddIcon from '@material-ui/icons/Add';
import useStyles from '../hooks/useStyles'
import CrearCompra from './CrearCompra';
import ConfirmDialog from './ConfirmDialog'
import VerCompra from './VerCompra';


function Compras(props) {
    const {compras, crearCompra, cancelarCompra} = useCompras()
    const {products, addProduct } = useProducts()
    const {provedors, addProvedor} = useProvedors()
    const {ubicacions} = useUbicacions();
    const {tipoCompras, addTipoCompra} = useTipoCompras();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()

    const [showDialog, setShowDialog] = useState(false)
    const [showDialogP, setShowDialogP] = useState(false)
    const [detCompra, setDetCompra] = useState(false)
    const [compra, setCompra] = useState(null)
    const [verCompra, setVerCompra] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const crear = (compra) => {
        return crearCompra(compra).then(res => {
            closeDialog()
            return res
        })
    }
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
        setCompra(compra)
        setDetCompra(true)
    }

    const closeCompra = () => {
        setDetCompra(false)
        setCompra(null)
    }


    function cancelar(){
        cancelarCompra(compra._id).then(res => {
            closeConfirm()
            if (res.status === 'error') {
            } else {
                showMessage(res.message, res.status)
            }
        })
    }
    function openConfirm(compra){
        setCompra(compra)
        setConfirm(true)
    }
    function closeConfirm(){
        setCompra(null)
        setConfirm(false)
    }

    function closeVerCompra(){
        setCompra(null)
        setVerCompra(!verCompra)
    }

    function showVerCompra(compra){
        setCompra(compra)
        setVerCompra(true)
    }
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Buscador />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button className={classes.botonGenerico} fullWidth onClick={() => openDialog('comprasDialog')}>
                        <AddIcon /> Crear Compra
      		        </Button>
                    <CrearCompra
                        open={showDialog}
                        dialogP={showDialogP}
                        close={closeDialog}
                        openP={openDialogP}
                        closeP={closeDialogP}
                        showMessage={showMessage}
                        crear={crear}
                        products={products}
                        addProduct={addProduct}
                        provedors={provedors}
                        tipoCompras={tipoCompras}
                        ubicacions={ubicacions}
                        addTipoCompra={addTipoCompra}
                        addProvedor={addProvedor}
                    />
                </Grid>
                {compras === null ? null :
                    compras.map((compra, index) => (
                        <Grid item xs={12} key={index}>                    
                            <CompraBasic compra={compra}  openConfirm={openConfirm} editCompra={editCompra} verCompra={showVerCompra}/>
                        </Grid>
                    ))
                }
            </Grid>
            <DetalleCompra 
                compra={compra} 
                open={detCompra} 
                close={closeCompra} 
                showMessage={showMessage} 
                ubicacions={ubicacions}
                products={products}
                provedors={provedors}
            />
            <ConfirmDialog open={confirm} close={closeConfirm} onConfirm={cancelar}/>
            <VerCompra 
                compra={compra} 
                isOpen={verCompra} 
                handleClose={closeVerCompra} 
                cerrar={cancelarCompra}                
            />
        </Container>
    )
}

export default Compras