import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './index.module.scss'

export default function NotFound() {
  return <div className={Styles.container}>
    你要查看的页面不存在, 你可以
    <Link to='/'>回到首页</Link>
    或者
    <Link to='/search'>搜索更多</Link>
  </div>
}
