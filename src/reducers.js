import { combineReducers } from 'redux'
// not use this, because using react-persist with immutable
// import { combineReducers } from 'redux-immutable'

import app from './modules/app'
import { LOG_OUT } from 'modules/main/action-types.js'

const appReducer = combineReducers({
  [app.constants.NAME]: app.reducer
})

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
