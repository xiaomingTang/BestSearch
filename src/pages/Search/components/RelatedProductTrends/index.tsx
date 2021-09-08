import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Skeleton } from '@material-ui/lab'

import { Types } from '../../services'

function geneOption(trend: Types.ProductTrend) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      containLabel: false,
    },
    xAxis: [
      {
        type: 'category',
        data: trend.search_msv.map((item) => item.date),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '关联产品趋势',
        type: 'bar',
        data: trend.search_msv.map((item) => item.sv),
      },
    ],
  }
}

export default function RelatedProductTrends({
  data: productTrends,
}: {
  data: Types.SearchRes['product_trends'],
}) {
  return productTrends.length > 0
    ? <>
      {
        productTrends.map((item) => (<ReactECharts
          key={item.name}
          option={geneOption(item)}
          opts={{
            width: 145,
            height: 145,
          }}
          style={{
            display: 'inline-block',
            margin: '0 10px 10px 0',
            height: 'auto',
          }}
        />))
      }
    </>
    : <Skeleton variant="rect" width={145} height={145} />
}
