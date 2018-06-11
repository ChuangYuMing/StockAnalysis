import React, { PureComponent } from 'react'
import styles from './popup.css'
import classNames from 'classnames/bind'
import { Observable } from 'rxjs'

let cx = classNames.bind(styles)
class PopUp extends PureComponent {
  constructor(props) {
    super(props)
    // console.log(props)
  }
  componentDidMount() {
    let keyDowns = Observable.fromEvent(document, 'keydown')
    let enterBykey = keyDowns.filter(e => e.keyCode === 13).subscribe(e => {
      let enter = document.querySelector(`.${this.props.name} .popupEnter`)
      if (enter) {
        enter.click()
      }
    })
    let escKeyDown = keyDowns.filter(e => e.keyCode === 27).subscribe(e => {
      let esc = document.querySelector(`.${this.props.name} .popupEsc`)
      if (esc) {
        esc.click()
      }
    })
  }
  render() {
    let show = this.props.show
    let { width, height, top, zIndex, bottom, name, keepShow } = this.props
    let style = {
      width,
      height,
      top,
      zIndex,
      bottom
    }
    let popcx = cx({
      'popup-wrap': true,
      [name]: true
    })
    let popcx2 = cx({
      'popup-wrap2': true,
      [name]: true
    })
    if (!show) {
      return <div className={cx('hide')} />
    }
    if (keepShow) {
      return (
        <div className={popcx2} style={style}>
          {this.props.children}
        </div>
      )
    }
    return (
      <div className={cx('main-wrap')}>
        <div className={popcx} style={style}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PopUp
