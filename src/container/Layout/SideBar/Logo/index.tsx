import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.less';
import { toggleObserve } from '@/store'

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
    <div className={[style.main].join(' ')} ref={mainRef}>
      <img src={avatar} />
      <h2>Ant Design Pro</h2>
    </div>
    )
}

export default Logo
