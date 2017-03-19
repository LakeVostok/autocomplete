const SHOW_STATE = 'SHOW_STATE';
const LOAD_CITIES = 'LOAD_CITIES';
const INPUT_VALUE = 'INPUT_VALUE';
const CLEAN_EQUAL_NAMES ='CLEAN_EQUAL_NAMES';
const SEARCH_CITY = 'SEARCH_CITY';
const SET_RESULT = 'SET_RESULT';

const initialState = {
    value: '',
    cities: [],
    result: [0],
    loaded: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_STATE: {
            console.log(state);
            return state;
        }
        case LOAD_CITIES: {
            return { ...state, cities: action.payload, loaded: true };
        }
        case INPUT_VALUE: {
            return { ...state, value: action.payload};
        }
        
        case SEARCH_CITY: {
            let equalNames = state.cities.filter((q) => q.City.toLowerCase().indexOf(state.value.toLowerCase()) >=0 );
            return { ...state, equalNames: equalNames };
        }
        case SET_RESULT: {
            return { ...state, result: action.payload};
        }
        
        case CLEAN_EQUAL_NAMES: {
            return { ...state, equalNames: null };
        }

        default: return state;
    }
}