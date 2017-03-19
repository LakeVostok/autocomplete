export function loadCities(data) {
  return {
    type: 'LOAD_CITIES',
    payload: data
  };
}

export function showState() {
  return {
    type: 'SHOW_STATE'
  };
}
export function inputValue(value) {
  return {
    type: 'INPUT_VALUE',
    payload:  value
  };
}

export function cleanEqualNames() {
  return {
    type: 'CLEAN_EQUAL_NAMES'
  };
}

export function searchCity(value) {
  return {
    type: 'SEARCH_CITY',
    payload: value
  };
}

export function setResult(value) {
  return {
    type: 'SET_RESULT',
    payload: value
  };
}