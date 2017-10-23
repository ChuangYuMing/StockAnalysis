import { combineReducers } from 'redux'
import app from './modules/app'
import menu from './modules/menu'
import credit from './modules/credit'

const manipulator = combineReducers({
  [app.constants.NAME]: app.reducer,
  [menu.constants.NAME]: menu.reducer,
  [credit.constants.NAME]: credit.reducer
})

export default manipulator
