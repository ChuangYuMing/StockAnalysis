import * as types from './action-types'

let init = {
  sellLoan: {}
}
export default (state = init, action) => {
  switch (action.type) {
    case types.SHOW_CREDIT: {
      let newState = JSON.parse(JSON.stringify(state))
      newState.sellLoan = action.data
      return newState
    }
    default:
      return state
  }
}
