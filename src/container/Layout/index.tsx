import React, { useEffect, useState } from 'react'
import style from './style.module.less'
import TopBar from '@/container/Layout/Topbar'
import Maintainer from '@/container/Layout/MainTainer'
import { message, Spin } from 'antd'
import { isLogin as isLoginBaseCookie } from '@/store/modules/me'
import { useNavigate } from 'react-router-dom'

const Layout: React.FC = () => {
  const isLogin = isLoginBaseCookie()
  const [loading, setLoading] = useState<boolean>(false)
  const navigator = useNavigate()
  useEffect(() => {
    if (!isLogin) {
      setLoading(true)
      message.info("您还未登录，前去登录")
      setTimeout(() => {
        setLoading(false)
        navigator('/login')
      }, 1000)
    }
  }, [])

  return (
    <Spin spinning={loading}>
      <div className={style.main}>
        <TopBar />
        <Maintainer/>
      </div>
    </Spin>
  )
}

export default Layout
