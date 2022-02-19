import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, useRoutes} from 'react-router-dom'
import routes from './routes'
import {Provider} from 'react-redux'
import './assets/font/iconfont/iconfont.css'
import 'antd/dist/antd.css';
import store from './store/index'
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {initializeConfigurationThunk} from "@/store/modules/configuration";

const Main:React.FC = () => {
  const dispatch = useAppDispatch()
  // 初始化相关配置
  const handleInitializeConfiguration = (): void => {
    dispatch(initializeConfigurationThunk()).then()
  }
  document.title = useAppSelector(state => state.configuration.appName) + "管理系统"
  useEffect(() => handleInitializeConfiguration(), [])
  const element = useRoutes(routes)
  return (
    <>
      {element}
    </>
  )
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
)
