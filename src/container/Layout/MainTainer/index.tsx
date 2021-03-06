import NavigationBar from '@/container/Layout/MainTainer/NavigationBar'
import React from 'react'
import style from './style.module.less';
import { Outlet } from 'react-router-dom'
import {TopBarPropsType} from "@/container/Layout/Topbar/MainContainer/TopBar";
import CopyRight from "@/components/CopyRight";

const Maintainer: React.FC<TopBarPropsType> = props => {
  return (
    <div className={style.main}>
      <NavigationBar {...props} />
      <div className={style.routeContainer}>
        <Outlet />
        <div className={style.copyRightWrapper}>
          <CopyRight />
        </div>
      </div>
    </div>
  )
}

export default Maintainer
