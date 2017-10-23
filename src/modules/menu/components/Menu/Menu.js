import React from 'react'
import styles from './menu.scss'
import classNames from 'classnames/bind'
import debounce from 'lodash/debounce'
import { Link } from 'react-router-dom'

let cx = classNames.bind(styles)

class Menu extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    let resize = debounce(() => {
      this.resize()
    }, 300)
    this.resize()

    window.addEventListener('resize', resize)
  }
  resize = () => {
    let menuWith = this.refs.navigator.offsetWidth
    let layerOnes = document.getElementsByClassName(styles['layer-one'])
    let layerTwos = document.getElementsByClassName(styles['layer-two'])
    for (let item of layerOnes) {
      item.style.width = menuWith + 'px'
    }
    for (let item of layerTwos) {
      item.style.width = menuWith + 'px'
    }
  }
  render() {
    return (
      <div id="menu" ref="menu" className={cx('main-wrap')}>
        <div ref="navigator" className={cx('navigator')}>
          <ul className={cx('layer-one-wrap')}>
            <li className={cx('layer-one-item')}>
              <span>個股區</span>
              <div className={cx('layer-one')}>
                <div className={cx('content')}>
                  <ul>
                    <li className={cx('layer-two-item')}>
                      <span className={cx('have-content')}>基本分析</span>
                      <div className={cx('layer-two')}>
                        <span>動態報導</span>
                        <span>股本行成</span>
                        <span>經營績效</span>
                        <span>獲利能力</span>
                        <span>轉投資</span>
                        <span>營收盈餘</span>
                        <span>重大行事曆</span>
                        <span>詳細資料</span>
                        <span>基本資料</span>
                      </div>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span className={cx('have-content')}>籌碼分析</span>
                      <div className={cx('layer-two')}>
                        <Link
                          key={name}
                          to={{
                            pathname: '/credit/2330'
                          }}
                        >
                          <span>借券賣出</span>
                        </Link>
                      </div>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span className={cx('have-content')}>財務分析</span>
                      <div className={cx('layer-two')}>
                        <span>資產負債表</span>
                        <span>財務比率表</span>
                        <span>現金流量表</span>
                        <span>損益表</span>
                      </div>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span className={cx('have-content')}>技術分析</span>
                      <div className={cx('layer-two')}>
                        <span>K線圖</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={cx('layer-one-item')}>
              <span>產業區</span>
              <div className={cx('layer-one')}>
                <div className={cx('content')}>
                  <ul>
                    <li className={cx('layer-two-item')}>
                      <span className={cx('title')}>所有產業</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>集團股</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>概念股</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={cx('layer-one-item')}>
              <span>大盤分析</span>
              <div className={cx('layer-one')}>
                <div className={cx('content')}>
                  <ul>
                    <li className={cx('layer-two-item')}>
                      <span>資金流向</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>信用交易</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>法人動向</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>買賣力分析</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>支援壓力區</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>進場掃描</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>大盤Ｋ線圖</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={cx('layer-one-item')}>
              <span>公布欄</span>
              <div className={cx('layer-one')}>
                <div className={cx('content')}>
                  <ul>
                    <li className={cx('layer-two-item')}>
                      <span>信用交易表</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>除權息除表</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>上櫃法人匯總</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>全球重要指數</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>營收盈餘表</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>買賣超</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>自營商進出</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>行情表</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>申報轉讓</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span className={cx('have-content')}>其他</span>
                      <div className={cx('layer-two')}>
                        <div className={cx('layer-two-content')}>
                          <span>原物料總表</span>
                          <span>理財行事曆</span>
                          <span>新股上市</span>
                          <span>股東會時間表</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className={cx('layer-one-item')}>
              <Link
                key={name}
                to={{
                  pathname: '/news'
                }}
              >
                <span>新聞</span>
              </Link>

              <div className={cx('layer-one')}>
                <div className={cx('content')}>
                  <ul>
                    <li className={cx('layer-two-item')}>
                      <span>個股訊息</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>國內總經</span>
                    </li>
                    <li className={cx('layer-two-item')}>
                      <span>新聞總表</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    )
  }
}

export default Menu
