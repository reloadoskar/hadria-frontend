const initialState = {
    nombre: '',
    tipo: 'SUCURSAL'
}

function init(initialState) {
    return initialState
  }

function reducer (state, action){
    switch (action.type){
        case 'nombre':
            var nombre = action.value
            return {...state, [action.type]: nombre.toUpperCase()}
        case 'tipo':
            var tipo = action.value
            return {...state, [action.type]: tipo}
        case 'reset':
            return init(initialState)
        default:
            return {...state, [action.type]: action.value}
    }
}

export default reducer