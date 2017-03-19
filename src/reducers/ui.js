const UNSET_FOCUS = 'UNSET_FOCUS';
const SET_FOCUS =   'SET_FOCUS';
const SHOW_HINT =   'SHOW_HINT';
const HIDE_HINT =   'HIDE_HINT';
const UNFREEZE_PAGE = 'UNFREEZE_PAGE';
const FREEZE_PAGE =  'FREEZE_PAGE';
const LOADER_ON =    'LOADER_ON';
const LOADER_OFF =   'LOADER_Off';
const SET_ERROR =    'SET_ERROR';

const initialState = {
    isFocused: false,
    isHidden: false,
    freeze: false,
    loaderVisible: false,
    error: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_FOCUS: {
            return { ...state, isFocused: true};
        }
        case UNSET_FOCUS: {
            return { ...state, isFocused: false};
        }
        case HIDE_HINT: {
            return { ...state, isHidden: true };
        }
        case SHOW_HINT: {
            return { ...state, isHidden: false };
        }
        case LOADER_ON: {
            return { ...state, loaderVisible: true};
        }
        case LOADER_OFF: {
            return { ...state, loaderVisible: false};
        }
        
        
        
        case SET_ERROR: {
            return { ...state, error: action.payload }
        }
        
        default: return state;
    }

}