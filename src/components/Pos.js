import React, {useReducer, } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment'

import {saveVenta} from './api'

import PosMenu from './PosMenu'
import PosComprasFor from './PosComprasFor'
import PosAddDialog from './PosAddDialog'
import PosListaDeVenta from './PosListaDeVenta'
import PosAcceso from './PosAcceso'
import PosDialog from './PosDialog'
import PosCobrarDialog from './PosCobrarDialog'

import { SnackbarProvider } from 'notistack';
import { Typography, IconButton, Dialog, Slide, AppBar, Toolbar, Grid, Container, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import reducer from './reducers/PosReducer'

import useStyles from './hooks/useStyles'
import useSelectForm from './hooks/useSelectForm'
import useInventario from './hooks/useInventario';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function Pos() {
    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles();
    const { showForm } = useSelectForm();
    const {inventario} = useInventario();
    const [values, dispatch] = useReducer(reducer, {
        dialogOpened: false, 
        dialogAddOpened: false, 
        dialogCobrarOpened: false, 
        inventarioFiltrado: [],
        show: false, 
        form: '', 
        ubicacion: '', 
        cliente: '', 
        tipoPago: '',
        fecha: new Date(), 
        itemToAdd: null,
        itemsToSave: [],
        total: 0,
        cantidad: '',
        empaques: '',
        precio: '',
        importe: '',
        efectivo: '',
        cambio: '',
        acuenta: '',
        saldo: '',
        compraIdSelected: '',
        // message: {
        //     text: 'Seguro que algo malo pasó.',
        //     type: 'error'
        // }, 
    })

    const inventarioCopia = inventario
    
    const handleChange = (type, value) =>{
        dispatch({type: type, value: value})
    }

    const handleClose = () => {
        dispatch({type: 'closePos', value: false})
    };

    const startPos = () =>{
        if(values.inventarioFiltrado.length > 0){
            dispatch({type: 'openPos', value: true})
        }else{
            enqueueSnackbar("La ubicación que seleccionaste, no tiene productos que mostrar.", {variant: 'error'} )
        }
    }

    const wantThisItem = (item, index, indexParent, compraId) =>{
        dispatch({type: 'itemWanted', value: item, index: index, indexParent: indexParent, compraId: compraId})
    }

    const closeAddDialog = () =>{
        dispatch({type: 'closeAddDialog'})
    }

    const closeCobrarDialog = () =>{
        dispatch({type: 'closeCobrarDialog'})
    }

    const add = (item) => {
        dispatch({type: 'addItem', value: item})
        closeAddDialog()
    }

    const removeItem = (index, item) => {

    }

    const cobrar = () => {
        dispatch({type: 'dialogCobrar', value: true})
    }

    const setUbicacion = (value) => {
        dispatch({type: 'ubicacion', value: value, inv: inventarioCopia})
    }

    const registrarVenta = () => {
        // dispatch({type: 'registrarVenta'})
        saveVenta(values)
        .then(res =>{
            showMessage(res.message, res.status)
            resetPos()
            })
    }

    const resetPos = () => {
        dispatch({type: 'resetPos'})
    }

    const showMessage = (text, type) => {
        enqueueSnackbar(text, {variant: type} )
        // enqueueSnackbar(values.message.text, {variant: values.message.type} )
    }
 
    return (
        <Container maxWidth="sm">

            <PosAcceso 
                values={values} 
                setUbicacion={setUbicacion} 
                startPos={startPos} 
                handleChange={handleChange}/>

            {/* <PosDialog /> */}


        <Dialog fullScreen open={values.dialogOpened} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.posBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Punto de venta.
                    </Typography>
                    <Typography>
                        Estas en: {values.ubicacion.nombre} el: {moment(values.fecha).format("dddd, DD MMMM [de] YYYY")}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <PosMenu showForm={showForm} />
                </Grid>
                <Grid item xs={6}>

                    <PosComprasFor 
                        inventario={values.inventarioFiltrado} 
                        wantThisItem={wantThisItem} 
                        showMessage={showMessage}/>

                </Grid>

                <Grid item xs={4}>
                    <PosListaDeVenta 
                        items={values.itemsToSave} 
                        cobrar={cobrar} 
                        total={values.total} 
                        remove={removeItem}/>
                </Grid>
            </Grid>

            <PosAddDialog
                dialogAddOpened={values.dialogAddOpened}
                closeMe={closeAddDialog} 
                compraIdSelected={values.compraIdSelected}
                itemToAdd={values.itemToAdd} 
                add={add} 
                handleChange={handleChange}/>

            <PosCobrarDialog 
                dialogCobrarOpened={values.dialogCobrarOpened} 
                handleClose={closeCobrarDialog}
                cliente={values.cliente}
                tipoPago={values.tipoPago}
                handleChange={handleChange}
                efectivo={values.efectivo}
                cambio={values.cambio}
                acuenta={values.acuenta}
                saldo={values.saldo}
                registrarVenta={registrarVenta}
                total={values.total}/>
            

        </Dialog>

        </Container>

    )
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}>
            <Pos />
        </SnackbarProvider>
    );
}