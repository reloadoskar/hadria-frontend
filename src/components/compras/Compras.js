import React, { useEffect, useState, useContext } from 'react'
import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Grid,
    Menu, MenuItem, TextField, Typography,
} from '@material-ui/core';
import { ComprasContext } from './CompraContext'
import { ProductosContext } from '../productos/ProductosContext'
import { ProductorContext } from '../productors/ProductorContext';
import { useSnackbar } from 'notistack'

import AddIcon from '@material-ui/icons/Add'
import useTipoCompras from '../hooks/useTipoCompras';

import useStyles from '../hooks/useStyles'

import CrearCompra from './CrearCompra';
import ConfirmDialog from './ConfirmDialog'
import Compra from './Compra';
import ListaCompras from './ListaCompras';
import DetalleCompra from './DetalleCompra'
import { Meses } from '../tools/Meses'
import moment from 'moment'
// import CompraCreate from './CompraCreate';

function Compras(){
    const {compras, loadCompras, addCompra, clearCompras } = useContext(ComprasContext)
    
    const {productos, loadProductos, addProducto} = useContext(ProductosContext)
    const {productors, addProductor} = useContext(ProductorContext)
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
    let now = moment()
    const [month, setMonth] = useState(now.format("MM"))
    const [year, setYear] = useState(now.format("YYYY"))
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        setIsLoading(true)
        const loadAll = async () => {
            const res = await Promise.all([
                loadProductos(),
                loadCompras(month, year)                
            ])
            return res
        }
        loadAll().then(()=>{
            setIsLoading(false)
        })
    },[month, year]) // eslint-disable-line react-hooks/exhaustive-deps

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

    return isLoading ?
        <Backdrop open={isLoading} onClick={()=> setIsLoading(false)}>
            <CircularProgress color="inherit" />
        </Backdrop>
        :
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <TextField
                        id="year"
                        select
                        value={year}
                        fullWidth
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <MenuItem value={2021}>2021</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                    </TextField>
                    <Button
                        fullWidth
                        onClick={handleClick}
                        className={classes.botonsoteGenerico}
                        children={
                            Meses.filter(mes=>mes.id === month).map(mes=>mes.nombre)
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
                            <MenuItem onClick={() => onChangeMonth(mes.id)} key={i}>{mes.nombre}</MenuItem>
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
                        provedors={productors}
                        tipoCompras={tipoCompras}
                        addTipoCompra={addTipoCompra}
                        addProvedor={addProductor}
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