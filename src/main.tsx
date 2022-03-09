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
import { Modal } from 'antd'
import { hideError } from '@/store/modules/error'

const Main:React.FC = () => {
  const dispatch = useAppDispatch()
  // 初始化相关配置
  const handleInitializeConfiguration = (): void => {
    dispatch(initializeConfigurationThunk()).then(() => {
      console.log("Init configuration")
    })
  }
  document.title = useAppSelector(state => state.configuration.appName) + "管理系统"
  useEffect(() => handleInitializeConfiguration(), [])
  const element = useRoutes(routes)
  const error = useAppSelector(state => state.error)
  const handleCancelError = () => dispatch(hideError())

  return (
    <>
      <Modal
        visible={error.visitable}
        footer={null}
        onCancel={handleCancelError}
      >
        {error.message}
      </Modal>
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
