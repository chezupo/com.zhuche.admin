import React, { useEffect, useRef } from 'react'
import { useObserve } from '@wuchuheng/rxjs'
import style from './style.module.less'
import classNames from 'classnames'
import { toggleObserve } from '@/store/toggleObserve'
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "@/store/hooks";

const Logo: React.FC = () => {
  const configuration = useAppSelector(state => state.configuration);
  const avatar = `${configuration.imgPrefix}/${configuration.logo}`
  const mainRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const subscriptionHandler = toggleObserve.subscription(() =>
      mainRef.current?.classList.toggle(style.active)
    )
    return () => { toggleObserve.unSubscription(subscriptionHandler) }

  }, [])
  return (
    <div className={[style.container].join(' ')} ref={mainRef}>
      <img src={avatar} />
      <h2>{configuration.appName}管理系统</h2>
    </div>
  )
}

const SideBar: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [toggle] = useObserve(toggleObserve)

  return (
      <div className={classNames({
        [style.main]: true,
        [style.active]: toggle
      })} ref={mainRef}>
        <Logo />
      </div>
  )
}

export default SideBar
