import React from 'react'
import MainContainer from '@/container/Layout/MainContainer'
import style from './style.module.less'
import SideBar from '@/container/Layout/SideBar'


const Layout: React.FC = () => {

  return (
    <div className={style.main}>
        <SideBar />
        <MainContainer />
    </div>
  )
}

export default Layout
