import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import Header from 'src/components/Header'
import NormalLayout from 'src/layout/NormalLayout'
import { useApi } from 'src/utils/api'

import Styles from './index.module.scss'
import { Apis, Types } from './services'
import ProductLaunches from './components/ProductLaunches'
import RelatedProductTrends from './components/RelatedProductTrends'
import ProductCards from './components/ProductCards'

export default function Search() {
  const { word = '' } = useParams<{ word: string }>()
  const searchParams = useMemo((): Types.SearchQuery => ({ search_phrase: word }), [word])

  const { data, loading, error } = useApi(Apis.search, {
    enable: !!word,
    args: [searchParams],
  })

  const body = useMemo(() => {
    if (error) {
      return <div className={Styles.error}>{error}</div>
    }
    if (!word) {
      return <></>
    }
    return <div className={Styles.body}>
      <h3 className={Styles.title}>Recent product launches</h3>
      <ProductLaunches data={data?.product_launch_data || []} />

      <h3 className={Styles.title}>Related product trends(没用过图表, 只能搞个这个)</h3>
      <RelatedProductTrends data={data?.product_trends || []} />

      <h3 className={Styles.title}>Related new products published in the lost 7 days</h3>
      <ProductCards data={data?.products || []} loading={loading} />
    </div>
  }, [data?.product_launch_data, data?.product_trends, data?.products, error, loading, word])

  return <NormalLayout
    header={<Header searchable searchBoxProps={{ defaultValue: word }} />}
    body={body}
  />
}
