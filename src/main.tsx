import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter, useRoutes} from "react-router-dom";
import routes from "./routes";

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
