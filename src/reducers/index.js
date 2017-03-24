import { combineReducers } from 'redux'

//import city from './city';
//import ui from './ui';
import autocomplete from './autocomplete';
import input from './input';

export default combineReducers({
  autocomplete,
  input
})