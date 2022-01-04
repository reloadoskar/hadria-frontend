import React, { useEffect, useState, useContext } from 'react'
import {
    Button,
    Container,
    Grid,
    Typography, Menu, MenuItem,
} from '@material-ui/core';
import { ComprasContext } from './CompraContext'
import { ProductosContext } from '../productos/ProductosContext'
import { useSnackbar } from 'notistack'

import AddIcon from '@material-ui/icons/Add'
import useProvedors from '../hooks/useProvedors';
import useTipoCompras from '../hooks/useTipoCompras';

import useStyles from '../hooks/useStyles'

import CrearCompra from './CrearCompra';
import ConfirmDialog from './ConfirmDialog'
import Compra from './Compra';
import ListaCompras from './ListaCompras';
import DetalleCompra from './DetalleCompra'
import { Meses } from '../tools/Meses'
// import CompraCreate from './CompraCreate';

function Compras({ubicacions}) {
    const {compras, loadCompras, addCompra, clearCompras } = useContext(ComprasContext)
    
    // const  Productos = useProducts()
    const {productos, loadProductos, addProducto} = useContext(ProductosContext)
    const {provedors, addProvedor} = useProvedors()
    const {tipoCompras, addTipoCompra} = useTipoCompras();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar()
    const showMessage = (text, type) => { enqueueSnackbar(text, { variant: type }) }
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showDialog, setShowDialog] = useState(false)
    const [showDialogP, setShowDialogP] = useState(false)
    const [detCompra, setDetCompra] = useState(false)
    const [compra, setCompra] = useState(null)
    const [verCompra, setVerCompra] = useState(false)
    const [confirm, setConfirm] = useState(false)
    let now = new Date()
    const [month, setMonth] = useState(now.getMonth() + 1)
    const [year, setYear] = useState(now.getFullYear())

    

    useEffect(()=>{
        loadCompras(month, year)
        loadProductos()
    },[month])

    
    const crear = (compra) => {
        return addCompra(compra).then(res => {
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

    const onChangeMonth = (mes) => {
        clearCompras()
        setMonth(mes)
        handleClose()
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12}><Typography variant="h6" align="center">Compras</Typography></Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        fullWidth
                        onClick={handleClick}
                        className={classes.botonsoteGenerico}
                        children={
                            Meses[month]
                        } />
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={handleClose}
                    >
                        {Meses.map((mes, i) => (
                            <MenuItem onClick={() => onChangeMonth(i)} key={i}>{mes}</MenuItem>
                        ))}
                    </Menu>
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
                        crear={crear}
                        products={productos}
                        addProduct={addProducto}
                        provedors={provedors}
                        tipoCompras={tipoCompras}
                        ubicacions={ubicacions}
                        addTipoCompra={addTipoCompra}
                        addProvedor={addProvedor}
                    />
                </Grid>
                <ListaCompras 
                    compras={compras} 
                    editCompra={editCompra} 
                    verCompra={showVerCompra} 
        
                    />
            </Grid>
            <DetalleCompra 
                compra={compra} 
                open={detCompra} 
                close={closeCompra} 
                showMessage={showMessage} 
                ubicacions={ubicacions}
                products={productos}
                provedors={provedors}
            />
            <ConfirmDialog open={confirm} close={closeConfirm} onConfirm={cancelar}/>
            <Compra compra={compra} open={verCompra} close={closeVerCompra} compras={compras} />
        </Container>
    )
}

export default Compras