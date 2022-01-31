import React from 'react'
import style from './style.module.less'
import SideBar from '@/container/Layout/Topbar/Logo'
import MainContainer from '@/container/Layout/Topbar/MainContainer'

const TopBar: React.FC = () => {
  return (
    <div className={style.main}>
      <SideBar />
      <MainContainer />
    </div>
  )

}

export default TopBar
