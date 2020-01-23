const initialState = {
	clave: '',
    descripcion: '',
    costo: '',
    unidad: '',
    empaque: '',
    precio1: '',
    precio2: '',
    precio3: '',
}

function init(initialState) {
    return initialState
}

function reducer (state, action){
    switch (action.type){
        case 'descripcion':
            var desc = action.value
            return {...state, [action.type]: desc.toUpperCase()}
        case 'clave':
            var clave = action.value
            return {...state, [action.type]: clave.toUpperCase()}
        case 'reset':
            return init(initialState)
        default:
            return {...state, [action.type]: action.value}
    }
}

export default reducer