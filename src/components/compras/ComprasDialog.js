import React, { useState, useReducer } from 'react';

//COMPONENTS
import CompraAddItemsDialog from './CompraAddItemsDialog'

//MATERIAL UI
import { TextField, MenuItem, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Table, TableHead, TableRow, TableCell, TableBody, Container, Grid, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SaveIcon from '@material-ui/icons/Save';

//HOOKS
import useProvedors from '../hooks/useProvedors';
import useTipoCompras from '../hooks/useTipoCompras';
import useUbicacions from '../hooks/useUbicacions';
import useProduccions from '../hooks/useProduccions';
import useStyles from '../hooks/useStyles'


//REDUCER
import reducer from '../reducers/ComprasReducer';

import {objectIsNull} from '../Tools'
import { saveCompra, ticketCompra } from '../api'
import moment from 'moment'

const initialState ={
    provedor: '',
    produccion: '',
    tipoCompra: '',
    remision: '',
    fecha: moment().format('YYYY-MM-DD'),
    ubicacion: '',
    items: [],
    total: 0,
    addItemDialog: false,
    comprasDialog: false,
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ComprasDialog({ open, close, addCompra, showMessage }) {
    const classes = useStyles();

    const {provedors} = useProvedors();
    const {produccions} = useProduccions();
    const {tipoCompras} = useTipoCompras();
    const {ubicacions} = useUbicacions();
    const[addItemDialog, setAddItemDialog] = useState(false)
    const [values, dispatch] = useReducer(reducer, initialState)

    const handleClose = (dialog) => {
        dispatch({type: 'reset'})
        close()
    }

    const openDialog = () => {
        setAddItemDialog(true)
    }

    const closeDialog = () => {
        setAddItemDialog(false)
    }

    const addItemToList = (item) => {
        dispatch({type: 'addItem', value: item})
    }

    const clearList = () => {
        dispatch({type: 'clearList'})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const compra = {
            provedor: values.provedor,
            produccion: values.produccion,
            tipoCompra: values.tipoCompra,
            remision: values.remision,
            fecha: values.fecha,
            ubicacion: values.ubicacion,
            items: values.items,
            total: values.total,
        }

        // console.log(compra)
        if(objectIsNull(compra)){
            showMessage("Faltan datos por llenar.", 'error')
            return false
        }else{
            saveCompra(compra).then( (res) => {
                if(res.status === "error"){
                    showMessage(res.message, res.status)
                }else{
                    showMessage(res.message, res.status)
                    handleClose('comprasDialog')   
                    dispatch({type: 'reset'})                 
                    addCompra(res.compra)
                    ticketCompra(res.compra).then(res =>{
                        if(res.status === 'error'){
                            showMessage(res.message, res.status)
                        }
                    })
                }
            })

        }
    }

    return (
        <div>
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

                <Container>

                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6" className={classes.title}>
                            Datos de la Compra:
                        </Typography>
                        <Grid container spacing={2}>
                            {/* Select: Provedor return Object Provedor */}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    autoFocus
                                    id="provedor"
                                    select
                                    required
                                    fullWidth
                                    label="Selecciona un Proveedor"
                                    margin="normal"
                                    value={values.provedor}
                                    onChange={(e) => dispatch({type: 'provedor', value: e.target.value})}
                                    variant="outlined"
                                    >
                                        {provedors.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option.clave} - {option.nombre}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            {/* Select: TipoCompra return Object TipoCompra  */}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="tipoCompra"
                                    select
                                    required
                                    fullWidth
                                    label="Selecciona un Tipo de Compra"
                                    value={values.tipoCompra}
                                    onChange={(e) => dispatch({type: 'tipoCompra', value: e.target.value})}
                                    margin="normal"
                                    variant="outlined"
                                    >   
                                        {tipoCompras.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option.tipo}
                                            </MenuItem>
                                        ))}
                                </TextField>
                                {
                                    values.tipoCompra.tipo === 'PRODUCCION'
                                    ?
                                        <TextField
                                        id="produccion"
                                        select
                                        fullWidth
                                        label="Selecciona una Producción"
                                        value={values.produccion}
                                        onChange={(e) => dispatch({type: 'produccion', value: e.target.value})}
                                        margin="normal"
                                        variant="outlined"
                                        >   
                                            {produccions.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option.folio+"-"+option.clave}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    :
                                        null
                                }
                            </Grid>
                            {/* Input: Remision */}
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="remision"
                                    type="text"
                                    label="Número de remisión"
                                    helperText="Ingresa el Número de Remisión de la compra"
                                    margin="normal"
                                    value={values.remision}
                                    onChange={(e) => dispatch({type: 'remision', value: e.target.value})}
                                    fullWidth
                                    variant="outlined"
                                    />
                            </Grid>
                            {/* Input: Fecha return Moment Object */}
                            <Grid item xs={12} md={4}>
                                
                                <TextField 
                                    id="fecha"
                                    label="Selecciona la fecha"
                                    type="date"
                                    value={values.fecha}
                                    onChange={(e) => dispatch({type: 'fecha', value: e.target.value})}
                                    margin="normal"
                                    fullWidth
                                />
                                
                            </Grid>
                            {/* Select: Ubicacion return _id Ubicacion */}
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="ubicacion"
                                    select
                                    required
                                    fullWidth
                                    label="Selecciona una Ubicación"
                                    value={values.ubicacion}
                                    onChange={(e) => dispatch({type: 'ubicacion', value: e.target.value})}
                                    margin="normal"
                                    helperText="Por favor selecciona una Ubicación."
                                    variant="outlined"
                                    >
                                        {
                                            ubicacions.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option.nombre}
                                                </MenuItem>
                                            ))
                                        }
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item xs={12} md={4}>
                                <Button fullWidth variant="contained" color="secondary" onClick={() => openDialog()}>
                                    + Agregar productos
                                </Button>
                        
                            </Grid>
                        </Grid>                        
                        {/* Tabla de Items */}
                        <Grid container spacing={2}>
                            <Grid item xs={10} md={12}>
                                { values.items.length > 0 ? 
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Producto</TableCell>
                                            <TableCell align="right">Cantidad</TableCell>
                                            <TableCell align="right">Empaques</TableCell>
                                            <TableCell align="right">Costo</TableCell>
                                            <TableCell align="right">Importe</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            values.items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {
                                                            values.provedor.clave !== item.provedor.clave 
                                                            ?
                                                                item.producto.descripcion  + " (" + item.provedor.clave + ")" 
                                                            :
                                                             
                                                                item.producto.descripcion
                                                        }
                                                    </TableCell>
                                                    <TableCell align="right">{item.cantidad}</TableCell>
                                                    <TableCell align="right">{item.empaques}</TableCell>
                                                    <TableCell align="right">{item.costo}</TableCell>
                                                    <TableCell align="right">{item.importe}</TableCell>
                                                </TableRow>
                                                ))
                                        }
                                        <TableRow>
                                            <TableCell rowSpan={4} />
                                            <TableCell colSpan={3}>Items</TableCell>
                                            <TableCell align="right">{values.items.length}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3}>Total</TableCell>
                                            <TableCell align="right">{values.total}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                :
                                <Typography variant="h6" align="center" gutterBottom>Aún no hay productos agregados.</Typography>
                                }
                            </Grid>
                            <Grid container spacing={2} justifyContent="flex-end" alignContent="flex-end">
                                <Grid item xs={6} md={2}>
                                    <Button 
                                        fullWidth
                                        variant="contained" 
                                        color="secondary" 
                                        startIcon={<ClearAllIcon />}
                                        onClick={() => clearList()}>
                                            Borrar Lista
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <Button 
                                    fullWidth
                                        type="submit" 
                                        variant="contained" 
                                        color="primary"  
                                        endIcon={<SaveIcon />}>Guardar Compra</Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        
                    </form>
                </Container>

            </Dialog>

            <CompraAddItemsDialog 
                open={addItemDialog}
                handleClose={closeDialog}
                openDialog={openDialog}
                showMessage={showMessage}
                addItemToList={addItemToList}
                tipoCompra={values.tipoCompra}
            />
        </div>
    );
}