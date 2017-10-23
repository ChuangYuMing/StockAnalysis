import { connect } from 'react-redux'
import Credit from './Credit'
import { getCreditData } from '../../actions.js'

const mapStateToProps = state => {
  return {
    sellLoan: state.credit.sellLoan
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCreditData: code => {
      dispatch(getCreditData(code))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Credit)
