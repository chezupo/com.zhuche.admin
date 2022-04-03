import React from 'react'
import style from './style.module.less'
import SideBar from '@/container/Layout/Topbar/Logo'
import MainContainer from '@/container/Layout/Topbar/MainContainer'
import {TopBarPropsType} from "@/container/Layout/Topbar/MainContainer/TopBar";


const TopBar: React.FC<TopBarPropsType> = props => {
  return (
    <div className={style.main}>
      <SideBar />
      <MainContainer onFold={props.onFold} />
    </div>
  )

}

export default TopBar
