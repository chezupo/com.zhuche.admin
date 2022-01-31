import React, { useState } from 'react'
import style from './style.module.less'
import { IoMailOutline, IoNotificationsCircleOutline } from 'react-icons/io5'
import UserInfo from '@/container/Layout/MainContainer/TopBar/RightWrapper/UserInfo'

const RightWrapper: React.FC = () => {

  return (<div className={style.main}>
    <div className={style.iconWrapper}>
      <IoNotificationsCircleOutline className={style.icon}/>
    </div>
    <div className={style.iconWrapper}>
      <IoMailOutline className={style.icon} />
    </div>
    <UserInfo />
  </div>)
}

export default  RightWrapper
