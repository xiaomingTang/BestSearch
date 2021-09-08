import React from 'react'

import Header from 'src/components/Header'
import NormalLayout from 'src/layout/NormalLayout'
import SearchBox from 'src/components/Search'

import Styles from './index.module.scss'

export default function Home() {
  return <NormalLayout
    header={<Header />}
    body={<div className={Styles.body}>
      <h1 className={Styles.title}>Search Trends</h1>
      <SearchBox
        className={Styles.searchBox}
      />
    </div>}
  />
}
