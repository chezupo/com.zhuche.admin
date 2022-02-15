import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, useRoutes} from 'react-router-dom'
import routes from './routes'
import {Provider} from 'react-redux'
import './assets/font/iconfont/iconfont.css'
import 'antd/dist/antd.css';
import store from './store/index'

const Main:React.FC = () => {
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
