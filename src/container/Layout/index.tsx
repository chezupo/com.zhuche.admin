import React, {useEffect, useState} from 'react'
import style from './style.module.less'
import TopBar from '@/container/Layout/Topbar'
import Maintainer from '@/container/Layout/MainTainer'
import {message, Spin} from 'antd'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setLoading} from "@/store/modules/loading";

export const FoldContext = React.createContext<boolean>(true)
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
  const [isFold, setIsFold] = useState<boolean>(true)
  const handleChangeFold = (newIsFold: boolean) => setIsFold(newIsFold)


  return (
    <FoldContext.Provider value={isFold}>
      <Spin spinning={loading}>
        <div className={style.main}>
          <TopBar onFold={handleChangeFold} />
          <Maintainer onFold={handleChangeFold} />
        </div>
      </Spin>
    </FoldContext.Provider>
  )
}

export default Layout
