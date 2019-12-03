const initialState = {
	nombre: '',
    clave: '',
    rfc: '',
    direccion: '',
    tel1: '',
    email: '',
    cta1: '',
    diasDeCredito: '',
    comision: '',
}

function init(initialState) {
    return initialState
  }

function reducer (state, action){
    switch (action.type){
        case 'nombre':
            var nombre = action.value
            return {...state, [action.type]: nombre.toUpperCase()}
        case 'clave':
            var clave = action.value
            return {...state, [action.type]: clave.toUpperCase()}
        case 'direccion':
            var direccion = action.value
            return {...state, [action.type]: direccion.toUpperCase()}
        case 'rfc':
            const rfc = action.value
            return {...state, [action.type]: rfc.toUpperCase()}
        case 'reset':
            return init(initialState)
        default:
            return {...state, [action.type]: action.value}
    }
}

export default reducer