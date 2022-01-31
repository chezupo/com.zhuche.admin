import React from 'react'
import style from './style.module.less'
import { useObserve } from '@wuchuheng/rxjs'
import classNames from 'classnames'
import { toggleObserve } from '@/store'
import TopBar from '@/container/Layout/Topbar/MainContainer/TopBar'

type MainContainerPropsType = {
  onToggle?: () => void;
}
const MainContainer: React.FC<MainContainerPropsType> = ({ onToggle }) => {
  const [toggle, toggleDispatch] = useObserve(toggleObserve)

  return (
    <div className={ classNames({
      [style.main]: true,
      [style.active]: toggle
    })}>
      <TopBar />
    </div>
  )
}

export default MainContainer
