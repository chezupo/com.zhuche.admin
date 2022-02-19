import React, {useEffect} from 'react'
import style from './style.module.less'
import TopBar from '@/container/Layout/Topbar'
import Maintainer from '@/container/Layout/MainTainer'
import {message, Spin} from 'antd'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setLoading} from "@/store/modules/loading";

const Layout: React.FC = () => {
  const isLogin = useAppSelector(state => state.me.isLogin)
  const loading = useAppSelector(state => state.loading)
  const dispatch = useAppDispatch()

  const navigator = useNavigate()
  useEffect(() => {
    if (!isLogin) {
      dispatch(setLoading(true))
      message.info("您还未登录，前去登录")
      setTimeout(() => {
        dispatch( setLoading(false) )
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
