import React, { useRef } from 'react'
import { useObserve } from '@wuchuheng/rxjs'
import style from './style.module.less'
import Logo from '@/container/Layout/SideBar/Logo'
import NavigationBar from '@/container/Layout/SideBar/NavigationBar'
import classNames from 'classnames'
import { toggleObserve } from '@/store'

const SideBar: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [toggle] = useObserve(toggleObserve)

  return (
      <div className={classNames({
        [style.main]: true,
        [style.active]: toggle
      })} ref={mainRef}>
        <Logo />
        <NavigationBar />
      </div>
  )
}

export default SideBar
