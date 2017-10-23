import Hammer from 'hammerjs'
import anime from 'animejs'
import { getClientOffset } from 'tools/other.js'

class scrollTable {
  constructor(refs) {
    this.refs = refs
    this.lastTouchPoint = null
    this.haveMovedY = 0
    this.transtionAnim = `transform 0ms ease-out;`
    this.swipe = false
    this.haveMovedX = 0
    this.haveMovedY = 0
    this.offsetX = 0
    this.offsetY = 0
    this.canMoveX = 0
    this.canMoveY = 0
    this.hammers = []
    window.requestAnimFrame = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    })()
  }
  reflow = () => {
    let { mainOther, headerOther, mainProd } = this.refs
    let targetY = [mainOther.childNodes[0], mainProd.childNodes[0]]
    let targetX = [mainOther.childNodes[0], headerOther.childNodes[0]]
    let inner = mainOther.childNodes[0]
    let innerClientRect = inner.getBoundingClientRect()
    let bottomMenu = document.getElementById('bottom-menu')

    this.offsetX = getClientOffset(mainOther).left
    this.offsetY = getClientOffset(mainOther).top
    this.canMoveX =
      innerClientRect.width - (document.body.clientWidth - this.offsetX)
    this.canMoveY =
      innerClientRect.height -
      (document.body.clientHeight - this.offsetY) +
      bottomMenu.offsetHeight
    // console.log(
    //   mainOther.offsetParent,
    //   innerClientRect.width,
    //   document.body.clientWidth,
    //   this.offsetX,
    //   bottomMenu.offsetHeight
    // )
    this.canMoveY = this.canMoveY < 0 ? 0 : this.canMoveY
    this.canMoveX = this.canMoveX < 0 ? 0 : this.canMoveX
    this.render(targetY, 0, false, 'vertical')
    this.render(targetX, 0, false)
  }
  onScroll = () => {
    if (this.hammers.length > 0) {
      // console.log(this.hammers)
      for (let item of this.hammers) {
        item.destroy()
      }
      this.hammers = []
    }
    let hammer = new Hammer.Manager(document)
    hammer.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }))
    hammer.on('doubletap', e => {
      // e.preventDefault()
      this.reflow()
    })
    for (let key in this.refs) {
      let hammer = new Hammer.Manager(this.refs[key].childNodes[0])
      hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }))
      hammer.add(
        new Hammer.Swipe({
          direction: Hammer.DIRECTION_ALL
        }).recognizeWith(hammer.get('pan'))
      )
      hammer.on(
        'swipe',
        function(e) {
          this.onAnim(e, key)
        }.bind(this)
      )
      hammer.on(
        'pan panstart',
        function(e) {
          this.onAnim(e, key)
        }.bind(this)
      )
      this.hammers.push(hammer)
    }
  }
  render = (targets, value, isSwipe = false, direction = 'all') => {
    let duration = 1
    let animation = false
    value = value * -1
    if (isSwipe) {
      animation = true
      duration = 350
      if (direction === 'vertical') {
        duration = 450
      }
    }

    targets.map((item, index) => {
      let dir = item.dataset.direction
      if (direction === 'vertical') {
        if (dir === 'all') {
          item.tranX = this.haveMovedX * -1
        } else {
          item.tranX = 0
        }
        item.tranY = value
      } else {
        if (dir === 'all') {
          item.tranY = this.haveMovedY * -1
        } else {
          item.tranY = 0
        }
        item.tranX = value
      }
      return item
    })

    if (!animation) {
      for (let item of targets) {
        item.style.WebkitTransform = `translateX(${item.tranX}px) translateY(${item.tranY}px) translateZ(0px)`
      }
    } else {
      anime({
        targets: targets,
        translateX: (target, index) => {
          return target.tranX
        },
        translateY: (target, index) => {
          return target.tranY
        },
        translateZ: 0,
        easing: 'linear',
        duration: duration
      })
    }
    if (direction === 'vertical') {
      this.haveMovedY = Math.abs(value)
    } else {
      this.haveMovedX = Math.abs(value)
    }
  }
  onAnim = (e, type) => {
    let actionType = e.type
    let deltaX = e.deltaX
    let deltaY = e.deltaY
    let { mainOther, headerOther, mainProd } = this.refs
    let isSwipe = actionType === 'swipe' ? true : false
    if (e.type === 'panstart') {
      // console.log('panstart,panstart')
      this.lastTouchPoint = e
      return
    }
    if (isSwipe && e.deltaTime > 200) {
      return
    }
    if (e.direction === 2 || e.direction === 4) {
      // console.log(this)
      let targets = [mainOther.childNodes[0], headerOther.childNodes[0]]
      let movingX = this.haveMovedX
      if (type === 'mainProd') {
        return
      }
      let diffMoveX = this.lastTouchPoint
        ? e.center.x - this.lastTouchPoint.center.x
        : e.deltaX
      if (isSwipe) {
        diffMoveX = Math.abs(diffMoveX) * 4
      } else {
        diffMoveX = Math.abs(diffMoveX)
      }
      if (e.direction === 2) {
        deltaX = Math.abs(deltaX)
        movingX = this.haveMovedX + diffMoveX
        if (movingX > this.canMoveX) {
          window.requestAnimFrame(() => {
            this.render(targets, this.canMoveX, isSwipe)
          })
        } else {
          window.requestAnimFrame(() => {
            this.render(targets, movingX, isSwipe)
          })
        }
      } else {
        movingX = this.haveMovedX - diffMoveX
        if (movingX < 0) {
          movingX = 0
          window.requestAnimFrame(() => {
            this.render(targets, 0, isSwipe)
          })
        } else {
          window.requestAnimFrame(() => {
            this.render(targets, movingX, isSwipe)
          })
        }
      }
      this.lastTouchPoint = e.isFinal ? null : e
    }

    if (e.direction === 8 || e.direction === 16) {
      // console.log(this)
      let movingY = this.haveMovedY
      if (type === 'headerOther') {
        return
      }
      let diffMoveY = this.lastTouchPoint
        ? e.center.y - this.lastTouchPoint.center.y
        : e.deltaY
      if (isSwipe) {
        diffMoveY = Math.abs(diffMoveY) * 7
      } else {
        diffMoveY = Math.abs(diffMoveY)
      }

      let targets = [mainOther.childNodes[0], mainProd.childNodes[0]]
      if (e.direction === 8) {
        deltaY = Math.abs(deltaY)
        diffMoveY = Math.abs(diffMoveY)
        movingY = this.haveMovedY + diffMoveY
        if (movingY > this.canMoveY) {
          window.requestAnimFrame(() => {
            this.render(targets, this.canMoveY, isSwipe, 'vertical')
          })
        } else {
          window.requestAnimFrame(() => {
            this.render(targets, movingY, isSwipe, 'vertical')
          })
        }
      } else {
        movingY = this.haveMovedY - diffMoveY
        if (movingY < 0) {
          window.requestAnimFrame(() => {
            this.render(targets, 0, isSwipe, 'vertical')
          })
        } else {
          window.requestAnimFrame(() => {
            this.render(targets, movingY, isSwipe, 'vertical')
          })
        }
      }
      this.lastTouchPoint = e.isFinal ? null : e
    }
  }
}

export default scrollTable
