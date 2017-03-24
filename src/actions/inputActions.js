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