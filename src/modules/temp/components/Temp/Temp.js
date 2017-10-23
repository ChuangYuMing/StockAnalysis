import React from 'react'
import styles from './temp.scss'
import classNames from 'classnames/bind'
import Chart from './Chart'
// import { getData } from "./utils"
// import dayk from './dayk.json'
import { TypeChooser } from 'react-stockcharts/lib/helper'
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
class Temp extends React.Component {
  componentDidMount() {
    let data = []
    for (var s = 2017; s < 2018; s++) {
      for (var k = 0; k < 3; k++) {
        for (var i = 0; i < 26; i++) {
          let last = data[data.length - 1]
            ? data[data.length - 1]
            : { close: 20 }
          let open =
            last.close + getRandomInt(-0.1 * last.close, 0.1 * last.close)
          let close =
            last.close + getRandomInt(-0.1 * last.close, 0.1 * last.close)
          let high = open
          let low = close
          data.push({
            absoluteChange: undefined,
            dividend: undefined,
            percentChange: undefined,
            close,
            date: new Date(s, k, i + 1),
            fHigh: high,
            fLow: low,
            high,
            low,
            open,
            split: '',
            volume: 841 + Math.floor(Math.random() * 100 + 1)
          })
        }
      }
    }
    // console.log(dayk)

    this.setState({ data })
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <TypeChooser>
          {type => <Chart type={type} data={this.state.data} />}
        </TypeChooser>
      </div>
    )
  }
}

export default Temp
