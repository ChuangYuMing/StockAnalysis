import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

import { ChartCanvas, Chart } from 'react-stockcharts'
import {
  ScatterSeries,
  SquareMarker,
  TriangleMarker,
  CircleMarker,
  LineSeries
} from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  EdgeIndicator
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last } from 'react-stockcharts/lib/utils'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'

const dateFormat = timeFormat('%Y/%m/%d')
const numberFormat = format('')

class LineAndScatterChart extends React.Component {
  render() {
    const { data: initialData, type, width, ratio } = this.props
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    )
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
    )
    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 20])]
    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={600}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={type}
        pointsPerPxThreshold={1}
        seriesName="MSFT"
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={d => [d.sl2, d.sl3]} height={200}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis
            axisAt="right"
            orient="right"
            // tickInterval={5}
            // tickValues={[40, 60]}
            ticks={5}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={dateFormat}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={numberFormat}
          />

          <LineSeries yAccessor={d => d.sl2} strokeDasharray="Solid" />
          <LineSeries
            yAccessor={d => d.sl3}
            strokeDasharray="Solid"
            stroke="#ff7f0e"
          />

          <HoverTooltip
            yAccessor={d => d.sl2}
            tooltipContent={tooltipContent([])}
            fontSize={15}
          />
        </Chart>
        <Chart
          id={2}
          yExtents={d => [d.sl3 - d.sl2]}
          height={300}
          origin={(w, h) => [0, 230]}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis
            axisAt="right"
            orient="right"
            // tickInterval={5}
            // tickValues={[40, 60]}
            ticks={5}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={dateFormat}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={numberFormat}
          />
          <EdgeIndicator
            itemType="last"
            orient="left"
            edgeAt="left"
            yAccessor={d => 0}
            displayFormat={format('.0s')}
            fill="#0F0F0F"
          />
          <LineSeries
            yAccessor={d => d.sl3 - d.sl2}
            strokeDasharray="Solid"
            stroke="#2ca02c"
          />

          <HoverTooltip
            yAccessor={d => d.sl3 - d.sl2}
            tooltipContent={tooltipContent([])}
            fontSize={15}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    )
  }
}

function tooltipContent(ys) {
  return ({ currentItem, xAccessor }) => {
    return {
      x: dateFormat(xAccessor(currentItem)),
      y: [
        {
          label: '借券賣出',
          value: currentItem.sl2 && numberFormat(currentItem.sl2)
        },
        {
          label: '當日還券',
          value: currentItem.sl3 && numberFormat(currentItem.sl3),
          stroke: '#ff7f0e'
        },
        {
          label: '當日還券 - 借券賣出',
          value:
            currentItem.sl3 - currentItem.sl2 &&
              numberFormat(currentItem.sl3) - numberFormat(currentItem.sl2),
          stroke: '#2ca02c'
        }
      ]
        .concat(
          ys.map(each => ({
            label: each.label,
            value: each.value(currentItem),
            stroke: each.stroke
          }))
        )
        .filter(line => line.value)
    }
  }
}
LineAndScatterChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
}

LineAndScatterChart.defaultProps = {
  type: 'svg'
}
LineAndScatterChart = fitWidth(LineAndScatterChart)

export default LineAndScatterChart
