import React from 'react'
import ReactDom from 'react-dom'
import Popup from 'react-popup'
import { Route, Switch } from 'react-router-dom'
import GoogleAnalytics from 'react-ga'
import classNames from 'classnames/bind'
import styles from './App.scss'
import Temp from 'modules/temp/components/Temp'
import Credit from 'modules/credit/components/Credit'
import Menu from 'modules/menu/components/Menu/index.js'

let cx = classNames.bind(styles)
class App extends React.Component {
  componentDidMount() {
    this.props.getClientIP()
    // this.props.getAllCompany()
    if (window.performance) {
      setTimeout(() => {
        let pefTime = performance.timing
        let renderTime = pefTime.domComplete - pefTime.domLoading
        let pageLoadTime = pefTime.loadEventEnd - pefTime.navigationStart
        let connectTime = pefTime.responseEnd - pefTime.requestStart
        GoogleAnalytics.timing({
          category: 'page performance',
          variable: ' render time',
          value: renderTime
        })
        GoogleAnalytics.timing({
          category: 'page performance',
          variable: 'total page load time',
          value: pageLoadTime
        })
        GoogleAnalytics.timing({
          category: 'page performance',
          variable: 'response time',
          value: connectTime
        })
      }, 2000)
    }
  }
  render() {
    return (
      <div>
        <Menu />
        <div className={cx('main-wrap')}>
          <Switch>
            <Route exact path={'/'} component={Temp} />
            <Route path={'/credit/:id'} component={Credit} />
          </Switch>
        </div>

      </div>
    )
  }
}

export default App
