import React, { useEffect, useRef } from 'react'
import { useObserve } from '@wuchuheng/rxjs'
import style from './style.module.less'
import classNames from 'classnames'
import { toggleObserve } from '@/store/toggleObserve'

const Logo: React.FC = () => {
  const avatar = 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
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
      <h2>Ant Design Pro</h2>
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
