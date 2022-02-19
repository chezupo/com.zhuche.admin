import style from '@/pages/Login/style.module.less'
import React from 'react'
import {useAppSelector} from "@/store/hooks";

const Header: React.FC = () => {
  const configuration = useAppSelector(state => state.configuration)
  const avatar = `${configuration.imgPrefix}/${configuration.logo}`
  return (
    <div className={style.container}>
      <div className={style.titleWrapper}>
        <img src={avatar} />
        <h1> {configuration.appName}管理系统 </h1>
      </div>
      <h4 className={style.subTitle}>{configuration.appName}是基于小程序的互联网租车解决方案</h4>
    </div>

  )

}

export default Header
