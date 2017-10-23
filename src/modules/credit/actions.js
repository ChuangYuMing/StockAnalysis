import * as types from './action-types'

export const getCreditData = code => {
  return (dispatch, getState, apiUrl) => {
    let fetchUrl = `${apiUrl}/credit/${code}`
    console.log('fetchUrl', fetchUrl)
    return fetch(fetchUrl, {
      method: 'get'
    })
      .then(res => {
        return res.json()
      })
      .then(obj => {
        // console.log(obj)
        dispatch(showCredit(obj))
      })
  }
}

export const showCredit = data => {
  return {
    type: types.SHOW_CREDIT,
    data
  }
}
