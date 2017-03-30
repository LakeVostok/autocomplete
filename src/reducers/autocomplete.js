const initialState = {
    element1: {
        focused: false
    },
    element2: {
        focused: false
    },
    blya: '000'
};

export default function(state = initialState, action) {
    let id = action.id;
    
    switch(action.type) {
        case 'INPUT_VALUE': {
            return { ...state, [id]: { ...state[id], value: action.payload } };
        }
        case 'ON_FOCUS': {
            return { ...state, [id]: { ...state[id], focused: true } };
        }
        case 'ON_BLUR': {
            return { ...state, [id]: { ...state[id], focused: false } };
        }
        
        case 'SET_DATA': {
            return { ...state, [id]: { ...state[id], data: action.payload } };
        }
        case 'HAS_LOAD_ERROR': {
            return { ...state, [id]: { ...state[id], hasError: action.payload } };
        }
        case 'IS_DATA_LOADING': {
            return { ...state, [id]: { ...state[id], isLoading: action.payload } };
        }
        
        default: return state;
    }
}