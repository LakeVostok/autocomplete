const initialState = {
    my1: {
        data: 1
    },
    my2: {
        data: 2
    }
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'INPUT_CHANGE': {
            console.log(action.payload)
            return { ...state, inputValue: action.payload}
        }
        default: return state;
    }
}