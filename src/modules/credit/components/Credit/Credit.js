import React from 'react'
import styles from './credit.scss'
import classNames from 'classnames/bind'
import Chart from '../Chart/chart.js'
import { TypeChooser } from 'react-stockcharts/lib/helper'

let cx = classNames.bind(styles)

class Credit extends React.Component {
  componentDidMount() {
    let code = this.props.match.params.id
    this.props.getCreditData(code)
  }
  render() {
    if (!this.props.sellLoan.credit_data) {
      return <div>Loading...</div>
    }
    let data = this.props.sellLoan.credit_data
      .map((item, index) => {
        item.date = new Date(item.date)
        item.sl2 = item.sl2 / 1000
        item.sl3 = item.sl3 / 1000
        console.log(item.sl2, item.date)
        return item
      })
      .sort((a, b) => {
        return a.date - b.date
      })
    console.log(data)
    return (
      <TypeChooser>
        {type => <Chart type={type} data={data} />}
      </TypeChooser>
    )
  }
}

export default Credit
