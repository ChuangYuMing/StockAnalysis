import * as types from './action-types'
import queryString from 'query-string'

export const tempTest = value => {
  return {
    type: types.TEMP_TEST,
    date: 'temp-test'
  }
}

export const getClientIP = () => {
  return (dispatch, getState, apiUrl) => {
    return new Promise((resolve, reject) => {
      fetch(`https://api.ipify.org?format=json`)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('getClientIP fail')
          }
        })
        .then(res => {
          // console.log(res)
          dispatch(updateAppInfo({ clientIP: res.ip }))
        })
        .catch(e => {
          console.log(e)
          console.log(`%c ${e.message} `, 'background: #ff1801; color: #fffefe')
        })
    })
  }
}
export const getAllCompany = () => {
  return (dispatch, getState, apiUrl) => {
    let params = {
      symbols: 'all'
    }
    let fetchUrl = `${apiUrl}/api/symbolName?${queryString.stringify(params)}`
    return new Promise((resolve, reject) => {
      fetch(fetchUrl)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('getAllCompany fail')
          }
        })
        .then(res => {
          let obj = {}
          res.map((item, index) => {
            obj[item.Symbol] = item.Name
          })
          dispatch(updateAppInfo({ allCompany: obj }))
        })
        .catch(e => {
          console.log(e)
          console.log(`%c ${e.message} `, 'background: #ff1801; color: #fffefe')
        })
    })
  }
}
export const updateAppInfo = data => {
  return {
    type: types.UPDATE_APP_INFO,
    data
  }
}
