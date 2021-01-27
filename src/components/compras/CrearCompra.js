import React, { useEffect, useState } from 'react'
import { 
    Button,
    Typography,
    Stepper, Step, StepLabel, Grid, AppBar, Dialog, Slide, Toolbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import useStyles from '../hooks/useStyles'

import moment from 'moment'
import Items from './Items'
import Gastos from './Gastos'
import DatosGenerales from './DatosGenerales';
import Resumen from './Resumen'
import ProvedorLite from '../creators/ProvedorLite'
import TipoCompra from '../creators/TipoCompra'
import {formatNumber, sumImporte} from '../Tools'
import { ticketCompra } from '../api'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CrearCompra(props){
    const { open, crear, showMessage, close, provedors, add, tipoCompras, ubicacions, addTipoCompra } = props
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0)
    const steps = ["Datos generales", "Agregar productos", "Agregar Gastos", "Resumen"]
    const [guardando, setGuardando] = useState(false)
    
    const [provedor, setProvedor] = useState('')
    const [tipoCompra, setTipoCompra] = useState('')
    const [remision, setRemision] = useState('')
    const [fecha, setFecha] = useState(moment().format('YYYY-MM-DD'))
    const [ubicacion, setUbicacion] = useState('')
    
    const [items, setItems] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const crearItem = (item) => {
        setItems([...items, item])  
    }
    const eliminarItem = (index) => {
            var r = items
            r.splice(index, 1)
            setItems(r)
    }

    const [gastos, setGastos] = useState([])
    const [totalGastos, setTotalGastos] = useState(0)
    const crearGasto = (gasto) => {
        setGastos([...gastos, gasto])
    }
    const eliminarGasto = (index) =>{
        var g = gastos
        g.splice(index,1)
        setGastos(g)
    }

    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        let mounted = true
        if(mounted){
            setTotalItems(sumImporte(items))
        }
        return () => {
            mounted = false
        }
    }, [items])

    useEffect(() => {
        let mounted = true
        if(mounted){
            setTotalGastos(sumImporte(gastos))
        }
        return () => {
            mounted = false
        }
    },[gastos])

    useEffect(() => {
        let mounted = true
        if(mounted){
            setTotal( totalItems + totalGastos)
        }
        return () => {
            mounted = false
        }
    },[totalItems, totalGastos])

    const [provedorFastDialog, setProvedorFastDialog] = useState(false)
    const [tipoCompraDialog, setTipoCompraDialog] = useState(false)

    const closeProvedorFastDialog = () => {
        setProvedorFastDialog(false)
    }

    const closeTipoCompraDialog = () => {
        setTipoCompraDialog(false)
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };

    const openDialogProvedor = () => {
        setProvedorFastDialog(true)
    }

    const openDialogTipoCompra = () => {
        setTipoCompraDialog(true)
    }
    
    // const clearItems = () => {
    //     setItems([])
    // }

    const clearAll = () => {
        setProvedor('')
        setTipoCompra('')
        setRemision('')
        setFecha(moment().format('YYYY-MM-DD'))
        setUbicacion('')
        setItems([])
        setGastos([])
        setGuardando(false)
    }

    const handleClose = () => {
        clearAll()
        close()
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <DatosGenerales 
                        provedor={provedor}
                        provedors={provedors}
                        tipoCompra={tipoCompra}
                        tipoCompras={tipoCompras}
                        remision={remision}
                        fecha={fecha}
                        ubicacion={ubicacion}
                        ubicacions={ubicacions}
                        openDialogProvedor={openDialogProvedor}
                        openDialogTipoCompra={openDialogTipoCompra}
                        handleChange={handleChange} />
                )
            case 1:
                return (
                    <Items items={items} crearItem={crearItem} eliminar={eliminarItem} {...props}/>
                    // <div>
                    //     <AgregarItem addItemToList={addItemToList} showMessage={showMessage}/>
                    //     <ListaItems items={items} clearItems={clearItems} removeItem={removeItem}/>
                    // </div>
                );
            case 2:
                return (
                    <Gastos gastos={gastos} crear={crearGasto} eliminar={eliminarGasto} total={totalGastos} />
                )
            case 3:
                return (
                    <Resumen 
                        formatNumber={formatNumber}
                        provedor={provedor}
                        ubicacion={ubicacion}
                        fecha={fecha}
                        total={total}
                        totalItems={totalItems}
                        totalGastos={totalGastos}
                    />
                    
                )
            default:
                return 'Unknown stepIndex';
        }
    }

    const handleChange = (type, value) => {
        switch(type){
            case 'provedor':
                return setProvedor(value)
            case 'tipoCompra':
                return setTipoCompra(value)
            case 'remision':
                return setRemision(value)
            case 'fecha':
                return setFecha(value)
            case 'ubicacion':
                return setUbicacion(value)
            default: 
                return false
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        var nCompra = {
            provedor: provedor,
            ubicacion: ubicacion,
            tipoCompra: tipoCompra,
            items: items,
            gastos: gastos,
            remision: remision,
            fecha: fecha,
            importeItems: totalItems,
            importe: total,
        }
        setGuardando(true)
        crear(nCompra).then( (res) => {
            if(res.status === "error"){
                    showMessage(res.message, res.status)
                }else{
                    clearAll()
                    showMessage(res.message, res.status)              
                    ticketCompra(res.compra).then(res =>{
                        if(res.status === 'error'){
                            showMessage(res.message, res.status)
                        }
                    })
                }
            })
        
    }
    return (
        <Dialog fullScreen open={open} onClose={() => handleClose()} TransitionComponent={Transition}>

            <AppBar className={classes.comprasBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => handleClose()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Nueva Compra
                    </Typography>
                    <Button color="inherit" onClick={() => handleClose()}>
                        Salir
                    </Button>
                </Toolbar>
            </AppBar>

            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <ProvedorLite 
                open={provedorFastDialog}
                close={closeProvedorFastDialog}
                addProvedor={add}
            />

            <TipoCompra
                open={tipoCompraDialog}
                close={closeTipoCompraDialog}
                creator={addTipoCompra}
                report={showMessage}
            />
            {
                guardando === true ?
                    <Typography align="center">Guardando...</Typography>
                    :

                    
                        activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>All steps completed</Typography>
                                <Button onClick={handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <Grid container >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        {getStepContent(activeStep)}
                                    </Grid>
                                </Grid>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.botonSimplon}
                                        >
                                            Atrás
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        {
                                            activeStep === steps.length - 1 ?
                                                <Button 
                                                disabled = { provedor !== '' && ubicacion !== '' && tipoCompra !== '' ? false : true }
                                                className={classes.botonCosmico} onClick={(e) => handleSubmit(e)}>
                                                    Guardar Compra <SaveIcon />
                                                </Button>
                                            :
                                            <Button 
                                            className={classes.botonGenerico}
                                            onClick={handleNext}
                                                >                                    
                                                {activeStep === steps.length - 1 ? 'Guardar Compra' : 'Siguiente'}
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    
            }
        </Dialog>
    )
}   