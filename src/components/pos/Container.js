import React, {useReducer, useState } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment'
import {getDataFrom, getCuentasPorCobrar, getCuentasPorPagar, existCorte} from '../api'
import Acceso from './Acceso'
import PosDialog from './PosDialog'
import PosCobrarDialog from './PosCobrarDialog'

import PagarDialog from './PagarDialog'
import EgresoDialog from './EgresoDialog'
import IngresoDialog from './IngresoDialog'
import AddItemDialog from './AddItemDialog'
import CobroDialog from './CobroDialog'
import CorteDialog from './CorteDialog'
import RetiroDialog from './RetiroDialog'
// import Loading from '../Loading'

import { Container, } from '@material-ui/core'

import reducer from './PosReducer'

import useInventario from '../hooks/useInventario'
import useIngresos from '../ingresos/useIngresos'
import useCuentasxPagar from '../cxp/useCuentasxPagar'
// import useCuentasxCobrar from '../cxc/useCuentasxCobrar'
import 'moment/locale/es-mx';
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
    
    retiroDialog: false,
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
    // const [loading] = useState(true)
    const {
        // addIngreso, 
        addVenta, cuentasxCobrar, addPagoCxc} = useIngresos()
    const { enqueueSnackbar } = useSnackbar()
    const {invUbic, getInvUbic} = useInventario();
    const {cuentasxPagar, addPagoCxp} = useCuentasxPagar()
    const [ubicacion, setUbicacion] = useState("")
    const [fecha, setFecha] = useState( moment().format('YYYY-MM-DD') )
    
    const [values, dispatch] = useReducer(reducer, initialState)

    const savePagoCxp = (pago) => {
        return addPagoCxp(pago)
    }
    
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
            getInvUbic(value._id)
            return setUbicacion(value)
        }
        if(type === 'fecha'){
            var f = moment(value).format('YYYY-MM-DD')
            return setFecha(f)
        }
        dispatch({type: type, value: value}) 
    }

    const startPos = () =>{
        // e.preventDefault()
        loadBalance()
        if(invUbic.length <= 0){
            enqueueSnackbar(" No se encontró inventario en "+values.ubicacion.nombre, {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            } ) 
            openDialog('posDialog')
            
        }else{
            openDialog('posDialog')
        }
    }

    const loadBalance = () => {

        getDataFrom(ubicacion._id, fecha).then(res => {
            dispatch({type: 'setCorte', value: res.corte})
        })

    }

    const checkCorte = () => {
        existCorte(ubicacion._id, fecha).then( res =>{
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
        <Container>

            {
                // invUbic !== null ?
                    // <LinearProgress variant="query" />
                    <Acceso 
                    ubicacion={ubicacion} 
                    fecha={fecha} 
                    checkCorte={checkCorte} 
                    invUbic={invUbic}
                    handleChange={handleChange}/>
                    // :
                    // null
                    // <Loading loading={loading}/>
            }


            <PosDialog 
                values={values}
                inventario={invUbic}
                ubicacion={ubicacion}
                fecha={fecha}
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
                ubicacion={ubicacion}
                fecha={fecha}
                isOpen={values.cobrarDialog}
                crearVenta={addVenta}
                crearPago={addPagoCxc}
                close={closeDialog}
                showMessage={showMessage}
                addToSaldo={addToSaldo}
                resetVenta={resetVenta}
                />
            <PagarDialog 
                fecha={fecha}
                cuentas={cuentasxPagar}
                pagar={savePagoCxp}
                ubicacion={ubicacion}
                isOpen={values.pagarDialog}
                saldoDisponible={values.saldoEnUbicacion}
                close={closeDialog}
                showMessage={showMessage}
                subFromSaldo={subFromSaldo}
            />

            <EgresoDialog 
                fecha={fecha}
                ubicacion={ubicacion}
                isOpen={values.egresoDialog}
                saldoDisponible={values.saldoEnUbicacion}
                close={closeDialog}
                showMessage={showMessage}
                subFromSaldo={subFromSaldo}
            />

            <IngresoDialog 
                fecha={fecha}
                ubicacion={ubicacion}
                isOpen={values.ingresoDialog}
                close={closeDialog}
                showMessage={showMessage}
                addToSaldo={addToSaldo}
            />

            <RetiroDialog
                fecha={fecha}
                ubicacion={ubicacion}
                isOpen={values.retiroDialog}
                close={closeDialog}
                showMessage={showMessage}
                subFromSaldo={subFromSaldo}/>

            <CobroDialog 
                fecha={fecha}
                cuentas={cuentasxCobrar}
                cobrar={addPagoCxc}
                ubicacion={ubicacion}
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