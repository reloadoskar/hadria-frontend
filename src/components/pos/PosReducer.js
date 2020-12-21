import {calcTotal} from '../Tools'

const filtrarInventario = (inv, ubic) => {
    const inventario = {}
        inventario.compras= inv.compras.filter( item => {        
        if(item.ubicacion[0] === ubic.nombre){
            return item
        }
        return null
    })
    return inventario
}

function sumaSaldoUbicacion(saldo, imp){
    return saldo + imp
}

function restaSaldoUbicacion(saldo, imp){
    return saldo - imp
}

function reducer (state, action){
    switch (action.type){

        case 'addToSaldo':
            let suma = sumaSaldoUbicacion(state.saldoEnUbicacion, parseFloat(action.value))
            return {...state, saldoEnUbicacion: suma }

        case 'subFromSaldo':
            let resta = restaSaldoUbicacion(state.saldoEnUbicacion, action.value)
            return {...state, saldoEnUbicacion: resta}

        case 'ubicacion':
            const inventario = action.inv
            var inventarioFiltrado = filtrarInventario(inventario, action.value)
            
            return{...state, 
                ubicacion: action.value, 
                inventarioFiltrado: inventarioFiltrado, 
            }

        case 'setCorte':
            // console.log(action.value)
            var saldo = calcTotal(action.value.ventas, action.value.creditos, action.value.ingresos, action.value.egresos)
            return {...state, 
                saldoEnUbicacion: saldo,
                ventasCorte: action.value.ventas,
                ingresosCorte: action.value.ingresos,
                creditosCorte: action.value.creditos,
                egresosCorte: action.value.egresos,
            }

        case 'itemWanted':
            return {...state, itemToAdd: action.value}

        case 'addItem':
            const newItems = state.itemsToSave
            newItems.push(action.value)
            const importeItem = action.value.importe
            const total = state.total
            const newTotal = total + importeItem
            const newState = {...state, itemsToSave: newItems, total: newTotal }
                return newState

        case 'removeItem':
                let r = state.itemsToSave
                r.splice(action.value,1);

                let t = state.total
                t -= action.item.importe
            return {...state, itemsToSave: r, total: t}

        case 'removeAllItems':
            return {...state, itemsToSave: []}
            
        case 'openPos':
            if(action.value === false){return {...state, dialogOpened: action.value, ubicacion: '', fecha: ''}}
            return {...state, dialogOpened: action.value}

        case 'openDialog':
            return {...state, [action.value]: true}

        case 'closeDialog':
            return {...state, [action.value]: false}

        case 'resetVenta':
            return { ...state,
                cobrarDialog: false, 
                dialogAddOpened: false, 
                dialogCobrarOpened: false, 
                tipoPago: 'CONTADO',
                itemToAdd: '',
                itemsToSave: [],
                total: 0,
                }
        
        case 'resetPos':
            return {...state,
                saldoEnUbicacion: 0,
                addItemDialog: false, 
                cobrarDialog: false, 
                cobroDialog: false,
                corteDialog: false,
                egresoDialog: false,
                ingresoDialog: false,
                menuDialog: false,
                pagarDialog: false,
                posDialog: false, 
                fecha: state.fecha,
                inventarioFiltrado: [],
                ubicacion: '', 
                tipoPago: 'CONTADO',
                itemToAdd: '',
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

        default:
            return {...state, [action.type]: action.value}
    }
}

export default reducer