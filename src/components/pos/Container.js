import React, {useEffect, useReducer, useState } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment'
import {getCuentasPorCobrar, getCuentasPorPagar, existCorte} from '../api'
import Acceso from './Acceso'
import PosDialog from './PosDialog'
import PosCobrarDialog from './PosCobrarDialog'

import PagarDialog from './PagarDialog'
import EgresoDialog from './EgresoDialog'
import IngresoDialog from './IngresoDialog'
import AddItemDialog from './AddItemDialog'
import CobroDialog from './CobroDialog'
import Corte from '../cortes/Corte'
import RetiroDialog from './RetiroDialog'
// import Loading from '../Loading'

import { Container, } from '@material-ui/core'

import reducer from './PosReducer'
import useIngresos from '../ingresos/useIngresos'
import useCuentasxPagar from '../cxp/useCuentasxPagar'
import useCortes from '../hooks/useCortes'
// import useCuentasxCobrar from '../cxc/useCuentasxCobrar'
import 'moment/locale/es-mx';
import Pesadas from '../inventario/Pesadas';
import CrearVenta from '../ventas/CrearVenta';
// import useStyles from '../hooks/useStyles';
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

function PosContainer(props) {
    const {invxubic, user} = props
    const { enqueueSnackbar } = useSnackbar()
    // const classes = useStyles()
    const {
        // addIngreso, 
        addVenta, cxcPdv, addPagoCxc} = useIngresos()
    const {cuentasxPagar, addPagoCxp} = useCuentasxPagar()
    const {getCorte} = useCortes()
    const [corte, setCorte] = useState(null)
    const [corteDialog, setCorteDialog] = useState(false)

    const [ubicacion, setUbicacion] = useState('')
    const [invSelected, setInvSelected] = useState(null)
    const [fecha, setFecha] = useState( moment().format('YYYY-MM-DD') )
    // const [itemSelected, setItemSelected] = useState()
    const [pesadas, setPesadas] = useState(false)
    const [values, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if(invxubic !== null ){
            // console.log(invxubic)
            invxubic.forEach(el => {
                if(user.ubicacion._id === el._id._id){
                    return handleChange('ubicacion', el)
                }
            });
        }
    },[user, invxubic])
    // const [loading] = useState(true)
    

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
        // setItemSelected(wantThisItem)
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
            setUbicacion(value)
            setInvSelected(value.items)
            return 
        }
        if(type === 'fecha'){
            var f = moment(value).format('YYYY-MM-DD')
            return setFecha(f)
        }
        // dispatch({type: type, value: value}) 
    }

    const startPos = () =>{
        // e.preventDefault()
        loadBalance()
        if(invxubic.length <= 0){
            enqueueSnackbar(" No se encontró inventario en "+values.ubicacion.nombre, {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            } ) 
        }
        openDialog('posDialog')
            
    }

    const loadBalance = () => {
        getCorte(ubicacion._id._id, fecha).then(res=>{
            if(res.status === 'error'){
                showMessage(res.message, res.status)
                closeDialog('corteDialog')
            }else{
                setCorte(res)
            }
        })
    }

    const checkCorte = () => {
        return existCorte(ubicacion._id._id, fecha).then( res =>{
            if(res.corte.length === 0){
                // dispatch({type: 'corteExist', value: false})                
                startPos()
            }else{
                dispatch({type: 'corteExist', value: true})
                showMessage('Fecha cerrada, para esta ubicación', 'error')
            }
            return res
        })
    }

    const showCorte = () => {
        closeDialog('menuDialog')
        loadBalance()
        setCorteDialog(true)
    }

    const closeDialogCorte = () => {
        setCorteDialog(false)
    }

    function onChangeFecha(fecha){
        setCorte(null)
        getCorte(corte.ubicacion._id, fecha).then(res => {
            setCorte(res)
        })
        setFecha(fecha)
    }

    function openPesadas(){
        setPesadas(true)
    }
    const closePesadas = () => {
        setPesadas(false)
    }
    const addPesada = (pesada) => {
        var lista = values.pesadas
        lista.push(pesada)
        // var emps = lista.length
        // var cant = parseFloat(movimiento.itemselcantidad) + parseFloat(pesada)
        // setMovimiento({...movimiento, pesadas: lista, itemselcantidad: cant, itemselempaques: emps })
    }
    const clearPesadas = () => {
        // setMovimiento({...movimiento, pesadas: [], itemselcantidad: 0, itemselempaques:0})
    }

    return (
        <Container>
            {
                user !== null  ?
                <div>
                    <Acceso 
                        user={user}
                        ubicacions={invxubic}
                        ubicacion={ubicacion} 
                        fecha={fecha} 
                        checkCorte={checkCorte} 
                        invUbic={invSelected}
                        handleChange={handleChange}/>
                    {ubicacion === '' || corte === null ?
                        null
                        :
                        <div>
                            {/* <CrearVenta 
                                elinventario={invSelected}
                                laubicacion={ubicacion}
                                lafecha={fecha}
                            /> */}
                            <PosDialog 
                                values={values}
                                inventario={invSelected}
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
                                saldoDisponible={corte.total}
                                close={closeDialog}
                                showMessage={showMessage}
                                subFromSaldo={subFromSaldo}
                            />
        
                            <EgresoDialog 
                                fecha={fecha}
                                ubicacion={ubicacion}
                                isOpen={values.egresoDialog}
                                saldoDisponible={corte.total}
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
                                saldoDisponible={corte.total}
                                subFromSaldo={subFromSaldo}/>
        
                            <CobroDialog                                 
                                fecha={fecha}
                                cuentas={cxcPdv}
                                cobrar={addPagoCxc}
                                ubicacion={ubicacion}
                                isOpen={values.cobroDialog}
                                saldoDisponible={corte.total}
                                close={closeDialog}
                                showMessage={showMessage}
                                addToSaldo={addToSaldo}
                            />
                            {corte === [] ? null : 
                                <Corte 
                                    ubicacions={props.ubicacions}
                                    fecha={fecha}
                                    open={corteDialog}
                                    close={closeDialogCorte}
                                    corte={corte}
                                    onChangeFecha={onChangeFecha}
                                />
                            }
                            {/* <Pesadas 
                                open={pesadas} 
                                close={closePesadas} 
                                addPesada={addPesada} 
                                clearPesadas={clearPesadas} 
                                pesadas={values.pesadas} 
                            /> */}
                        </div>    
                    }
                </div>
                    :
                    "loading"
            }



        </Container>

    )
}

export default PosContainer