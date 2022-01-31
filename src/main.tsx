import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './routes'
import './assets/font/iconfont/iconfont.css'

const Main:React.FC = () => {
  const element = useRoutes(routes)
  return (
    <>
      {element}
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
