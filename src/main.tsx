import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './routes'
import './assets/font/iconfont/iconfont.css'
import 'antd/dist/antd.css';
import { ApolloProvider } from '@apollo/client'
import apolloClient from '@/util/apolloClient'

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
    <ApolloProvider client={apolloClient} >
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
