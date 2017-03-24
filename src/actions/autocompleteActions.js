export function inputChange(data) {
  console.log('vasya');
  return {
    type: 'INPUT_CHANGE',
    payload: data
  };
}