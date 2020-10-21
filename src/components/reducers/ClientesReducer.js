const initialState = {
	nombre: '',
    rfc: '',
    direccion: '',
    tel1: '',
    email: '',
    diasDeCredito: 0,
    limiteDeCredito: 0,
}

function init(initialState) {
    return initialState
  }

function reducer (state, action){
    switch (action.type){
        case 'nombre':
            var nombre = action.value
            var mail = nombre.replace(/ /g, "") +"@mail.com"
            return {...state, [action.type]: nombre.toUpperCase(), email: mail}
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