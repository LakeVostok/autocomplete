export function setFocus() {
  return {
    type: 'SET_FOCUS'
  };
}

export function unsetFocus() {
  return {
    type: 'UNSET_FOCUS'
  };
}

export function showHint() {
  return {
    type: 'SHOW_HINT'
  };
}

export function hideHint() {
  return {
    type: 'HIDE_HINT'
  };
}


export function loaderOff() {
  return {
    type: 'LOADER_Off'
  };
}

export function loaderOn() {
  return {
    type: 'LOADER_ON'
  };
}

export function setError(value) {
  return {
    type: 'SET_ERROR',
    payload: value
  };
}