import { connect } from 'react-redux'
import Main from './Main'
import { updateAppInfo } from 'modules/app/actions.js'

const mapStateToProps = state => {
  return {
    isLogin: state.app.get('isLogin'),
    test: state.app.get('test')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAppInfo: () => {
      dispatch(updateAppInfo(Map({ test: '123' })))
    },
    logout: () => {
      // dispatch(logout())
      // window.location.replace('/order/login')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
