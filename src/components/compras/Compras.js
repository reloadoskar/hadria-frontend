import React, { useState } from 'react';
import ComprasDialog from '../dialogs/ComprasDialog';

import { useSnackbar } from 'notistack';
import {
    IconButton,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    LinearProgress,
    Button,
    Container,
    Grid,
    Paper
} from '@material-ui/core';

import DetalleCompra from './DetalleCompra'
import ConfirmDialog from './ConfirmDialog'
import Buscador from './Buscador'

import useCompras from '../hooks/useCompras';
import useStyles from '../hooks/useStyles'

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';


const TablaCompras = ({ compras, editCompra, openConfirm }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table size="small" className={classes.table}>

                <TableHead>
                    <TableRow>
                        <TableCell>Folio</TableCell>
                        <TableCell>Clave</TableCell>
                        <TableCell>Remisión</TableCell>
                        <TableCell>Proveedor</TableCell>
                        <TableCell>Ubicación</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        compras.map((compra) => (
                            <TableRow key={compra._id}>
                                <TableCell >{compra.folio}</TableCell>
                                <TableCell >{compra.clave}</TableCell>
                                <TableCell >{compra.remision}</TableCell>
                                <TableCell >{compra.provedor.nombre}</TableCell>
                                <TableCell >{compra.ubicacion.nombre}</TableCell>
                                <TableCell >{compra.tipoCompra.tipo}</TableCell>
                                <TableCell >{compra.status}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => editCompra(compra)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton
                                        disabled={compra.status === "CANCELADO" ? true : false}
                                        aria-label="delete"
                                        onClick={() => openConfirm(compra)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

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




                    {
                        compras === null ?
                            <LinearProgress variant="query" />
                            :
                            compras.length === 0 ?
                                <Typography variant="h6" align="center" gutterBottom>No hay Compras registradas.</Typography>
                                :
                                <TablaCompras compras={compras} editCompra={editCompra} openConfirm={openConfirm}/>

                    }


                <DetalleCompra compra={compra} open={detCompra} close={closeCompra} showMessage={showMessage} />
                <ConfirmDialog open={confirm} cancel={cancelConfirm} ok={okConfirm} data={compra} />

        </Container>
    )
}

export default Compras