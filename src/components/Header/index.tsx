import React from 'react'
import { Link } from 'react-router-dom'
import { joinSpace } from 'src/utils/base'

import Styles from './index.module.scss'
import SearchBox, { SearchBoxProps } from '../Search'

interface Props {
  searchable?: boolean;
  searchBoxProps?: SearchBoxProps;
}

export default function Header({
  searchable,
  searchBoxProps,
}: Props) {
  return <div className={Styles.header}>
    <Link to='/' className={Styles.icon}>
      <span ><b>Best</b>Search</span>
    </Link>
    {
      searchable && <SearchBox
        {...(searchBoxProps || {})}
        className={joinSpace(Styles.search, searchBoxProps?.className)}
      />
    }
  </div>
}
