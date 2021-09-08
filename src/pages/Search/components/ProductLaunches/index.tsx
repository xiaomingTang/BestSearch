import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { Skeleton } from '@material-ui/lab'

import { Types } from '../../services'

export default function ProductLaunches({
  data: productLaunchData,
}: {
  data: Types.SearchRes['product_launch_data'],
}) {
  const option = useMemo(() => ({
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
        data: productLaunchData.map((item) => item.key_as_string),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '产品启动数据',
        type: 'bar',
        data: productLaunchData.map((item) => item.doc_count),
      },
    ],
  }), [productLaunchData])

  return productLaunchData.length > 0
    ? <ReactECharts
      option={option}
      opts={{
        width: 300,
        height: 200,
      }}
      style={{
        display: 'inline-block',
        margin: '0 10px 10px 0',
        height: 'auto',
      }}
    />
    : <Skeleton variant="rect" width={300} height={200} />
}
