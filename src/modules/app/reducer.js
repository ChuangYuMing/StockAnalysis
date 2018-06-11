import * as types from './action-types'
import { fromJS } from 'immutable'

let init = fromJS({
  isLogin: false,
  test: 'haha'
})

export default (state = init, action) => {
  switch (action.type) {
    case types.UPDATE_APP_INFO:
      return state.merge(action.data)
    default:
      return state
  }
}
