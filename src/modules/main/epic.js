import * as types from './action-types'
// import { temp } from './actions.js'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'

export const pingEpic = action$ =>
  action$
    .ofType('PING')
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: 'PONG' })
