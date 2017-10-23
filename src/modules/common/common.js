class common {
  changeActionColor(action) {
    if (action.substring(2, 4) == '買進' || action.substring(2, 4) == '買入')
      return 'red'
    else if (action.substring(2, 4) == '賣出') return '#229E56'
  }

  changeNumColor(num) {
    if (num > 0) return '#fd0707'
    else if (num < 0) return '#229E56'

    return '#ffffff'
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  checkIp(Ip) {
    if (Ip === undefined) {
      return false
    }

    let regExpIp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    let regExpPrivateIp = /(^127\.)|(^192\.168\.)|(^192\.168\.)|(^10\.)|(^0\.)|(^172\.1[6-9]\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/
    let isIp = regExpIp.test(Ip)
    let isPrivateIp = regExpPrivateIp.test(Ip)

    if (isIp) {
      if (isPrivateIp) {
        // alert('IP無效')
        return false
      } else {
        return true
      }
    } else {
      // alert('IP無效')
      return false
    }
  }

  changeDateFormat(date) {
    let s = new Date(date)
    let yy = s.getFullYear()
    let month = s.getMonth() + 1
    let dd = s.getDate()
    let hh = s.getHours()
    let mm = s.getMinutes()
    let ss = s.getSeconds()
    let FormattedDate =
      yy +
      '/' +
      (month > 9 ? '' : '0') +
      month +
      '/' +
      (dd > 9 ? '' : '0') +
      dd +
      ' ' +
      (hh > 9 ? '' : '0') +
      hh +
      ':' +
      (mm > 9 ? '' : '0') +
      mm +
      ':' +
      (ss > 9 ? '' : '0') +
      ss

    return FormattedDate
  }
}

export default common
