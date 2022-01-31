import React from 'react'
import style from './style.module.less'
import TopBar from '@/container/Layout/Topbar'
import Maintainer from '@/container/Layout/MainTainer'


const Layout: React.FC = () => {

  return (
    <div className={style.main}>
      <TopBar />
      <Maintainer/>
    </div>
  )
}

export default Layout
