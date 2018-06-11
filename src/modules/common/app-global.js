class AppGlobal {
  constructor() {
    if (PRODUCTION) {
      // this._apiUrl = 'http://192.168.12.24:8008'
      // this._apiUrl = window.location.origin
    } else {
      // this._apiUrl = 'http://192.168.12.134:8080'
      this._apiUrl = 'http://192.168.12.24:8008'
      // this._apiUrl = 'http://192.168.12.129:8008'
    }
  }
  get apiUrl() {
    return this._apiUrl
  }
  set apiUrl(val) {
    this._apiUrl = val
  }
}
export default new AppGlobal()
//1024*662
