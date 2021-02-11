import React, { useState } from 'react';
import TablaCompras from './TablaCompras';
import { useSnackbar } from 'notistack';
import {
    Button,
    Container,
    Grid} from '@material-ui/core';

import DetalleCompra from './DetalleCompra'
import ConfirmDialog from './ConfirmDialog'
import Buscador from './Buscador'

import useCompras from '../hooks/useCompras';
import useProducts from '../hooks/useProducts'
import useProvedors from '../hooks/useProvedors';
import useTipoCompras from '../hooks/useTipoCompras';
import useUbicacions from '../hooks/useUbicacions';

import AddIcon from '@material-ui/icons/Add';
import useStyles from '../hooks/useStyles'
import CrearCompra from './CrearCompra';



function Compras() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()
    const {products, addProduct } = useProducts()
    const {provedors, add} = useProvedors();
    const {tipoCompras, addTipoCompra} = useTipoCompras();
    const {ubicacions} = useUbicacions();

    const { compras, crear, eliminar, } = useCompras();
    const [showDialog, setShowDialog] = useState(false)
    const [showDialogP, setShowDialogP] = useState(false)
    const [detCompra, setDetCompra] = useState(false)
    const [compra, setCompra] = useState(null)
    const [confirm, setConfirm] = useState(false)

    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    const crearCompra = (compra) => {
        return crear(compra).then(res => {
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
        setDetCompra(true)
        setCompra(compra)
    }

    const closeCompra = () => {
        setDetCompra(false)
        setCompra(null)
    }

    const openConfirm = (compra, index) => {
        compra.index = index
        setCompra(compra)
        setConfirm(true)
    }

    const cancelConfirm = () => {
        setConfirm(false)
        setCompra(null)
    }

    const okConfirm = (data) => {
        
        cancelConfirm()
        eliminar(data._id, data.index).then(res => {
            if (res.status === 'error') {
            } else {
                showMessage(res.message, res.status)
            }
        })
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
                        crear={crearCompra}
                        products={products}
                        addProducto={addProduct}
                        provedors={provedors}
                        tipoCompras={tipoCompras}
                        ubicacions={ubicacions}
                        addTipoCompra={addTipoCompra}
                        add={add}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TablaCompras compras={compras} editCompra={editCompra} openConfirm={openConfirm}/>
                </Grid>
            </Grid>
         
                    
                <DetalleCompra compra={compra} open={detCompra} close={closeCompra} showMessage={showMessage} />
                <ConfirmDialog open={confirm} cancel={cancelConfirm} ok={okConfirm} data={compra} />

        </Container>
    )
}

export default Compras