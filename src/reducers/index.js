import { combineReducers } from 'redux'

import city from './city';
import ui from './ui';

export default combineReducers({
  city,
  ui
})