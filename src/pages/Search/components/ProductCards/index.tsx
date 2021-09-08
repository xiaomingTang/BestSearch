import { Box, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

import { Types } from '../../services'

import Styles from './index.module.scss'

export default function ProductCards({
  data: products,
  loading,
}: {
  loading: boolean;
  data: Types.Product[],
}) {
  const tempProducts: (Types.Product | null)[] = loading ? Array.from(new Array(10)) : products
  return (
    <Grid container>
      {tempProducts.map((item, index) => (
        <Box key={index} width={180} marginRight={2} marginBottom={2} className={Styles.card}>
          {item ? (
            <img
              // 当图片加载错误时, 仅设置 style width height 会导致图片高度仅为 alt 文本的高度
              // 所以额外在 className 中设置宽高
              className={Styles.image}
              alt={item.title}
              src={item.image}
            />
          ) : (
            <Skeleton variant="rect" width={180} height={180} />
          )}
          {item ? (
            <Box pr={2}>
              <Typography gutterBottom variant="body2" className={Styles.title}>
                {item.title}
              </Typography>
              <Typography display="block" variant="caption" color="textSecondary" className={Styles.price}>
                ${item.price}
              </Typography>
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  )
}
