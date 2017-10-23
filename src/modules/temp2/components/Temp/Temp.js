import React from 'react'
import styles from './temp.scss'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles)
function Temp({ onTest, test }) {
  return <div><span onClick={onTest}>{test}</span></div>
}

export default Temp
