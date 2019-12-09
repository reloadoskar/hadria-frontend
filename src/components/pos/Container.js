import React, {useReducer, } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment'
import {getDataFrom, getCuentasPorCobrar, getCuentasPorPagar, existCorte} from '../api'

import Acceso from './Acceso'
import PosDialog from './PosDialog'
import PosCobrarDialog from './PosCobrarDialog'

import PagarDialog from '../dialogs/PagarDialog'
import EgresoDialog from '../dialogs/EgresoDialog'
import IngresoDialog from '../dialogs/IngresoDialog'
import AddItemDialog from '../dialogs/AddItemDialog'
import CobroDialog from '../dialogs/CobroDialog'
import CorteDialog from '../dialogs/CorteDialog'

// import { SnackbarProvider } from 'notistack';
import { Container, } from '@material-ui/core';

import reducer from './PosReducer'

import useInventario from '../hooks/useInventario';

const initialState = {
    saldoEnUbicacion: 0, 
    // POS DIALOG
    posDialog: false, 
    // ADD ITEM DIALOG
    addItemDialog: false, 
    // COBRAR DIALOG
    cobrarDialog: false, 
    // PAGO DIALOG
    pagarDialog: false,
    // EGRESO DIALOG
    egresoDialog: false,
    // INGRESO DIALOG
    ingresoDialog: false,
    // COBRO DIALOG
    cobroDialog: false,
    menuDialog: false,
    corteDialog: false,

    inventarioFiltrado: [],
    ubicacion: '', 
    fecha: moment().format('YYYY-MM-DD'), 
    itemToAdd: null,
    itemsToSave: [],
    total: 0,

    // CORTE
    corteExist: false,
    ventasCorte: [],
    egresosCorte: [],
    ingresosCorte: [],
    creditosCorte: [],

    cuentasPorPagar: [],
    cuentasPorCobrar: [],
}

function PosContainer() {
    const { enqueueSnackbar } = useSnackbar()
    const {inventario} = useInventario();
    const [values, dispatch] = useReducer(reducer, initialState)
    
    const openDialog = dialog =>{ 
        if( dialog === 'pagarDialog'){
            getCuentasPorPagar().then( res => {
                dispatch({ type: 'cuentasPorPagar', value: res.cuentas })
            })
        }
        if(dialog === 'cobroDialog'){
            getCuentasPorCobrar().then(res => {
                dispatch({ type: 'cuentasPorCobrar', value: res.cuentas })
            })
        }
        dispatch({type: 'openDialog', value: dialog}) 
    }

    const closeDialog = dialog => { 
        if(dialog === 'addItemDialog'){
            dispatch({type: 'itemWanted', value: null})
        }
        if(dialog === 'posDialog'){
            dispatch({type: 'resetPos'}) 
        }
        dispatch({type: 'closeDialog', value: dialog}) 
    }
    
    const showMessage = (text, type) => { enqueueSnackbar(text, {variant: type} ) }

    const wantThisItem = (item, index, compraId) =>{
        var wantThisItem = {
            item: item,
            index: index,
            compraId: compraId
        }
        dispatch({type: 'itemWanted', value: wantThisItem})
        openDialog('addItemDialog')
    }

    const add = (item) => {
        dispatch({type: 'addItem', value: item})
    }
    
    const removeItem = (index, item) => {
        dispatch({type: 'removeItem', value: index, item: item})
    }

    const addToSaldo = importe => {
        dispatch({type: 'addToSaldo', value: importe})
    }

    const subFromSaldo = importe => {
        dispatch({type: 'subFromSaldo', value: importe})
    }

    const resetVenta = () => {
        dispatch({type: "resetVenta"})
    }

    const handleChange = (type, value) => { 
        if(type === 'ubicacion'){
            dispatch({type: 'ubicacion', value: value, inv: inventario})
            // getDataFrom(value._id, values.fecha).then(res => {
            //     dispatch({type: 'setCorte', value: res.corte})
            // })
            return
        }
        if(type === 'fecha'){
            var f = moment(value).format('YYYY-MM-DD')
            return dispatch({type: type, value: f}) 
        }
        dispatch({type: type, value: value}) 
    }

    const startPos = () =>{
        // e.preventDefault()
        loadBalance()
        if(values.inventarioFiltrado.length <= 0){
            showMessage(values.ubicacion.nombre+" no tiene productos que mostrar.", 'warning' )
            openDialog('posDialog')
        }else{
            openDialog('posDialog')
        }
    }

    const loadBalance = () => {

        getDataFrom(values.ubicacion._id, values.fecha).then(res => {
            dispatch({type: 'setCorte', value: res.corte})
        })

    }

    const checkCorte = () => {
        existCorte(values.ubicacion._id, values.fecha).then( res =>{
            if(res.corte.length === 0){
                // dispatch({type: 'corteExist', value: false})                
                startPos()
            }else{
                dispatch({type: 'corteExist', value: true})
                showMessage('Fecha cerrada, para esta ubicación', 'error')
            }
        })
    }

    const showCorte = () => {
        closeDialog('menuDialog')
        loadBalance()
        openDialog('corteDialog')
    }


    return (
        <Container maxWidth="sm">

            <Acceso 
                values={values} 
                checkCorte={checkCorte} 
                handleChange={handleChange}/>

            <PosDialog 
                values={values}
                wantThisItem={wantThisItem}
                menuDialog={values.menuDialog}
                showMessage={showMessage}
                isOpen={values.posDialog}
                openDialog={openDialog}
                removeItem={removeItem}
                showCorte={showCorte}
                resetVenta={resetVenta}
                closeDialog={closeDialog}/>
            
            {values.itemToAdd &&
                <AddItemDialog 
                    isOpen={values.addItemDialog}
                    close={closeDialog}
                    item={values.itemToAdd}
                    add={add}
                    showMessage={showMessage}
                />
            }

            <PosCobrarDialog
                valuesToSave={values}
                isOpen={values.cobrarDialog}
                close={closeDialog}
                showMessage={showMessage}
                addToSaldo={addToSaldo}
                resetVenta={resetVenta}
                />
            <PagarDialog 
                fecha={values.fecha}
                cuentas={values.cuentasPorPagar}
                ubicacion={values.ubicacion}
                isOpen={values.pagarDialog}
                saldoDisponible={values.saldoEnUbicacion}
                close={closeDialog}
                showMessage={showMessage}
                subFromSaldo={subFromSaldo}
            />

            <EgresoDialog 
                fecha={values.fecha}
                ubicacion={values.ubicacion}
                isOpen={values.egresoDialog}
                saldoDisponible={values.saldoEnUbicacion}
                close={closeDialog}
                showMessage={showMessage}
                subFromSaldo={subFromSaldo}
            />

            <IngresoDialog 
                fecha={values.fecha}
                ubicacion={values.ubicacion}
                isOpen={values.ingresoDialog}
                close={closeDialog}
                showMessage={showMessage}
                addToSaldo={addToSaldo}
            />

            <CobroDialog 
                fecha={values.fecha}
                cuentas={values.cuentasPorCobrar}
                ubicacion={values.ubicacion}
                isOpen={values.cobroDialog}
                saldoDisponible={values.saldoEnUbicacion}
                close={closeDialog}
                showMessage={showMessage}
                addToSaldo={addToSaldo}
            />

            <CorteDialog 
                data={values}
                isOpen={values.corteDialog}
                close={closeDialog}
                showMessage={showMessage}
            />
        </Container>

    )
}

export default PosContainer

// export default function IntegrationNotistack() {
//     return (
//         <SnackbarProvider maxSnack={3} anchorOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//         }}>
//             <PosContainer />
//         </SnackbarProvider>
//     );
// }