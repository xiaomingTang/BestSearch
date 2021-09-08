import React from 'react'

import Styles from './index.module.scss'

interface Props {
  header: React.ReactElement;
  body: React.ReactElement;
}

export default function NormalLayout({ header, body }: Props) {
  return <div className={Styles.container}>
    <div className={Styles.header}>{header}</div>
    <div className={Styles.body}>{body}</div>
  </div>
}
