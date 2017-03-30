export function inputValue(id, e) {
  return {
    type: 'INPUT_VALUE',
    id: id,
    payload: e.target.value
  };
}

export function onFocus(id, e) {
  return {
    type: 'ON_FOCUS',
    id: id,
    payload: e.target.value
  };
}

export function onBlur(id, e) {
  return {
    type: 'ON_BLUR',
    id: id
  };
}



export function setData(id, data) {
  return {
    type: 'SET_DATA',
    id,
    payload: data
  }; 
}

export function hasLoadError(id, bool) {
  return {
    type: 'HAS_LOAD_ERROR',
    id,
    payload: bool
  };
}

export function isDataLoading(id, bool) {
  return {
    type: 'IS_DATA_LOADING',
    id,
    payload: bool
  };  
}

export function loadData(id, url) {
  let axios = require('axios');
  
  return (dispatch) => {
    dispatch(isDataLoading(id, true));
    
    axios.get(url)
      .then(res => dispatch(setData(id, res.data)))
      .catch(e => dispatch(hasLoadError(id, true)))
      .then(dispatch(isDataLoading(id, false)))
  }
}