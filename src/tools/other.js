function sleep(milliseconds) {
  var start = new Date().getTime()
  while (new Date().getTime() - start < milliseconds) {}
}

function getClientOffset(elem) {
  var top = 0,
    left = 0
  while (elem) {
    // console.log(elem)
    top = top + parseInt(elem.offsetTop)
    left = left + parseInt(elem.offsetLeft)
    elem = elem.offsetParent
  }
  return { top: top, left: left }
}

function searchMinDiffItem(array, target) {
  target = parseFloat(target)
  let datas = array.map((item, index) => {
    return parseFloat(item)
  })
  // array = array.reverse()
  // console.log(array, target);
  let minDiff = 9999999
  let targetIndex = 0

  for (let i = 0; i < datas.length; i++) {
    let diff = Math.abs(target - datas[i])
    if (diff < minDiff) {
      minDiff = diff
      targetIndex = i
    }
  }

  return {
    targetPrice: parseFloat(array[targetIndex]),
    targetIndex: targetIndex,
    diff: minDiff
  }
}

export { sleep, getClientOffset, searchMinDiffItem }
