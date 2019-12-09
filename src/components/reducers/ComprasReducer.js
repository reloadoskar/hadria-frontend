function reducer (state, action){
    var imp = action.value * state.costo
    var items = state.items
    var total = state.total
    state.alert = false
    // console.log('cambiando: '+action.type)
    switch (action.type){
        case 'producto':
            return {...state, producto: action.value, costo: action.value.costo}
        case 'cantidad':
            imp = action.value * state.costo
            return {...state, cantidad: action.value, empaques: action.value, importe: imp}
        case 'costo':
            imp = action.value * state.cantidad
            return {...state, costo: action.value, importe: imp}            
        
        case 'addItem':
            const item = action.value
            items.push(action.value)
            const newTotal = total + item.importe
            return {...state, total: newTotal}

        case 'clearList':
            console.log('borrando items')
            return {...state, items: []}

        case 'reset':
                return {
                    provedor: '',
                    tipoCompra: '',
                    remision: '',
                    ubicacion: '',
                    items: [],
                    total: 0,
                    addItemDialog: false,
                    comprasDialog: false,
                }
        default:
            return {...state, [action.type]: action.value}
    }
}

export default reducer