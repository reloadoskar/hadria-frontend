import React, { useState } from 'react';
import ComprasDialog from './ComprasDialog';
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

import AddIcon from '@material-ui/icons/Add';




function Compras() {
    const { enqueueSnackbar } = useSnackbar()
    const { compras, addCompra, del, } = useCompras();
    const [showDialog, setShowDialog] = useState(false)
    const [detCompra, setDetCompra] = useState(false)
    const [compra, setCompra] = useState(null)
    const [confirm, setConfirm] = useState(false)

    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }

    const openDialog = () => {
        setShowDialog(true)
    }

    const closeDialog = () => {
        setShowDialog(false)
    }

    const editCompra = (compra) => {
        setDetCompra(true)
        setCompra(compra)
    }

    const closeCompra = () => {
        setDetCompra(false)
        setCompra(null)
    }

    const openConfirm = (compra) => {
        setCompra(compra)
        setConfirm(true)
    }

    const cancelConfirm = () => {
        setConfirm(false)
        setCompra(null)
    }

    const okConfirm = (data) => {

        del(data._id).then(res => {
            if (res.status === 'error') {
            } else {
                showMessage(res.message, res.status)
            }
            cancelConfirm()
        })
    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Buscador />
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth margin="normal" variant="contained" color="secondary" onClick={() => openDialog('comprasDialog')}>
                        <AddIcon /> Crear Compra
      		        </Button>
                    <ComprasDialog
                        fullWidth
                        open={showDialog}
                        close={closeDialog}
                        showMessage={showMessage}
                        addCompra={addCompra}
                    />
                </Grid>
            </Grid>
         
                <TablaCompras compras={compras} editCompra={editCompra} openConfirm={openConfirm}/>
                    
                <DetalleCompra compra={compra} open={detCompra} close={closeCompra} showMessage={showMessage} />
                <ConfirmDialog open={confirm} cancel={cancelConfirm} ok={okConfirm} data={compra} />

        </Container>
    )
}

export default Compras