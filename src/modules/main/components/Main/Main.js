import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './main.css'
import classNames from 'classnames/bind'
import { Redirect } from 'react-router-dom'
import Loading from 'modules/shared/components/Loading2/Loading2.js'

let cx = classNames.bind(styles)
class Main extends Component {
  constructor() {
    super()
    this.state = {
      hasLoadData: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateAppInfo()
    }, 2000)
  }
  componentWillUnmount() {}

  render() {
    // if (!this.props.isLogin) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/login',
    //         state: { from: this.props.location }
    //       }}
    //     />
    //   )
    // }
    // if (!this.state.hasLoadData) {
    //   return <Loading />
    // }

    return <div className={cx('main-wrap')}>{this.props.test}</div>
  }
}

Main.propTypes = {}

export default Main
