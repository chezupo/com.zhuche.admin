import React from 'react'
import style from './style.module.less'
import { useAppSelector } from '@/store/hooks'

type HeaderPagePropsType = {
  children?: React.ReactChild | React.ReactChildren
}
const HeaderPage: React.FC<HeaderPagePropsType> = (props) => {
  const routeName = useAppSelector(state => state.activeRoute.name)
  const lastName = routeName.split('/').slice(-1)[0].trim()

  return (
    <div className={style.main}>
      <div>{routeName}</div>
      <h3>{lastName}</h3>
      {props.children ? (<div>{props.children}</div>) : '' }
    </div>
  )
}

export default HeaderPage
