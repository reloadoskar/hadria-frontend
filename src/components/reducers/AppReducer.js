const initialState = {
	toggle: true, expanded: false,
}

function init(initialState) {
    return initialState
  }

function reducer (state, action){
    switch (action.type){
        case 'reset':
            return init(initialState)
        default:
            return {...state, [action.type]: action.value}
    }
}

export default reducer