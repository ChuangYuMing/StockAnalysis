import { connect } from 'react-redux'
import App from './App'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    rehydrated: state._persist.rehydrated
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  let { dispatch } = dispatchProps
  return {
    ...stateProps,
    ...ownProps,
    logout: () => {
      // dispatch(updateAppInfo({ login: false }))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    undefined,
    mergeProps
  )(App)
)
