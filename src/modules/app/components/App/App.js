import React from 'react'
import ReactDom from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './App.css'
import Main from 'modules/main/components/Main'
import config from '../../../../appConfig.js'

let cx = classNames.bind(styles)
class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.haveload = false
  }

  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    let { rehydrated } = this.props
    // console.log('fetchApiUrl', fetchApiUrl)
    if (!rehydrated) {
      return <div />
    } else {
      return (
        <div>
          <Switch>
            <Route exact path={'/'} component={Main} />
          </Switch>
        </div>
      )
    }
  }
}

export default App
