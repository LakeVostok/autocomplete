const initialState = {
    value: '',
    focused: false
};

export default function(state = initialState, action) {
    let id = action.id;
    switch(action.type) {
        case 'INPUT_VALUE': {
            return { ...state, id: {value: action.payload} }
        }
        
        case 'ON_FOCUS': {
            return { ...state, id: {focused: true} }
        }

        case 'ON_BLUR': {
            return { ...state, id: {focused: false} }
        }
        
        default: return state;
    }
}