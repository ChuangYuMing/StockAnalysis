import { connect } from 'react-redux'
import Menu from './Menu'

const mapStateToProps = state => {
  return {
    test: state.app.temp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTest: () => {
      alert('test')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
