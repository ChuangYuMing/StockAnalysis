import * as types from './action-types'
import { Map } from 'immutable'
import appGlobal from 'modules/common/app-global.js'

export const updateAppInfo = data => {
  return {
    type: types.UPDATE_APP_INFO,
    data
  }
}
