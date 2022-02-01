import NavigationBar from '@/container/Layout/MainTainer/NavigationBar'
import React from 'react'
import style from './style.module.less';
import { Outlet } from 'react-router-dom'

const Maintainer: React.FC = () => {
  return (
    <div className={style.main}>
      <NavigationBar />
      <div className={style.routeContainer}>
        <Outlet />
      </div>
    </div>
  )
}

export default Maintainer
